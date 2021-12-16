import React from 'react'
import QRCode from 'qrcode.react'
import { withAxios } from 'react-axios'

import { ReactComponent as Shield } from './components/icon/common/ic-24-shield-check.svg'
import { ReactComponent as Document } from './components/icon/common/ic-24-document-check.svg'
import { ReactComponent as Passport } from './components/icon/common/ic-24-passport.svg'
import { WrapperStyled, QrStyled, PanelStyled, IconWrapperStyled, FlexWrapperStyled, RightButtonStyled, MarkupStyled, MarkupTextStyled, ContentStyled } from './components/styles/wrapper.style'
import * as lightTheme from './components/styles/light.theme.style'
import { HeadlineStyled, TextStyled } from './components/styles/headline.style'
import { makeMoneyMask, formatNumber, makeSearchObj } from './components/utils'
import { withLabel } from './components/labeled'
import { LabeledSlider } from './components/slider'
import { Link } from './components/link'

const DEX_RADIX = 10
const INITIAL_LOW = 0.2
const INITIAL_HIGH = 0.9
const MAX_CREDIT_AMOUNT = 2000000
const percent = 7.2

const urlParams = [
    'isNewCar',
    'brand',
    'model',
    'carPrice',
    'downPayment',
    'durationMonth',
    // 'incomeStatement'
]

const durationDefaultList = [{
    "title": "1 год",
    "value": "12"
}, {
    "title": "2 года",
    "value": "24"
}, {
    "title": "3 года",
    "value": "36"
}, {
    "title": "4 года",
    "value": "48"
}, {
    "title": "5 лет",
    "value": "60"
}, {
    "title": "6 лет",
    "value": "72"
}, {
    "title": "7 лет",
    "value": "84"
}]

const getMonthlyPayment = ({ percent, creditSum, term }) => {
    const perMonthPercent = percent / 12 / 100
    const koeff = Math.pow((1 + perMonthPercent), term)
    const koeff2 = (perMonthPercent * koeff) / (koeff - 1)
    return Math.ceil(creditSum * koeff2)
}

const LabeledText = withLabel(TextStyled)

const makeUrl = ({ state, partnerSource }) => {
    const passedCarPrice = parseInt(state.carPrice, DEX_RADIX)
    const passedState = {
        ...state,
        carPrice: String(passedCarPrice + (state.add20 ? passedCarPrice * .2 : parseInt(state.additional || 0, DEX_RADIX))),
        additional: false
    }
    const passedParnterSource = partnerSource.replace(/\D/ig, '')
    const urlParts = urlParams
            .map(
                (key) =>
                (passedState[key] || passedState[key] === false) &&
                `${key}=${passedState[key]}`)
            .filter((value) => Boolean(value))
    return `https://www.sberbank.ru/sms/carloanrequest?${urlParts.join('&')}&source=drom${passedParnterSource ? `jjj${passedParnterSource}` : ''}`
}

class App extends React.PureComponent {
    state = {
        isNewCar: '',
        brand: '',
        model: '',
        carPrice: 1200000,
        downPayment: 400000,
        creditAmount: 800000,
        additional: '',
        add20: false,
        durationMonth: 36,
        incomeStatement: false,
        programsChildren: false,
        programsFirstCar: false,
        tradeIn: false,
        errors: {},
        carList: [],
        duration: durationDefaultList,
        showQR: false,
        showCalc: true
    }

    componentWillMount() {
        const { location } = this.props
        const search = makeSearchObj(location?.search)
        const passedCreditAmount = Math.min(MAX_CREDIT_AMOUNT, search?.desired_credit_amount)
        const desiredCarAmount = parseInt(search?.desired_credit_amount, DEX_RADIX) + parseInt(search?.down_payment, DEX_RADIX)
        const pasedDownPayment = desiredCarAmount - passedCreditAmount

        if (search?.desired_credit_amount) {
            this.setState({
                creditAmount: passedCreditAmount,
                carPrice: passedCreditAmount + pasedDownPayment
            })
        }
        if (search?.desired_credit_term) {
            this.setState({
                durationMonth: search?.desired_credit_term
            })
        }
        if (search?.down_payment) {
            this.setState({
                downPayment: pasedDownPayment
            })
        }
      }

