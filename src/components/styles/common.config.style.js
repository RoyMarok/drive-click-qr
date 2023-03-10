import styled from '@emotion/styled/macro'
import { css } from '@emotion/react/macro'
import { letterSpacing, fontSizeMd, lineHeightMd } from './font-sizes.config.style'
import * as theme from './light.theme.style'
import { dynamicIndent } from './dynamic-styles'

export const xsShadow = '0px 3px 6px'
export const baseX = 4

const fontWeightStyle = ({
    fontWeight
}) => {
    switch (fontWeight) {
        case 'semibold':
            return css `font-weight: 600;`
        case 'medium':
            return css `font-weight: 500;`
        default:
            return css `font-weight: 400;`
    }
}

export const typographyCommonStyled = () => css `
    letter-spacing: ${letterSpacing};
    text-align: left;
`

export const TypographyStyled = styled.p(
    typographyCommonStyled,
    fontWeightStyle,
    css `
       font-size: ${fontSizeMd};
       line-height: ${lineHeightMd};
    `,
    css`color: ${theme.primary}`
)

export const Typography = TypographyStyled

export const LabelStyled = styled(TypographyStyled)
`
    display: inline-block;
    vertical-align: bottom;
    transition: color .3s ease-in-out;
    margin: 0;
`

export const ErrorStyled = styled(TypographyStyled)
`
    display: ${({ error }) => error ? 'block' : 'none'};
    color: ${theme.warningPrimary}
`

export const HeadlineStyled = styled.div `
    margin-bottom: ${({ size }) => dynamicIndent(size, 'nano')};

`

export const CurrencyStyled = styled(TypographyStyled)(({
    isSymbol
}) => isSymbol && css `
    display: inline-block;
    color: inherit;
`).withComponent('span')