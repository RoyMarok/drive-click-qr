import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'

import { TextFieldMasked } from './TextFieldMasked'
import { Currency } from './Currency'
import { withLabel } from './labeled'
import { makeMoneyMask } from './utils'

export const TextFieldMoney = ({
    currency: { title, mode = 'symbol', value },
    maskOptions = {},
    ...props
}) => {
    const mask = useMemo(() => makeMoneyMask(maskOptions), [maskOptions])

    const getCurrencyMask = useCallback(() => ({
        mask: [
            { mask: Number },
            {
                mask: `num ${Currency.getCurrencyValue(title, mode, value)}`,
                lazy: false,
                blocks: {
                    num: mask,
                }
            },
        ],
        dispatch (appended, dynamicMasked) {
            if ((dynamicMasked.value + appended).replace(/\D/g, '')) {
                return dynamicMasked.compiledMasks[1]
            }
            return dynamicMasked.compiledMasks[0]
        }
    }), [title, mode, value, maskOptions])

    return (
        <TextFieldMasked
            {...props}
            maskOptions={getCurrencyMask(title, mode, value, maskOptions)}
        />
    )
}

TextFieldMoney.propTypes = {
    currency: PropTypes.shape({
        value: PropTypes.string,
        title: PropTypes.string,
        mode: PropTypes.oneOf(['auto', 'symbol', 'word', 'code']),
    }),
    /**
     * Mask of TextField. For details see: react-imask package
     */
    maskOptions: PropTypes.shape({
        // digits after point, 0 for integers
        scale: PropTypes.string,
        // disallow negative
        signed: PropTypes.bool,
        // any single char
        thousandsSeparator: PropTypes.string,
        // if true, then pads zeros at end to the length of scale
        padFractionalZeros: PropTypes.bool,
        // appends or removes zeros at ends
        normalizeZeros: PropTypes.bool,
        // fractional delimiter
        radix: PropTypes.string,
        // symbols to process as radix
        mapToRadix: PropTypes.arrayOf(PropTypes.string),
        // additional number interval options (e.g.)
        min: PropTypes.number,
        max: PropTypes.number
    })
}

export const LabeledTextFieldMoney = withLabel(TextFieldMoney)
