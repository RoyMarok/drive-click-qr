import React from 'react'
import PropTypes from 'prop-types'
import { find, noop, uniqueId, map } from 'lodash'

import { Perimeter } from '../utils/perimeter'
import { withLabel } from '../labeled'
import { ReactComponent as ChevronDown } from '../icon/common/ic-24-chevron-down.svg'

import {
    ArrowStyled,
    ContentsStyled,
    ContentsViewStyled,
    ItemNotChosenStyled,
    ItemStyled,
    TargetStyled,
    WrapperStyled
} from './value-select.style'

import { enhancedChildren, filteredChildren } from './utils'

import { WrapperStyled as IconWrapperStyled } from '../icon/icon.style'


export class ValueSelectClassic extends React.Component {
    state = {
        open: false,
        active: this.props?.value
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
        // this.contents?.current?.focus()
        // this.perimeter?.current?.enableOnClickOutside()
    }
    handleClose = () => {
        this.setState({
            open: false
        })
        // this.target?.current?.focus()
        // this.perimeter?.current?.disableOnClickOutside()
    }

    handleFocus = (event) => this.props?.onFocus && this.props?.onFocus(event)
    handleBlur = () => this.props?.onBlur && this.props?.onBlur(this.props?.value)
    handleTargetClick = () => this.state.open ? this.handleClose() : this.handleOpen()

    handleOptionChoose = (e) => {
        const { value } = e.target
        const passedValue = value || e.target?.attributes?.value?.value
        this.setActive(passedValue)
        this.props.onChange(passedValue)
        this.handleClose()
    }

    setActive = (value) => {
        this.setState({
            active: value
        })
    }

    setRefTarget = (component) => {
        this.target = component
    }
    setRefContents = (component) => {
        this.contents = component
    }
    setRefPerimeter = (component) => {
        this.perimeter = component
    }

    render () {

        const {
            children,
            value,
            error,
            id,
            size,
            readOnly,
            translations,
            ariaLabel,
            ariaLabelledby,
            disabled
        } = this.props

        const enhCh = enhancedChildren(children)
        const selectedOption = find(filteredChildren(enhCh), (child) => child?.props?.value === String(value))
        const selectedItem = selectedOption
        ? selectedOption
        : (
                <ItemNotChosenStyled size={size} fontWeight="medium">
                    {translations.placeholder}
                </ItemNotChosenStyled>
            )
    

        const selectId = id || uniqueId('ui-select')

        

        return (
            <Perimeter
                onClickOutside={this.handleClose}
                // disableOnClickOutside
                ref={this.setRefPerimeter}
            >
                <WrapperStyled id={`${selectId}-wrapper`}>
                    <TargetStyled
                        type="button"
                        id={selectId}
                        ref={this.target}
                        onClick={this.handleTargetClick}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        aria-haspopup="listbox"
                        aria-expanded={this.state.open ? true : void 0}
                        // listbox должен связать себя с назначением
                        aria-labelledby={ariaLabelledby || selectId}
                        aria-label={ariaLabel}
                        disabled={disabled}
                        open={this.state.open}
                        error={error}
                        readOnly={readOnly}
                        size={size}
                    >
                        {selectedItem}

                        <ArrowStyled open={this.state.open}>
                            <IconWrapperStyled
                                colorScheme="primary"
                            ><ChevronDown /></IconWrapperStyled>
                        </ArrowStyled>
                    </TargetStyled>

                    {this.state.open &&
                        <ContentsStyled>
                            <ContentsViewStyled
                                id={`${selectId}-contents`}
                                ref={this.setRefContents}
                                // onKeyDown={handleKeyDownContents}
                                tabIndex={-1}
                                role="listbox"
                                aria-activedescendant={
                                    this.state.open ? `${selectId}-option-${this.state.active}` : void 0
                                }
                                // listbox должен связать себя с назначением
                                aria-labelledby={ariaLabelledby}
                                aria-label={ariaLabel}
                            >
                               
                                {
                                    map(enhCh, (item, key) => {
                                        const child = enhCh[key]
                                        // const child = React.cloneElement(enhCh[key], { onClick: this.handleOptionChoose})
                                        const value = child?.props?.value
                                        return (
                                            <ItemStyled
                                                id={`${selectId}-option-${value}`}
                                                key={key}
                                                size={size}
                                                isOption={true}
                                                value={value}
                                                focused={String(this.state.active) === String(value)}
                                                onClick={this.handleOptionChoose}
                                                role='option'
                                            >
                                                {child}
                                            </ItemStyled>
                                        )
                                    })
                                }
                            </ContentsViewStyled>
                        </ContentsStyled>
                    }
                </WrapperStyled>
            </Perimeter>
        )
    }
}

ValueSelectClassic.propTypes = {
    children: PropTypes.node,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    error: PropTypes.string,
    id: PropTypes.string,
    mode: PropTypes.oneOf(['select', 'autoselect', 'multiselect']),
    size: PropTypes.oneOf(['md', 'lg']),
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    translations: PropTypes.shape({
        placeholder: PropTypes.string
    }),
    ariaLabelledby: PropTypes.string,
    ariaLabel: PropTypes.string,
}

ValueSelectClassic.defaultProps = {
    children: [],
    value: '',
    onChange: noop,
    onFocus: noop,
    onBlur: noop,
    error: '',
    id: '',
    mode: 'select',
    size: 'md',
    disabled: false,
    readOnly: false,
    translations: {
        placeholder: 'Выберите из списка'
    },
    ariaLabelledby: '',
    ariaLabel: ''
}

export const LabeledValueSelectClassic = withLabel(ValueSelectClassic)