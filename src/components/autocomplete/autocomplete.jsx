import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
// import { List } from 'react-virtualized'
import { noop, uniqueId, find, last, map } from 'lodash'

import { TextField } from '../TextField'
import { keyCodes } from '../utils/dropdown-utils'
import { Perimeter } from '../utils/perimeter'
import { ContainedLoader } from '../loader/contained-loader'
import { currentIndex, nextValue, prevValue, enhancedChildren, filteredChildren } from '../value-select/utils'

import { withLabel } from '../labeled'
import {
    ContentsStyled,
    ContentsViewStyled,
    ItemStyled,
    dynamicHeight
} from '../value-select/value-select.style'

import {
    WrapperStyled,
    TargetStyled,
    NoMatchesStyled,
    LoaderWrapperStyled
} from './autocomplete.style'

export const mapTypographySize = {
    lg: 'md',
    md: 'sm'
}

export const Autocomplete = ({
    id,
    value,
    onChange,
    onBlur = noop,
    onFocus = noop,
    size = 'md',
    placeholder,
    children = [],
    mode,
    disabled,
    readOnly,
    error,
    autoComplete = 'off',
    ariaLabelledby,
    ariaLabel,
    translations = {
        noMatches: 'Нет совпадений',
        loadingError: 'Ошибка загрузки'
    }
}) => {
    const inputId = useMemo(() => id || uniqueId('autocomplete'), [id])
    const enhChildren = enhancedChildren(children)
    const filteredCh = filteredChildren(enhChildren)
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState(null)
    const [checked, setChecked] = useState(
        filteredCh.find((child) => child.props.value === value) || null
    )

    const target = useRef(null)
    const contents = useRef(null)
    const perimeter = useRef(null)

    useEffect(() => {
        if (open) {
            perimeter.current.enableOnClickOutside()
        } else {
            perimeter.current.disableOnClickOutside()
        }
    }, [open])

    const isOpen = useMemo(
        () => (filteredCh.length || mode) && open,
        [filteredCh, open, mode]
    )

    const handleClose = useCallback(() => {
        setOpen(false)
        setActive(null)
    }, [])

    const handleFocus = useCallback(
        (event) => {
            setActive(checked)
            setOpen(true)
            onFocus(event)
        },
        [checked, onFocus]
    )

    const handleBlur = useCallback(() => {
        onBlur(value)
    }, [value, onBlur])

    const handleClear = useCallback(() => {
        setActive(null)
        setChecked(null)
        setOpen(true)
        onChange('')
    }, [onChange])

    const handleOptionChoose = useCallback((event) => {
        const { innerText, value } = event.target
        onChange(value || innerText)
        handleClose()
    }, [onChange, handleClose])

    const handleChange = useCallback(
        (val) => {
            onChange(val)
            if (!open) {
                setOpen(true)
            }
        },
        [onChange, open]
    )

    const handleKeyDownTarget = useCallback(
        (event) => {
            switch (event.keyCode) {
                case keyCodes.KEY_ESCAPE: {
                    event.preventDefault()
                    handleClear()
                    break
                }

                case keyCodes.KEY_ENTER: {
                    event.preventDefault()
                    const activeChild = find(filteredCh, { props: { value: active } })

                    if (activeChild) {
                        handleOptionChoose(activeChild)
                    }
                    break
                }

                case keyCodes.KEY_TAB: {
                    handleClose()
                    break
                }

                case keyCodes.KEY_ARROW_DOWN: {
                    event.preventDefault()
                    const nextVal = nextValue(filteredCh, active || checked)

                    if (nextVal) {
                        setActive(nextVal)
                    }
                    break
                }

                case keyCodes.KEY_ARROW_UP: {
                    event.preventDefault()
                    const prevVal = prevValue(filteredCh, active || checked)

                    if (prevVal) {
                        setActive(prevVal)
                    }
                    break
                }

                case keyCodes.KEY_HOME: {
                    event.preventDefault()
                    setActive(filteredCh[0]?.props.value)
                    break
                }

                case keyCodes.KEY_END: {
                    event.preventDefault()
                    setActive(last(filteredCh)?.props.value)
                    break
                }

                default: {
                    break
                }
            }
        },
        [filteredCh, active, checked]
    )

    const renderContent = useMemo(() => {
        if (mode === 'error') {
            return (
                <NoMatchesStyled size={size} as="li" fontWeight="medium">
                    {translations.loadingError}
                </NoMatchesStyled>
            )
        }
        if (mode === 'loading') {
            return (
                <LoaderWrapperStyled size={size} >
                    <ContainedLoader />
                </LoaderWrapperStyled>
            )
        }
        if (mode === 'noMatches') {
            return (
                <NoMatchesStyled size={size} as="li" fontWeight="medium">
                    {translations.noMatches}
                </NoMatchesStyled>
            )
        }

        return map(enhChildren, (item, key) => {
            const child = enhChildren[key]
            const value = child?.props?.value
            return (
                <ItemStyled
                    id={`${inputId}-option-${child.props.value}`}
                    key={key}
                    size={size}
                    isOption={true}
                    focused={active === child.props.value}
                    checked={checked === child.props.value}
                    ariaSelected={checked === child.props.value}
                    onClick={handleOptionChoose}
                    value={value}
                    role='option'
                >
                    {child}
                </ItemStyled>
            )
        })
    }, [enhChildren, open, active, mode])

    return (
        <Perimeter
            onClickOutside={handleClose}
            disableOnClickOutside
            ref={perimeter}
        >
            <WrapperStyled id={`${inputId}-wrapper`}>
                <TargetStyled
                    role="combobox"
                    ref={target}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-owns={`${inputId}-contents`}
                >
                    <TextField
                        id={inputId}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDownTarget}
                        disabled={disabled}
                        readOnly={readOnly}
                        error={error}
                        aria-autocomplete="list"
                        size={size}
                        verticalMargin="zero"
                        autoComplete={autoComplete}
                    />
                </TargetStyled>

                {open && <ContentsStyled>
                    <ContentsViewStyled
                        id={`${inputId}-contents`}
                        ref={contents}
                        tabIndex={-1}
                        role="listbox"
                        aria-activedescendant={
                            isOpen ? `${inputId}-option-${active}` : void 0
                        }
                        aria-labelledby={ariaLabelledby}
                        aria-label={ariaLabel}
                    >
                        {renderContent}
                    </ContentsViewStyled>
                </ContentsStyled>}
            </WrapperStyled>
        </Perimeter>
    )
}

Autocomplete.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    size: PropTypes.string,
    placeholder: PropTypes.string,
    children: PropTypes.node,
    mode: PropTypes.oneOf(['loading', 'error', 'noMatches']),
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    error: PropTypes.string,
    autoComplete: PropTypes.string,
    ariaLabelledby: PropTypes.string,
    ariaLabel: PropTypes.string,
    translations: PropTypes.shape({
        noMatches: PropTypes.string
    })
}

export const LabeledAutocomplete = withLabel(Autocomplete)
