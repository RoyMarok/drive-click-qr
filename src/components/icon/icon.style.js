import styled from '@emotion/styled/macro'
import { css } from '@emotion/react/macro'

import { dynamicSvgColor } from '../styles/dynamic-styles'
import * as theme from '../styles/light.theme.style'

const fullWidthCss = css`
  height: 100%;
  width: 100%;
`

export const WrapperStyled = styled.span(({ colorScheme, fullWidth }) => css`
    display: inline-block;
    text-decoration: none;
    vertical-align: middle;

    svg {
        display: block;
        ${dynamicSvgColor(theme.primary)({ colorScheme, theme })};
        ${fullWidth && fullWidthCss};
    }
`)
