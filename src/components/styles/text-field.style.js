import styled from '@emotion/styled/macro'
import { css } from '@emotion/react/macro'

import { xsBorderRadius } from './radius.config.style'
import { dynamicHeight, dynamicSize, focusBorder } from './dynamic-styles'
import { paddingStyle } from './padding-wrapper.style'
import * as lightTheme from './light.theme.style'

const BORDER_WIDTH = 1
const dynamicHeightBorderCoefficient = 2

export const textFieldBorderStyle = (color) => css`
    box-shadow: inset 0px 0px 0px 1px ${color};
`

export const errorStyle = ({ error,  focused }) => error && css`
    ${textFieldBorderStyle(lightTheme.textFieldErrorNormal)};

    &:hover {
        ${textFieldBorderStyle(lightTheme.textFieldErrorHover)};
    }

    ${focused && css`
        ${focusBorder(lightTheme.textFieldFocusBorder)};

        &:hover {
            ${focusBorder(lightTheme.textFieldFocusBorder)};
        }
    `}
`

export const TextFieldStyled = styled.input(({ theme = lightTheme }) => css`
    -webkit-tap-highlight-color: transparent;
    border-radius: ${xsBorderRadius};
    width: 100%;
    outline: none;
    display: block;
    color: ${lightTheme.textFieldText};

    background-color: transparent;

    /* Отменяем поведение кастомных типов для Mozilla */
    appearance: textfield;
    -webkit-appearance: none;

    &::placeholder {
        color: ${lightTheme.textFieldPlaceholder};
    }

    &::-ms-clear {
        display: none;
    }

    /* Отменяем поведение кастомных типов для Chrome */
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button,
    &::-webkit-clear-button,
    &::-webkit-inner-spin-button,
    &::-webkit-calendar-picker-indicator {
        display: none;
    }
`,
dynamicSize,
({ size }) => css`height: ${dynamicHeight({ size, verticalMargin: 'inner' }) + (BORDER_WIDTH * dynamicHeightBorderCoefficient)}px`
)

export const WrapperStyled = styled.span(({ focused,  size }) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${textFieldBorderStyle(lightTheme.textFieldNormalBorder)};
    background-color: ${lightTheme.textFieldBody};
    border-radius: ${xsBorderRadius};
    transition: 0.17s ease box-shadow;

    height: ${dynamicHeight({ size }) + (BORDER_WIDTH * dynamicHeightBorderCoefficient)}px;

    ${!focused && css`
        &:hover {
            ${textFieldBorderStyle(lightTheme.textFieldHoverBorder)};
        }
        
        &:active {
            ${textFieldBorderStyle(lightTheme.textFieldClickBorder)};
        }
    `};
    
    ${focused && css`
        transition: 0.17s ease;
        ${focusBorder(lightTheme.textFieldFocusBorder)};
    `}
`,
errorStyle,
({ size }) => paddingStyle({ size, horizontalPadding: 'inner' })
)
