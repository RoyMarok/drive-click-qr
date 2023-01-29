import styled from '@emotion/styled/macro'
import { css } from '@emotion/react/macro'

import { xsBorderRadius } from '../styles/radius.config.style'
import { textFieldBorderStyle } from '../styles/text-field.style'
import { sizes, dynamicIndent, focusBorder } from '../styles/dynamic-styles'
import { paddingStyle } from '../styles/padding-wrapper.style'
import { marginStyle } from '../styles/margin-wrapper.style'
import { zIndexDropdown } from '../styles/z-index.config.style'
import { mdShadow } from '../styles/shadows.config.style'
import { IconLoader } from '../icon/icon-loader'
import { IconViewBox } from '../icon/icon-view'
import { Typography } from '../styles/common.config.style'
import * as theme from '../styles/light.theme.style'

export const ITEMS_IN_LIST = 5
const ARROW_PADDING = '26px'
const BORDERS_WIDTH = '2px'

const verticalIndent = (size = 'md') => dynamicIndent(size, 'inner')
export const dynamicHeight = (size = 'md') => {
    const lineHeight = parseInt(sizes[size].lineHeight, 10)
    const indent = parseInt(dynamicIndent(size, 'inner'), 10)

    return `${indent + lineHeight + indent}px`
}

export const WrapperStyled = styled.div`
    position: relative;
`

export const IconLoaderStyled = styled(IconLoader)`
    ${({ size }) => marginStyle({ size, horizontalMargin: 'nano' })}
`

export const ArrowStyled = styled.div`
    position: absolute;
    right: 9px;
    top: 50%;
    transform: translate(0, -50%);
    transition: transform 0.3s ease-in-out;

    ${({ open }) => open && css`
        transform: translate(0, -50%) rotate(180deg);
    `}
`

