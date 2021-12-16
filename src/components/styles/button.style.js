import styled from '@emotion/styled/macro'
import { css } from '@emotion/react/macro'

import { getBorderRadius } from './radius.config.style'
import { Typography } from './common.config.style.js'
import { IconLoaderViewBox, IconViewBox } from '../icon/icon-view'
import { ContainedLoader } from '../loader'
import { paddingStyle } from './padding-wrapper.style'
import { marginStyle } from './margin-wrapper.style'
import { dynamicIndent, focusBorder } from './dynamic-styles'
import * as theme from './light.theme.style'

const iconSizes = {
    sm: '24px',
    md: '28px',
    lg: '32px'
}

export const ButtonLoadingStyled = styled(ContainedLoader)`
    display: none;
`

const dynamicTypographyHorizontalIndent = ({ size = 'md', icon, iconReverse }) => {
    const margin = dynamicIndent(size, 'micro')

    if (icon) {
        if (iconReverse) {
            return css`
                margin-left: ${margin};
            `
        }
        return css`
            margin-right: ${margin};
        `
    }
    return ''
}

export const ButtonTypographyStyled = styled(Typography)`
    display: inline-block;
`

export const IconStyled = styled(IconViewBox)(({ size = 'md' }) => {
    const iconWidth = iconSizes[size]
    return css`
        width: ${iconWidth};
        height: ${iconWidth};
    `
})

export const IconLoaderStyled = IconStyled.withComponent(IconLoaderViewBox)

const iconReverseStyle = ({ iconReverse }) => iconReverse && css`
    flex-direction: row-reverse;
`

export const ButtonContainerStyled = styled.div`
    display: inline-flex;
    align-items: center;
    flex-direction: row;

    ${iconReverseStyle}
`

const fullWidthStyle = ({ fullWidth }) => fullWidth && css`
    width: 100%;
    text-align: center;
    display: block;
`

export const ButtonBaseStyled = styled.button(({ size, icon, iconReverse, isLoading }) => css`
    position: relative;
    cursor: pointer;
    border-radius: ${getBorderRadius(size)};
    text-decoration: none;
    transition:
          border-color 0.17s,
          background-color 0.17s,
          color 0.17s,
          box-shadow 0.17s;
    outline: none;
    overflow: hidden;
    user-select: none;
    line-height: 1;
    -kit-tap-highlight-color: transparent;
    display: inline-block;

    ${ButtonTypographyStyled} {
        ${dynamicTypographyHorizontalIndent({ size, icon, iconReverse })};
    }

   ${isLoading && css`
        cursor: default;

       ${ButtonLoadingStyled} {
            display: block;
       }

       ${ButtonContainerStyled} {
            opacity: 0;
       }
   `}
`,
fullWidthStyle,
({ size, icon }) => paddingStyle({ verticalPadding: icon ? 'micro' : 'inner', horizontalPadding: 'inner', size }),
({ size, verticalMargin = 'inner', horizontalMargin = 'inner', fullWidth, verticalMarginDirection, horizontalMarginDirirection }) =>
    marginStyle({
        verticalMargin,
        verticalMarginDirection,
        horizontalMargin: fullWidth ? 'zero' : horizontalMargin,
        horizontalMarginDirirection,
        size
    }),
)

export const GreenButton = styled(ButtonBaseStyled)`
    background-color: ${theme.buttonPrimaryNormal};
        

    &:hover {
        ${ButtonContainerStyled}:after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: ${theme.buttonPrimaryHover};
            z-index: 1;
        }
    }

    &:active {
        background-color: ${theme.buttonPrimaryNormal};
        ${ButtonContainerStyled}:after {
            background-color: ${theme?.buttonPrimaryClick};
        }
        outline: none;
    }

    ${ButtonTypographyStyled} {
        color: ${theme.buttonPrimaryTextNormal};
        z-index: 2;
        
    }

    ${IconStyled} svg,
    ${IconLoaderStyled} svg {
    z-index: 2;
    fill: ${theme.buttonPrimaryTextNormal};
    };
`

export const GrayButton = styled(ButtonBaseStyled)`
    background-color: ${theme.buttonSecondaryNormal};
    

    &:hover {
        ${ButtonContainerStyled}:after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: ${theme.buttonSecondaryHover};
            z-index: 1;
        }
    }

    &:active {
        background-color: ${theme.buttonSecondaryNormal};
        ${ButtonContainerStyled}:after {
            background-color: ${theme?.buttonSecondaryClick};
        }
        outline: none;
    }

    ${ButtonTypographyStyled} {
        color: ${theme.buttonSecondaryTextNormal};
        z-index: 2;
        
    }

    ${IconStyled} svg,
    ${IconLoaderStyled} svg {
    z-index: 2;
    fill: ${theme.buttonSecondaryTextNormal};
    };
`

export const InfoButton = styled(ButtonBaseStyled)`
    background-color: ${theme.infoPrimary};

    &:hover {
        ${ButtonContainerStyled}:after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: ${theme.buttonSecondaryHover};
            z-index: 1;
        }
    }

    &:active {
        background-color: ${theme.infoTransparent24};
        ${ButtonContainerStyled}:after {
            background-color: ${theme.infoTransparent60};
        }
        outline: none;
    }

    ${ButtonTypographyStyled} {
        color: ${theme.buttonPrimaryTextNormal};
        z-index: 2;
        
    }

    ${IconStyled} svg,
    ${IconLoaderStyled} svg {
    z-index: 2;
    fill: ${theme.buttonPrimaryTextNormal};
    };
`

export const ButtonTransparentStyled = styled(ButtonBaseStyled)(({ loading, theme }) => css`
    background-color: ${theme.buttonTextBodyNormal};

    body:not(.pointer-events) &:focus {
        ${focusBorder(theme.buttonTextFocus)};
    }

    &:hover {
        background-color: ${theme.buttonTextHover};
        outline: none;
    }

    &:active {
        outline: none;
        background-color: ${theme.buttonTextClick};
    }

    ${ButtonTypographyStyled} {
        color: ${theme.buttonTextNormal};

        ${loading && css`
            color: ${theme.buttonTextBodyNormal};
        `};
    }

    ${IconStyled} svg,
    ${IconLoaderStyled} svg {
      fill: ${theme.buttonTextNormal};
    }
`)
