import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { extend, noop } from 'lodash'


import { withLabel } from './labeled'

import {
    TextFieldStyled,
    WrapperStyled
} from './styles/text-field.style'

export const TextField = ({
        size = 'md',
        a11y,
        additionalText,
        additionalChild,
        icon,
        error,
        id,
        formName,
        refWrapper,
        onChange = noop,
        disabled,
        readOnly,
        onFocus,
        onBlur,
        onClick = noop,
        className,
        ...props
    }) => {

        const handleChange = useCallback((e) => {
            if (onChange) {
                onChange(e?.target?.value, e)
            }
        }, [onChange])

        const passedProps = extend(props, {
            ref: refWrapper,
            onChange: handleChange,
            form: formName,
            disabled,
            readOnly,
            error,
            size,
            icon,
            additionalText
        })

        const [focused, setFocused] = useState(false)

        const handleFocus = useCallback(
            (e) => {
                setFocused(true)
                if (onFocus) {
                    onFocus(e)
                }
            },
            [onFocus]
        )

        const handleClick = useCallback(() => {
            setFocused(true)
        })

        const handleBlur = useCallback(
            (e) => {
                setFocused(false)
                if (onBlur) {
                    onBlur(e)
                }
            },
            [onBlur]
        )

        return (
            <WrapperStyled
                size={size}
                focused={focused}
                disabled={disabled}
                readOnly={readOnly}
                error={error}
                className={className}
            >
                <TextFieldStyled
                    id={id}
                    {...passedProps}
                    aria-label={a11y?.label}
                    onFocus={handleFocus}
                    onClick={handleClick}
                    onBlur={handleBlur}
                />
            </WrapperStyled>
        )
    }


TextField.propTypes = {
    id: PropTypes.string,
    description: PropTypes.string,
    additionalText: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    label: PropTypes.string,
    icon: PropTypes.node,
    size: PropTypes.oneOf(['md', 'lg']),
    refWrapper: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    formName: PropTypes.string,
    a11y: PropTypes.shape({
        label: PropTypes.string
    }),
    additionalChild: PropTypes.node,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    verticalMargin: PropTypes.string,
    horizontalMargin: PropTypes.string
}

export const LabeledTextField = withLabel(TextField)
