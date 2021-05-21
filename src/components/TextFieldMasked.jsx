import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'
import { IMaskMixin } from 'react-imask'

import { TextField } from './TextField'
import { withLabel } from './labeled'

export const TextFieldMasked = ({ onChange = noop, onBlur = noop, maskOptions, ...rest }) => {
    const [cachedValue, setCachedValue] = useState(rest.value || '')
    const handleAccept = useCallback((newValue, mask) => {
        const unmaskedValue = mask._unmaskedValue
        // В случае с масками может не всегда хватать только unmaskedValue
        // Например, календарь. Там удобнее сразу получать mask.masked.date - объект даты
        onChange(unmaskedValue, mask)
        setCachedValue(unmaskedValue)
    }, [onChange])

    const handleBlur = useCallback(() => onBlur(cachedValue), [cachedValue, onBlur])

    return (
        <MaskedStyledInput
            {...rest}
            onAccept={handleAccept}
            onBlur={handleBlur}
            {...maskOptions}
        />)
}

TextFieldMasked.propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Mask of TextField. For details see: react-imask package
     */
    maskOptions: PropTypes.shape({}),
}

const MaskedStyledInput = IMaskMixin(({ inputRef, ...props }) => (
    <TextField
        {...props}
        refWrapper={inputRef}
    />
))

export const LabeledTextFieldMasked = withLabel(TextFieldMasked)
