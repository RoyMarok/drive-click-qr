import styled from '@emotion/styled/macro'
import { css } from '@emotion/react/macro'

import { Typography, baseX } from './common.config.style.js'
import { marginStyle } from './margin-wrapper.style'
import { IconLoaderViewBox, IconViewBox } from '../icon/icon-view'
import {
    lineHeightLg,
    lineHeightMd,
    lineHeightSm,
    lineHeightHeadline1,
    lineHeightHeadline2,
    lineHeightHeadline3,
    lineHeightHeadline4,
    lineHeightHeadline5,
    letterSpacingHeadline
} from './font-sizes.config.style'
import { focusBorder } from './dynamic-styles'

export const HEADERS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

const iconSizes = {
    sm: lineHeightSm,
    md: lineHeightMd,
    lg: lineHeightLg,
    h1: lineHeightHeadline1,
    h2: lineHeightHeadline2,
    h3: lineHeightHeadline3,
    h4: lineHeightHeadline4,
    h5: lineHeightHeadline5
}

const successTheme = (theme) => ({
    linkNormal: theme.linkSuccessNormal,
    linkHover: theme.linkSuccessHover,
    linkClick: theme.linkSuccessClick,
    linkDisabled: theme.linkDisabled
})

const infoTheme = (theme) => ({
    linkNormal: theme.linkInfoNormal,
    linkHover: theme.linkInfoHover,
    linkClick: theme.linkInfoClick,
    linkDisabled: theme.linkDisabled
})

const warningTheme = (theme) => ({
    linkNormal: theme.linkWarningNormal,
    linkHover: theme.linkWarningHover,
    linkClick: theme.linkWarningClick,
    linkDisabled: theme.linkDisabled
})

const primaryTheme = (theme) => ({
    linkNormal: theme.linkPrimaryNormal,
    linkHover: theme.linkPrimaryHover,
    linkClick: theme.linkPrimaryClick,
    linkDisabled: theme.linkDisabled
})

const themeByColorScheme = (theme, colorScheme) => {
    switch (colorScheme) {
        case 'success':
            return successTheme(theme)
        case 'info':
            return infoTheme(theme)
        case 'warning':
            return warningTheme(theme)
        default:
            return primaryTheme(theme)
    }
}

const dynamicTypographyHorizontalIndent = ({ iconReverse }) => {
    if (iconReverse) {
        return css`
            margin-left: ${baseX}px;
        `
    }
    return css`
        margin-right: ${baseX * 2}px;
    `
}

export const TypographyStyled = styled(Typography)(({ size }) => css`
    display: inline;
    border-bottom: 1px solid transparent;

    ${HEADERS.includes(size) && css`
        font-family: SBSansDisplay, Arial, Helvetica, sans-serif;
        letter-spacing: ${letterSpacingHeadline};

    `}
`)

export const IconStyled = styled(IconViewBox)(({ size, hasTitle, iconReverse }) => {
    const iconWidth = iconSizes[size]

    return css`
        box-sizing: content-box;
        vertical-align: top;
        flex: none;
        width: ${iconWidth};
        height: ${iconWidth};
        ${hasTitle && dynamicTypographyHorizontalIndent({ iconReverse })}
    `
})

export const IconLoaderStyled = IconStyled.withComponent(IconLoaderViewBox)

export const LinkStyled = styled.a(({ theme, colorScheme, underlined, disabled }) => {
    const linkTheme = themeByColorScheme(theme, colorScheme)
    return css`
        max-width: 100%;
        padding: 0;
        cursor: pointer;
        text-decoration: ${underlined ? 'underline' : 'none'};
        text-decoration-color: ${linkTheme.linkNormal};
        color: inherit;
        outline: none;
        display: inline-block;
        vertical-align: top;
        background-color: transparent;

        body:not(.pointer-events) &:focus {
          border-radius: ${baseX}px;
          ${focusBorder(theme.linkFocus)};
        }

        ${TypographyStyled} {
            color: ${linkTheme.linkNormal};
        }

        ${IconStyled} svg {
            fill: ${linkTheme.linkNormal};
        }

        ${IconLoaderStyled} svg {
            fill: ${linkTheme.linkNormal};
        }

        ${disabled && css`
            pointer-events: none;
            text-decoration-color: ${linkTheme.linkDisabled};

            ${TypographyStyled} {
                color: ${linkTheme.linkDisabled};
            }

            ${IconStyled} svg {
                fill: ${linkTheme.linkDisabled};
            }

            ${IconLoaderStyled} svg {
                fill: ${linkTheme.linkDisabled};
            }
        `}

        &:hover {
            text-decoration-color: ${linkTheme.linkHover};

            ${TypographyStyled} {
                color: ${linkTheme.linkHover};
            }

            ${IconStyled} svg {
                fill: ${linkTheme.linkHover};
            }

            ${IconLoaderStyled} svg {
                fill: ${linkTheme.linkHover};
            }
        }

        &:active {
            text-decoration-color: ${linkTheme.linkClick};

            ${TypographyStyled} {
                color: ${linkTheme.linkClick};
            }

            ${IconStyled} svg {
                fill: ${linkTheme.linkClick};
            }

            ${IconLoaderStyled} svg {
                fill: ${linkTheme.linkClick};
            }
        }
    `
}, marginStyle)

export const WrapperStyled = styled.span(({ iconReverse }) => css`
    display: flex;
    align-items: flex-start;
    flex-direction: row-reverse;

    ${iconReverse &&
    css`
        display: inline-block;
    `};
`)