export const ItemNotChosenStyled = styled(Typography)(() => css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${theme.valueSelectPlaceholder};
`)

export const ItemColumnStyled = styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: column;

    & + & {
        margin-left: auto;
        flex-shrink: 0;
    }
`

export const ItemTitleStyled = styled(Typography)(() => css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${theme.valueSelectText};
`)

export const ItemAsideStyled = styled(Typography)(({ theme, size }) => css`
    color: ${theme.valueSelectText};
    text-align: right;
    margin-left: ${verticalIndent(size)}
`)

export const ItemDescriptionStyled = styled(Typography)(() => css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${theme.valueSelectDescriptionText};
`)

export const ItemAsideDescriptionStyled = styled(Typography)(() => css`
    color: ${theme.valueSelectDescriptionText};
    text-align: right;
`)


export const ItemStyled = styled.button(({ size, focused, checked, isOption }) => css`
    display: flex;
    align-items: center;
    margin: 0;
    
    width: 100%;
    outline: none;
    color: ${theme.valueSelectText};
    background-color: ${theme.valueSelectNoColor};
    transition: 0.17s ease-in-out background-color;
    position: relative;
    z-index: 900;
    ${paddingStyle({
        size,
        horizontalPadding: 'inner',
        verticalPadding: 'zero'
    })};
    cursor: ${isOption ? 'pointer' : 'default'};

    &:not(:first-of-type) {
        border-top: ${isOption ? `1px solid ${theme.valueSelectItemBorder}` : 'none'};
    }

    /* min-height breaks align-items: center and align-self: center in IE11. Fixed here.  */
    &::after {
        content: '';
        min-height: inherit;
        font-size: 0;
    }

    &:hover {
        background-color: ${isOption ? theme.valueSelectHover : theme.valueSelectNoColor};
    }

    ${focused && css`
        body:not(.pointer-events) & {
            ${focusBorder(theme.valueSelectFocusBorder)};
        }
    `};

    ${checked && css`background-color: ${theme.valueSelectItemSelectedBody};`}

    ${ItemColumnStyled} {
        position: relative;
        z-index: 1;
    }
`)

export const GroupTitleStyled = styled(ItemTitleStyled)(() => css`
    color: ${theme.valueSelectGroupText};
`)

export const MultiSelectedListStyled = styled.ul`
    margin: 0;
    margin-top: ${dynamicIndent('md', 'nano')};
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
`

export const MultiSelectedItemStyled = styled.li(({ size }) => css`
    background-color: ${theme.valueSelectDisabledBody};
    ${textFieldBorderStyle(theme.valueSelectDisabledBorder)};
    border-radius: ${xsBorderRadius};
    ${paddingStyle({ size, verticalPadding: 'nano', horizontalPadding: 'nano' })};
    ${marginStyle({ size, horizontalMargin: 'nano' })};
    margin-bottom: ${dynamicIndent('md', 'nano')};
`)

export const MultiSelectedTitleStyled = styled(Typography)(() => css`
    color: ${theme.valueSelectText};
    vertical-align: middle;
`)

export const MultiSelectedButtonStyled = styled.div(({ size }) => css`
        display: inline-block;
        padding: 0;
        margin-left: ${dynamicIndent(size, 'nano')};
        cursor: pointer;
        background-color: ${theme.transparent};
        border-radius: ${xsBorderRadius};
        outline: none;

        body:not(.pointer-events) &:focus {
            ${focusBorder(theme.primary)};
        }
`)

export const MultiSelectedIconStyled = styled(IconViewBox)(() => css`

    svg path {
        fill: ${theme.valueSelectMultiIcon};
    }

    &:hover {
        svg path {
            fill: ${theme.valueSelectMultiIconHover};
      }
    }

    &:active {
        svg path {
            fill: ${theme.valueSelectMultiIconActive};
        }
    }
`)

export const TargetStyled = styled.button(({ size }) => css`
    -webkit-tap-highlight-color: transparent;
    white-space: nowrap;
    outline: none;
    background-color: ${theme.valueSelectBody};
    border-radius: ${xsBorderRadius};
    ${textFieldBorderStyle(theme.valueSelectNormalBorder)};
    width: 100%;
    text-align: left;
    display: flex;
    position: relative;
    padding: 0;
    padding-left: ${verticalIndent(size)};
    padding-right: calc(${ARROW_PADDING} + ${verticalIndent(size)});
    transition: 0.17s ease box-shadow;
    align-items: center;
    cursor: pointer;

    min-height: calc(${dynamicHeight(size)} + ${BORDERS_WIDTH});

    /* min-height breaks align-items: center and align-self: center in IE11. Fixed here.  */
    &::after {
        content: '';
        min-height: ${dynamicHeight(size)};
        font-size: 0;
    }

    &:hover {
        ${textFieldBorderStyle(theme.valueSelectHoverBorder)};
    }

    &:active {
        ${textFieldBorderStyle(theme.valueSelectActiveBorder)};
    }

    body:not(.pointer-events) &:focus {
        transition: 0.17s ease;
        ${focusBorder(theme.valueSelectFocusBorder)}
    }
`,
({ open }) => open && css`
    ${textFieldBorderStyle(theme.valueSelectActiveBorder)};

    &:hover {
        ${textFieldBorderStyle(theme.valueSelectActiveBorder)};
    }
`,
({ disabled, size }) => disabled && css`
    padding-right: ${verticalIndent(size)};
    background-color: ${theme.valueSelectDisabledBody};
    ${textFieldBorderStyle(theme.valueSelectDisabledBorder)};
    color: ${theme.valueSelectDisabledText};
    cursor: default;

    &:hover,
    &:active {
        ${textFieldBorderStyle(theme.valueSelectDisabledBorder)};
    }

    ${ItemStyled} {
        cursor: default;
    }

    ${ItemTitleStyled} {
        color: ${theme.valueSelectDisabledText};
    }

    ${ItemAsideStyled} {
        color: ${theme.valueSelectDisabledText};
    }

    ${ItemDescriptionStyled} {
        color: ${theme.valueSelectDisabledText};
    }

    ${ArrowStyled} {
        display: none;
    }

    ${MultiSelectedIconStyled} {
        display: none;
    }
`,
({ readOnly }) => readOnly && css`
    box-shadow: none;
    border: 1px dashed ${theme.valueSelectNormalBorder};
    background-color: ${theme.valueSelectBody};

    &:hover,
    &:active {
        border: 1px dashed ${theme.valueSelectNormalBorder};
    }

    ${ItemStyled} {
        cursor: default;
    }

    ${ItemTitleStyled} {
        color: ${theme.valueSelectText};
    }

    ${ItemAsideStyled} {
        color: ${theme.valueSelectText};
    }

    ${ItemDescriptionStyled} {
        color: ${theme.valueSelectDescriptionText};
    }

    ${ArrowStyled} {
        display: none;
    }
`,
({ error }) => error && css`
    ${textFieldBorderStyle(theme.valueSelectErrorBorder)};

    &:hover,
    &:active {
        ${textFieldBorderStyle(theme.valueSelectErrorBorder)};
    }
`)

export const ContentsStyled = styled.div(() => css`
    position: absolute;
    z-index: ${zIndexDropdown};
    width: 100%;
    box-shadow: ${mdShadow(theme)};
    border-radius: ${xsBorderRadius};
    margin-top: 8px;

    ::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 4px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: ${xsBorderRadius};
        width: 4px;
    }
`)

export const ContentsViewStyled = styled.div(() => css`
    outline: none;
    overflow-y: auto;
    background-color: ${theme.valueSelectContentBody};
    border-radius: ${xsBorderRadius};
    ${textFieldBorderStyle(theme.valueSelectContentBorder)};
`)
