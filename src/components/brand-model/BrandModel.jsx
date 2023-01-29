import React from 'react'
import { isEqual, includes, join, map, split, compact, uniq, filter, startsWith, capitalize } from 'lodash'
import { LabeledAutocomplete } from '../autocomplete'
import { ValueOption } from '../value-select'

import langSlangSupport from './brands-pseudo-names.json'
import { keySupport, translit } from './keys-transform'

const replaceKeys = (search, table) => join(map(split(search.toLowerCase(), ''), (char) => table[char] || char), '')

const findInDictionary = (search, dictionary) =>
    search && compact(
        uniq(
            filter(
                dictionary,
                (item, key) =>
                    startsWith(
                        String(key).toUpperCase(),
                        String(search).toUpperCase()
                    )
            )
        )
    )

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
        const passedQuery = String(value).toLowerCase()
        const replaced = replaceKeys(passedQuery, keySupport).toLowerCase()
        const translited = replaceKeys(passedQuery, translit).toLowerCase()
        const findedInDirectory = findInDictionary(passedQuery, langSlangSupport)

        const filteredOptions = this.state.options.filter(
            (option) => option.title.toLowerCase().includes(passedQuery)
                || (replaced && option.title.toLowerCase().includes(replaced))
                || (translited && option.title.toLowerCase().includes(translited))
                || (findedInDirectory && includes(findedInDirectory, option?.properties?.brand?.toUpperCase()))
        )
        const mode = !filteredOptions.length ? 'noMatches' : void 0

        const matchOption = this.state.options.filter(
            (option) => option.title.toLowerCase() === passedQuery
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
                    placeholder='Начните вводить марку'
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