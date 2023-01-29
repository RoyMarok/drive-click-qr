import styled from '@emotion/styled/macro'
import { css } from '@emotion/react/macro'
import { lgShadow } from './shadows.config.style'
import { lgBorderRadius } from './radius.config.style'
import { Typography } from './common.config.style'
import { mediaLg, mediaMd, mediaSm } from './media.config.style'
import * as theme from './light.theme.style'

export const WrapperStyled = styled.div(() => css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: center;
    a {
        text-decoration: none;
    }
    
`)

export const IconWrapperStyled = styled.div`
    display: inline-block;
    margin-top: -2px;
    margin-right: 8px;
`

export const PanelStyled = styled.div(() => css`
    width: 608px;
    padding: 32px;
    margin: 0;
    text-align: left;
    border-radius: ${lgBorderRadius};
    box-shadow: ${lgShadow(theme)};
    position: relative;

    ${mediaMd} {
        margin: 0;
        width: 100%;
        padding: 16 px;
        box-shadow: none;
    }

    ${mediaSm} {
        margin: 0;
        width: 100%;
        padding: 16px;
        box-shadow: none;
    }
`)

export const NonPrintablePanelStyled = styled(PanelStyled)`
    @media print {
        display: none;
    }
`

export const NonPrintableText = styled(Typography)`
    @media print {
        display: none;
    }
`

export const PrintablePanelStyled = styled(PanelStyled)`
    @media print {
        margin: 64px auto;
        padding: 0;
        box-shadow: none;
    }
`

export const QrStyled = styled.div(css `
    text-align: center;
    width: 100%;
    position: relative;
    svg {
        width: 100%;
        height: 100%;
    }
`)
