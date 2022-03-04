import React from 'react'
import QRCode from 'qrcode.react'
import { withAxios } from 'react-axios'

import { ReactComponent as Shield } from './components/icon/common/ic-24-shield-check.svg'
import { ReactComponent as Document } from './components/icon/common/ic-24-document-check.svg'
import { ReactComponent as Passport } from './components/icon/common/ic-24-passport.svg'
import { WrapperStyled, WrapperBlockStyled, QrStyled, PanelStyled, IconWrapperStyled, FlexWrapperStyled, RightButtonStyled, MarkupStyled, MarkupTextStyled, ContentStyled } from './components/styles/wrapper.style'
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
const MIN_CREDIT_AMOUNT = 300000
const percent = 7.2

const urlParams = [
    'isNewCar',
    'brand',
    'model',
    'carPrice',
    'downPayment',
    'durationMonth',
    'source'
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

const makeUrl = ({ state }) => {
    const passedCarPrice = parseInt(state.carPrice, DEX_RADIX)
    const passedState = {
        ...state,
        carPrice: String(passedCarPrice + (state.add20 ? passedCarPrice * .2 : parseInt(state.additional || 0, DEX_RADIX))),
        additional: false
    }
    const urlParts = urlParams
            .map(
                (key) =>
                (passedState[key] || passedState[key] === false) &&
                `${key}=${passedState[key]}`)
            .filter((value) => Boolean(value))
    return `https://www.sberbank.ru/sms/carloanrequest?${urlParts.join('&')}`
}

class App extends React.PureComponent {
    state = {
        isNewCar: false,
        brand: '',
        model: '',
        carPrice: 1200000,
        downPayment: 400000,
        creditAmount: 800000,
        additional: '',
        add20: false,
        durationMonth: 72,
        incomeStatement: false,
        programsChildren: false,
        programsFirstCar: false,
        tradeIn: false,
        errors: {},
        carList: [],
        duration: durationDefaultList,
        showQR: false,
        showCalc: true,
        percent: 19.9,
        source: ''
    }

    componentWillMount() {
        this.props.axios('config.json').then(result => {
            this.setState({...result.data})
        })

        const search = makeSearchObj(document.URL.split('?').pop())
        const passedCarAmount = search?.carPrice
        const passedCreditAmount = Math.min(MAX_CREDIT_AMOUNT, passedCarAmount - search?.downPayment)
        const pasedDownPayment = passedCarAmount - passedCreditAmount

        if (passedCarAmount) {
            this.setState({
                creditAmount: passedCreditAmount,
                carPrice: passedCarAmount,
                // durationMonth: search?.durationMonth,
                downPayment: pasedDownPayment,
                // brand: decodeURI(search?.brand).toUpperCase(),
                // model: decodeURI(search?.model).toUpperCase(),
                source: search?.source,
                isNewCar: search?.isNewCar
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
        const monthlyPayment = getMonthlyPayment({
            percent: this.state.percent,
            creditSum: this.state.creditAmount,
            term: this.state.durationMonth
        })
        
        const urlSmartLink = makeUrl({ 
            state: {
                ...this.state,
                source: this.state.source ? `${this.state.source}jjjiframe` : ''
            } 
        })
        const urlSmartLinkQR = makeUrl({ 
            state: {
                ...this.state,
                source: this.state.source ? `${this.state.source}jjjqr` : ''
            } 
        })
        const qrProps = {
            value: urlSmartLinkQR,
            renderAs: 'svg',
            size: 184
        }

        return (
            <WrapperStyled>
                <HeadlineStyled variant="h3" indent="zero">{'Предварительный расчёт кредита'}</HeadlineStyled>
                <div>
                    <LabeledSlider
                        min={MIN_CREDIT_AMOUNT}
                        max={MAX_CREDIT_AMOUNT}
                        step={10000}
                        suffix=" ₽"
                        label="Необходимая сумма кредита"
                        value={this.state.creditAmount}
                        mode="segmented"
                        onChange={this.handleChangeCarPrice}
                        theme={lightTheme}
                    />
                </div>
                <div>
                    <LabeledSlider
                        options={this.state.duration}
                        label="Срок кредита"
                        value={this.state.durationMonth}
                        mode="segmented"
                        onChange={this.handleChangeDuration}
                        theme={lightTheme}
                    />
                </div>
                <WrapperBlockStyled verticalMargin="open">
                    <FlexWrapperStyled verticalMargin="inner">
                        
                            <LabeledText
                                label="Платеж в месяц от"
                                variant="h2"
                                indent="zero"
                                verticalMargin="nano"
                                verticalMarginDirection="bottom"
                            >
                                {`${formatNumber(
                                    monthlyPayment,
                                    makeMoneyMask({ padFractionalZeros: false })
                                )
                                    } ₽`}
                            </LabeledText>

                            <RightButtonStyled
                                title="Далее"
                                fontWeight="semibold"
                                size="lg"
                                description="Нажимая далее, вы переходите в СберБанк Онлайн"
                                as="a"
                                href={urlSmartLink}
                                target="_blank"
                                fullWidth
                                verticalMargin="zero"
                            />
                        
                    </FlexWrapperStyled>
                </WrapperBlockStyled>

                <MarkupStyled verticalMargin="inner">
                    <IconWrapperStyled>
                        <Shield />
                    </IconWrapperStyled>
                    <MarkupTextStyled>
                        <TextStyled variant="h4" fontWeight="regular" indent="zero">{'Без обязательного КАСКО'}</TextStyled>
                    </MarkupTextStyled>
                </MarkupStyled>
                <MarkupStyled verticalMargin="inner">
                    <IconWrapperStyled>
                        <Document />
                    </IconWrapperStyled>
                    <MarkupTextStyled>
                        <TextStyled variant="h4" fontWeight="regular" indent="zero">{'Без справок о доходе и поручителей'}</TextStyled>
                    </MarkupTextStyled>  
                </MarkupStyled>
                <MarkupStyled verticalMargin="inner">
                    <IconWrapperStyled>
                        <Passport />
                    </IconWrapperStyled>
                    <MarkupTextStyled>
                        <TextStyled variant="h4" fontWeight="regular" indent="zero">{'Понадобятся только паспорт и водительское удостоверение'}</TextStyled>
                    </MarkupTextStyled>
                </MarkupStyled>

                <Link
                    size="md"
                    colorScheme="primary"
                    fontWeight="regular"
                    // href="https://www.sberbank.ru/ru/person/credits/money/cetelem"
                    href="https://www.cetelem.ru/upload/iblock/1da/TP_VASH-VYBOR_KLASSIFAYD_20211215.pdf"
                    title="Узнать подробнее про условия кредита"
                    iconReverse="false"
                    verticalMargin="inner"
                    underlined
                    target="_blank"
                />

                <PanelStyled verticalMargin="inner">
                    <ContentStyled size="h3" verticalPadding="inner">
                        <HeadlineStyled variant="h4">{'Удобнее через мобильное приложение?'}</HeadlineStyled>
                        <TextStyled
                            variant="md"
                            fontWeight="regular"
                            color="secondary"
                            theme={lightTheme}
                        >
                            {'Отсканируй QR-код для перехода в СберБанк Онлайн'}
                        </TextStyled>
                    </ContentStyled>
                    <QrStyled><QRCode {...qrProps} /></QrStyled>
                </PanelStyled>
            </WrapperStyled>
        )
    }
}

export default withAxios(App)
