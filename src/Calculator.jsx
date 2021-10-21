import React from 'react'
import { map } from 'lodash'

import { LabeledTextFieldMoney } from './components/TextFieldMoney'
import { Switch } from './components/Switch'
import { LabeledValueSelectClassic, ValueOption } from './components/value-select'
import { BrandModel } from './components/brand-model'

export class Calculator extends React.Component {
    state = {
        showAdd: true
    }

    changeParams = ({ title, value }) => {
        const { onChange } = this.props
        const changeObj = {}
        changeObj[title] = value
        onChange(changeObj)
    }

    handleBrandModel = (props) => {
        console.log('Calculator handleBrandModel', props)
        this.changeParams({
            title: 'brand',
            value: props?.brand
        })
        this.changeParams({
            title: 'model',
            value: props?.model
        })
    }

    handleCarPrice = (value) => {
        this.changeParams({
            title: 'carPrice',
            value
        })
        if (!this.state.showAdd) {
            this.changeParams({
                title: 'additional',
                value: value * 0.2
            })
        }
    }

    handleDownPayment = (value) => {
        this.changeParams({
            title: 'downPayment',
            value
        })
    }

    handleIsNewCar = (value) => {
        let passedValue = ''
        if (value === 'new') {
            passedValue = true
        }
        if (value === 'old') {
            passedValue = false
        }
        this.changeParams({
            title: 'isNewCar',
            value: passedValue
        })
    }

    handleDuration = (value) => {
        this.changeParams({
            title: 'durationMonth',
            value
        })
    }
    handleIncomeStatement = (value) => {
        this.changeParams({
            title: 'incomeStatement',
            value
        })
    }
    handleProgramsChildren = (value) => {
        this.changeParams({
            title: 'programsChildren',
            value
        })
    }
    handleProgramsFirstCar = (value) => {
        this.changeParams({
            title: 'programsFirstCar',
            value
        })
    }
    handleTradeIn = (value) => {
        this.changeParams({
            title: 'tradeIn',
            value
        })
    }
    handleAdditional = (value) => {
        this.changeParams({
            title: 'additional',
            value
        })
    }
    handleShowAdd = (value) => {
        this.setState({
            showAdd: !this.state.showAdd
        })
        if (value) {
            this.changeParams({
                title: 'additional',
                value: this.props.carPrice * 0.2
            })
        }
    }

    render() {
        const {
            isNewCar,
            brand,
            model,
            carPrice,
            downPayment,
            durationMonth,
            // incomeStatement,
            additional,
            duration,
            // programsChildren,
            // programsFirstCar,
            // tradeIn,
            carList,
            errors
        } = this.props

        let passedValue = isNewCar
        if (isNewCar === true) {
            passedValue = 'new'
        }
        if (isNewCar === false) {
            passedValue = 'old'
        }
        return (
            <React.Fragment>
                {/* <Switch
                    name="isNewCar"
                    mode="switch"
                    value={isNewCar}
                    onChange={this.handleIsNewCar}
                >
                    {'Новый автомобиль'}
                </Switch> */}

                <LabeledValueSelectClassic
                    value={passedValue}
                    onChange={this.handleIsNewCar}
                    error={errors?.['isNewCar']}
                    label={'Новый / Подержанный'}
                >
                    <ValueOption
                        value={'new'}
                        title="Новый автомобиль"
                    />
                    <ValueOption
                        value={'old'}
                        title="Подержанный автомобиль"
                    />
                </LabeledValueSelectClassic>
                <BrandModel
                    name="brandModel"
                    brand={brand}
                    model={model}
                    onChange={this.handleBrandModel}
                    error={errors?.['model']}
                    label={'Марка и модель'}
                    carList={carList}
                />
                <LabeledTextFieldMoney
                    placeholder=""
                    label={'Стоимость автомобиля'}
                    value={`${carPrice}`}
                    error={errors?.['carPrice']}
                    a11y={{ label: "Стоимость автомобиля" }}
                    onChange={this.handleCarPrice}
                    size='md'
                    currency={{ title: "RUB" }}
                    maskOptions={{ scale: '0', radix: ' ' }}
                />
                <LabeledTextFieldMoney
                    placeholder=""
                    label={'Первоначальный взнос'}
                    value={`${downPayment}`}
                    error={errors?.['downPayment']}
                    a11y={{ label: "Первоначальный взнос" }}
                    onChange={this.handleDownPayment}
                    size='md'
                    currency={{ title: "RUB" }}
                    maskOptions={{ scale: '0', radix: ' ' }}
                />
                <LabeledValueSelectClassic
                    value={durationMonth}
                    onChange={this.handleDuration}
                    label={'Срок кредита'}
                >
                    {
                        map(duration, (item) => (
                            <ValueOption
                                value={item?.value}
                                title={item?.title}
                            />
                        ))
                    }
                </LabeledValueSelectClassic>
                {/* <Switch
                    name="incomeStatement"
                    mode="switch"
                    value={incomeStatement}
                    onChange={this.handleIncomeStatement}
                >
                    {'Есть справка о доходах'}
                </Switch> */}
                {/* <Switch
                    name="programsChildren"
                    mode="switch"
                    value={programsChildren}
                    onChange={this.handleProgramsChildren}
                >
                    {'У меня двое и больше детей до 18 лет'}
                </Switch>
                <Switch
                    name="programsFirstCar"
                    mode="switch"
                    value={programsFirstCar}
                    onChange={this.handleProgramsFirstCar}
                >
                    {'Ранее не было автомобилей в собственности'}
                </Switch>
                <Switch
                    name="tradeIn"
                    mode="switch"
                    value={tradeIn}
                    onChange={this.handleTradeIn}
                >
                    {'Trade-In'}
                </Switch> */}
                <Switch
                    name="tradeIn"
                    mode="switch"
                    value={!this.state.showAdd}
                    onChange={this.handleShowAdd}
                >
                    {'+20%'}
                </Switch>
                {this.state.showAdd && <LabeledTextFieldMoney
                    placeholder=""
                    label={'Дополнительное оборудование'}
                    value={`${additional}`}
                    error={errors?.['additional']}
                    a11y={{ label: "Дополнительное оборудование" }}
                    onChange={this.handleAdditional}
                    size='md'
                    currency={{ title: "RUB" }}
                    maskOptions={{ scale: '0', radix: ' ' }}
                />}
            </React.Fragment>
        )
    }
}
