import React from 'react'
import { map } from 'lodash'

import { LabeledTextFieldMoney } from './components/TextFieldMoney'
import { Switch } from './components/Switch'
import { LabeledValueSelectClassic, ValueOption } from './components/value-select'
import { BrandModel } from './components/brand-model'

export class Calculator extends React.Component {
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
        this.changeParams({
            title: 'add20',
            value
        })
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
            add20,
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
                    {'?????????? ????????????????????'}
                </Switch> */}

                <LabeledValueSelectClassic
                    value={passedValue}
                    onChange={this.handleIsNewCar}
                    error={errors?.['isNewCar']}
                    label={'?????????? / ??????????????????????'}
                >
                    <ValueOption
                        value={'new'}
                        title="?????????? ????????????????????"
                    />
                    <ValueOption
                        value={'old'}
                        title="?????????????????????? ????????????????????"
                    />
                </LabeledValueSelectClassic>
                <BrandModel
                    name="brandModel"
                    brand={brand}
                    model={model}
                    onChange={this.handleBrandModel}
                    error={errors?.['model']}
                    label={'?????????? ?? ????????????'}
                    carList={carList}
                />
                <LabeledTextFieldMoney
                    placeholder=""
                    label={'?????????????????? ????????????????????'}
                    value={`${carPrice}`}
                    error={errors?.['carPrice']}
                    a11y={{ label: "?????????????????? ????????????????????" }}
                    onChange={this.handleCarPrice}
                    size='md'
                    currency={{ title: "RUB" }}
                    maskOptions={{ scale: '0', radix: ' ' }}
                />
                <LabeledTextFieldMoney
                    placeholder=""
                    label={'???????????????????????????? ??????????'}
                    value={`${downPayment}`}
                    error={errors?.['downPayment']}
                    a11y={{ label: "???????????????????????????? ??????????" }}
                    onChange={this.handleDownPayment}
                    size='md'
                    currency={{ title: "RUB" }}
                    maskOptions={{ scale: '0', radix: ' ' }}
                />
                <LabeledValueSelectClassic
                    value={durationMonth}
                    onChange={this.handleDuration}
                    label={'???????? ??????????????'}
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
               
                <Switch
                    name="tradeIn"
                    mode="switch"
                    value={add20}
                    onChange={this.handleShowAdd}
                >
                    {'+20%'}
                </Switch>
                {!add20 && <LabeledTextFieldMoney
                    placeholder=""
                    label={'???????????????????????????? ????????????????????????'}
                    value={`${additional}`}
                    error={errors?.['additional']}
                    a11y={{ label: "???????????????????????????? ????????????????????????" }}
                    onChange={this.handleAdditional}
                    size='md'
                    currency={{ title: "RUB" }}
                    maskOptions={{ scale: '0', radix: ' ' }}
                />}


                {/* <Switch
                    name="incomeStatement"
                    mode="switch"
                    value={incomeStatement}
                    onChange={this.handleIncomeStatement}
                >
                    {'???????? ?????????????? ?? ??????????????'}
                </Switch> */}
                {/* <Switch
                    name="programsChildren"
                    mode="switch"
                    value={programsChildren}
                    onChange={this.handleProgramsChildren}
                >
                    {'?? ???????? ???????? ?? ???????????? ?????????? ???? 18 ??????'}
                </Switch>
                <Switch
                    name="programsFirstCar"
                    mode="switch"
                    value={programsFirstCar}
                    onChange={this.handleProgramsFirstCar}
                >
                    {'?????????? ???? ???????? ?????????????????????? ?? ??????????????????????????'}
                </Switch>
                <Switch
                    name="tradeIn"
                    mode="switch"
                    value={tradeIn}
                    onChange={this.handleTradeIn}
                >
                    {'Trade-In'}
                </Switch> */}
            </React.Fragment>
        )
    }
}
