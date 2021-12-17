import styled from '@emotion/styled/macro'
import { css } from '@emotion/react/macro'
import { xxsShadow, commonShadow } from './shadows.config.style'
import { smBorderRadius } from './radius.config.style'
import { Typography } from './common.config.style'
import { ButtonClassic } from '../button'
import { withLabel } from '../labeled'
import { fontSizeMd, lineHeightMd } from './font-sizes.config.style'
import { MarginWrapper } from './margin-wrapper.style'
import { PaddingWrapper } from './padding-wrapper.style'
import { dynamicIndent } from './dynamic-styles'
import * as theme from './light.theme.style'

export const WrapperStyled = styled.div(() => css`
    /* display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: center; */
    /* a {
        text-decoration: none;
    } */
    padding: 48px 64px 44px;
    width: 680px;
`)

export const FlexWrapperStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: space-between;
`

export const RightButtonStyled = styled(withLabel(ButtonClassic))`
    width: 402px;
`

export const IconWrapperStyled = styled.div`
    display: inline-block;
    margin-top: -2px;
    margin-right: 8px;
    width: 24px;
    height: 24px;
    margin-right: 24px;
    text-align: center;
`

export const PanelStyled = styled.div`
    /* width: 608px; */
    /* padding: 32px; */
    display: flex;
    text-align: left;
    border-radius: ${smBorderRadius};
    box-shadow: ${xxsShadow(theme)}, ${commonShadow(theme)};
    position: relative;
    padding-left: ${dynamicIndent('h3', 'inner')};
    font-size: ${fontSizeMd};
    line-height: ${lineHeightMd};
    min-height: 156px;
`
    .withComponent(MarginWrapper)

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

export const QrStyled = styled.div(css`
    text-align: center;
    position: relative;
    width: 184px;
    height: 184px;
    padding: ${dynamicIndent('h3', 'inner')};
    svg {
        position: relative;
        width: 100%;
        height: 100%;
    }
`)

export const MarkupStyled = styled(MarginWrapper)`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: flex-start;
    align-items: center;
`

export const MarkupTextStyled = styled(MarginWrapper)`
    width: 500px;
`

export const Container = styled.div `
    & > :first-child {
        margin-top: 0;
        padding-top: 0;
    }

    & > :last-child {
        margin-bottom: 0;
        padding-bottom: 0;
    }
`
    .withComponent(PaddingWrapper)
    .withComponent(MarginWrapper)


export const ContentStyled = styled(Container)`
    width: 344px;
    flex-shrink: 0;
`
