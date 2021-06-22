import React from 'react'
import QRCode from 'qrcode.react'
import { isEmpty, parseInt, sortBy } from 'lodash'
import IMask from 'imask'
import copy from 'copy-to-clipboard'
import { withAxios } from 'react-axios'
import { animateScroll } from 'react-scroll'

import { ReactComponent as ArrowLeft } from './components/icon/common/ic-24-arrow-left.svg'
import { Calculator } from './Calculator'
import { WrapperStyled, QrStyled, NonPrintablePanelStyled, NonPrintableText, PrintablePanelStyled, IconWrapperStyled } from './components/styles/wrapper.style'
import * as lightTheme from './components/styles/light.theme.style'
import { makeMoneyMask } from './components/utils'
import { ButtonClassic } from './components/button'
import { withLabel } from './components/labeled'
import { Headline1 } from './components/headline'
import { Link } from './components/link'

const INITIAL_LOW = 0.2
const INITIAL_HIGH = 0.9

const urlParams = [
    'isNewCar',
    'brand',
    'model',
    'carPrice',
    'downPayment',
    'durationMonth',
    'incomeStatement',
    // 'programsChildren',
    // 'programsFirstCar',
    // 'tradeIn'
]

const LabeledButton = withLabel(ButtonClassic)

const makeUrl = ({ state, partnerSource }) => {
    const passedState = {
        ...state,
        carPrice: String(parseInt(state.carPrice) + parseInt(state.additional)),
        additional: false
    }
    const urlParts = urlParams
            .map(
                (key) =>
                (passedState[key] || passedState[key] === false) &&
                `${key}=${passedState[key]}`)
            .filter((value) => Boolean(value))
    return `https://www.sberbank.ru/sms/carloanrequest?${urlParts.join('&')}&source=dealer${partnerSource ? `jjj${partnerSource}` : ''}`
}

class App extends React.PureComponent {
    state = {
        isNewCar: '',
        brand: '',
        model: '',
        carPrice: 1200000,
        downPayment: 400000,
        additional: '',
        durationMonth: 36,
        incomeStatement: false,
        programsChildren: false,
        programsFirstCar: false,
        tradeIn: false,
        errors: {},
        carList: [],
        showQR: false,
        showCalc: true
    }

    componentWillMount() {
        this.props.axios('/car-list.json').then(result => {
          this.setState({ carList: sortBy(result.data, ['title']) })
        })
      }

    handleChange = (newValues) => {
        const errors = {}
        const carPrice = newValues?.carPrice || this.state.carPrice
        const downPayment = newValues?.downPayment || this.state.downPayment
        const initialRate = downPayment / carPrice
        const minInitial = parseInt(carPrice*INITIAL_LOW)
        const maxInitial = parseInt(carPrice*INITIAL_HIGH)
        const masked = IMask.createMask(makeMoneyMask({ scale: '0', radix: ' ' }))

        if ( initialRate < INITIAL_LOW) {
            errors['downPayment'] = `Слишком маленький первоначальный взнос. Меньше ${masked.resolve(String(minInitial))} ₽`
        } else 
        if ( initialRate > INITIAL_HIGH) {
            errors['downPayment'] = `Слишком большой первоначальный взнос. Больше ${masked.resolve(String(maxInitial))} ₽`
        }
        this.setState({
            ...newValues,
            errors
        })
    }

    handleShowQR = () => {
        let stateSetProps = {
            showQR: true,
            showCalc: false
        }
        if (this.state.isNewCar === '') {
            stateSetProps = {
                errors: {
                    isNewCar: 'Выберете новый или подержаный'
                }
            }
        }
        this.setState(stateSetProps)
        animateScroll.scrollToTop({})
    }

    handleShowCalc = () => {
        this.setState({
            showQR: false,
            showCalc: true,
            copy: ''
        })
    }

    handleCopyToClipboard = () => {
        const { location } = this.props
        const partnerSource = location?.pathname?.substring(1)
        copy(makeUrl({ state: this.state, partnerSource }))
        this.setState({
            copy: 'Скопировано'
        })
    }

    handlePrint = () => {
        window.print()
    }

    render () {
        const { location } = this.props
        const partnerSource = location?.pathname?.substring(1)
        const calculatorProps = {
            ...this.state,
            onChange: this.handleChange,
            errors: this.state.errors,
            carList: this.state.carList
        }
        
        const urlSmartLink = makeUrl({ state: this.state, partnerSource })
        const qrProps = {
            value: urlSmartLink,
            renderAs: 'svg',
            size: 544
        }

        return (
            <WrapperStyled>
                {this.state.showCalc && <NonPrintablePanelStyled>
                    {/* <Headline1>Параметры</Headline1> */}
                    <Calculator {...calculatorProps} theme={lightTheme} />
                    <ButtonClassic title="Показать QR-код" fontWeight="semibold" fullWidth onClick={this.handleShowQR} />
                </NonPrintablePanelStyled>}
                {this.state.showQR && isEmpty(this.state.erros) && <PrintablePanelStyled>
                    <NonPrintableText>
                        <Link size="lg" colorScheme="primary" fontWeight="semibold" href="#" onClick={this.handleShowCalc} title="Изменить параметры" iconReverse="false">
                            <IconWrapperStyled>
                                <ArrowLeft />
                            </IconWrapperStyled>
                        </Link>
                    </NonPrintableText>
                    <QrStyled>
                        <QRCode {...qrProps} />
                    </QrStyled>
                    <NonPrintableText>
                        <LabeledButton title="Скопировать ссылку" fullWidth mode="secondary" onClick={this.handleCopyToClipboard} error={this.state?.copy} />
                        <ButtonClassic title="Напечатать QR-код" mode="secondary" fullWidth onClick={this.handlePrint}/>
                        <ButtonClassic title="Перейти в СберБанк Online" mode="secondary" fullWidth as="a" href={urlSmartLink} target="_blank"/>
                    </NonPrintableText>
                </PrintablePanelStyled>}
                
            </WrapperStyled>
        )
    }
}

export default withAxios(App)
