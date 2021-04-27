/** @jsxImportSource @emotion/react */
import React from 'react'
import QRCode from 'qrcode.react'
import { Calculator } from './Calculator'
import { css } from '@emotion/react/macro'

const style = css({
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
})
class App extends React.PureComponent {
    state = {
        isNewCar: true,
        brand: '',
        model: '',
        carPrice: 0,
        downPayment: 0,
        durationMonth: 36,
        incomeStatement: false,
        programsChildren: false,
        programsFirstCar: false,
        tradeIn: false
    }

    handleSetBrand = (brand) => {
        this.setState({
            brand
        })
    }
    handleSetModel = (model) => {
        this.setState({
            model
        })
    }
    handleSetCarProce = (carPrice) => {
        this.setState({
            carPrice
        })
    }
    handleSetDownPayment = (downPayment) => {
        this.setState({
            downPayment
        })
    }
    handleSetDurationMonth = (durationMonth) => {
        this.setState({
            durationMonth
        })
    }

    render () {
        const calculatorProps = {
            brand: this.state.brand,
            model: this.state.model,
            carPrice: this.state.carPrice,
            downPayment: this.state.downPayment,
            durationMonth: this.state.durationMonth
        }
        
        const urlParts = Object.keys(this.state)
            .map(
                (key) =>
                (this.state[key] || this.state[key] === false) &&
                `${key}=${this.state[key]}`)
            .filter((value) => Boolean(value))
        const qrProps = {
            value: `https://www.sberbank.ru/sms/carloanrequest?downPaymentType=currency${urlParts.length >0 && '&'}${urlParts.join('&')}&source=dealer`,
            renderAs: 'svg',
            size: 256
        }

        console.log(
            'Array',
            style
        )
        return (
            <div css={style}>
                <Calculator {...calculatorProps} />
                <QRCode {...qrProps} />
                <a href={qrProps.value} >{qrProps.value}</a>
            </div>
        )
    }
}

export default App
