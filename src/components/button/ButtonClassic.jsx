import React from 'react'
import PropTypes from 'prop-types'
import { extend, noop } from 'lodash'

import {
    ButtonTransparentStyled,
    GreenButton,
    GrayButton,
    InfoButton,
    ButtonTypographyStyled,
    ButtonContainerStyled
} from '../styles/button.style'

export const ButtonClassic = ({ title, size = 'sm', fontWeight = 'bold', onClick = noop, mode='primary', ...rest }) => {
    const passedProps = extend(rest, {
        onClick,
        'aria-live': 'polite',
        size,
    })
    let ButtonWrapper = GreenButton
    if (mode === 'secondary'){
        ButtonWrapper = GrayButton
    }
    if (mode === 'info'){
        ButtonWrapper = InfoButton
    }
    if (mode === 'transparent'){
        ButtonWrapper = ButtonTransparentStyled
    }
    return (
    <ButtonWrapper {...passedProps}>
        <ButtonContainerStyled>
            {title && (
                <ButtonTypographyStyled size={size} fontWeight={fontWeight}>
                    {title}
                </ButtonTypographyStyled>
            )}
        </ButtonContainerStyled>
    </ButtonWrapper>
)}