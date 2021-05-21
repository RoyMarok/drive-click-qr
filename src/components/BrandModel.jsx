import React from 'react'
import { isEqual } from 'lodash'
import { LabeledAutocomplete } from './autocomplete'
import { ValueOption } from './value-select'


export class BrandModel extends React.PureComponent {

    state = {
        options: this.props.carList,
        filteredOptions: [],
        value: '',
        mode: 'noMatches'
    }

    componentDidUpdate (prevProps, prevState) {
        if (!isEqual(prevState.options, this.props.carList)){
            this.setState({
                options: this.props.carList
            })
        }
    }

    handleChange = (value) => {
        const filteredOptions = this.state.options.filter(
            (option) => option.title.toLowerCase().includes(String(this.state.value).toLowerCase())
        )
        const mode = !filteredOptions.length ? 'noMatches' : void 0

        const matchOption = this.state.options.filter(
            (option) => option.title.toLowerCase() === String(value).toLowerCase()
        )
        
        if (matchOption.length) {
            this.props.onChange({
                ...matchOption[0]?.properties
            })
        }

        this.setState({
            mode,
            filteredOptions,
            value: value || ''
        })
    }

    render () {
        return (
            <LabeledAutocomplete
                    value={this.state.value}
                    onChange={this.handleChange}
                    mode={this.state.mode}
                    placeholder='Выберите автомобиль'
                    error={this.props.error}
                    label={this.props?.label}
                >
                    {this.state.filteredOptions.map(({ value, title }) => (
                        <ValueOption value={title} key={value} title={title} />
                    ))}
            </LabeledAutocomplete>
        )
    }
}