    handleChange = (newValues) => {
        const errors = {}
        this.setState({
            ...newValues,
            errors
        })
    }

    handleChangeCarPrice = (value) => {
        this.handleChange({
            creditAmount: value,
            carPrice: parseInt(value, DEX_RADIX) + parseInt(this.state.downPayment, DEX_RADIX)
        })
    }

    handleChangeDuration = (value) => {
        this.handleChange({
            durationMonth: value
        })
    }


    render () {
        const { location } = this.props
        const partnerSource = location?.pathname?.substring(1)
        const monthlyPayment = getMonthlyPayment({
            percent,
            creditSum: this.state.creditAmount,
            term: this.state.durationMonth
        })
        
        const urlSmartLink = makeUrl({ state: this.state, partnerSource })
        const qrProps = {
            value: urlSmartLink,
            renderAs: 'svg',
            size: 212
        }

        return (
            <WrapperStyled>
                <HeadlineStyled variant="h3">{'Предварительный расчёт кредита'}</HeadlineStyled>
                <div>
                    <LabeledSlider
                        min={300000}
                        max={2000000}
                        step={10000}
                        suffix=" ₽"
                        label="Необходимая сумма кредита"
                        value={this.state.creditAmount}
                        mode="segmented"
                        onChange={this.handleChangeCarPrice}
                        // colorScheme="primary"
                        theme={lightTheme}
                    />
                </div>
                <div>
                    <LabeledSlider
                        options={this.state.duration}
                        label="Срок кредта"
                        value={this.state.durationMonth}
                        mode="segmented"
                        onChange={this.handleChangeDuration}
                        // colorScheme="primary"
                        theme={lightTheme}
                    />
                </div>
                <FlexWrapperStyled>
                    <LabeledText label="Платеж в месяц от" variant="h2" >{`${formatNumber(monthlyPayment, makeMoneyMask({ padFractionalZeros: false }))} ₽`}</LabeledText>
                    <RightButtonStyled title="Далее" fontWeight="semibold" size="lg" description="Нажимая далее, вы переходите в СберБанк Онлайн" as="a" href={urlSmartLink} target="_blank" fullWidth verticalMargin="nano" />
                </FlexWrapperStyled>

                <MarkupStyled verticalMargin="inner">
                    <IconWrapperStyled>
                        <Shield />
                    </IconWrapperStyled>
                    <TextStyled variant="h4" fontWeight="regular">{'Без обязательного КАСКО'}</TextStyled>
                </MarkupStyled>
                <MarkupStyled verticalMargin="inner">
                    <IconWrapperStyled>
                        <Document />
                    </IconWrapperStyled>
                    <TextStyled variant="h4" fontWeight="regular">{'Без справок о доходе и поручителей'}</TextStyled>
                </MarkupStyled>
                <MarkupStyled verticalMargin="inner">
                    <IconWrapperStyled>
                        <Passport />
                    </IconWrapperStyled>
                    <MarkupTextStyled>
                        <TextStyled variant="h4" fontWeight="regular">{'Понадобятся только паспорт и водительское удостоверение'}</TextStyled>
                    </MarkupTextStyled>
                </MarkupStyled>

                <Link size="md" colorScheme="primary" fontWeight="regular" href="https://www.sberbank.ru/ru/person/credits/money/cetelem" title="Узнать подробнее про условия кредита" iconReverse="false" verticalMargin="inner" underlined/>

                <PanelStyled verticalMargin="inner">
                    <ContentStyled size="h3" verticalPadding="inner">
                        <HeadlineStyled variant="h4">{'Удобнее через мобильное приложение?'}</HeadlineStyled>
                        <TextStyled variant="h4" fontWeight="regular">{'Отсканируй QR-код для перехода в СберБанк Онлайн'}</TextStyled>
                    </ContentStyled>
                    <QrStyled><QRCode {...qrProps} /></QrStyled>
                </PanelStyled>
            </WrapperStyled>
        )
    }
}

export default withAxios(App)
