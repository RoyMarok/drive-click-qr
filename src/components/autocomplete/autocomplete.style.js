import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { Typography } from '../styles/common.config.style'
import { dynamicHeight } from '../styles/dynamic-styles'
import { paddingStyle } from '../styles/padding-wrapper.style'

export const WrapperStyled = styled.div`
    position: relative;
`

export const TargetStyled = styled.div``

export const NoMatchesStyled = styled(Typography)(({ theme, size }) => css`
    display: flex;
    align-items: center;
    margin: 0;
    ${paddingStyle({
        size,
        horizontalPadding: 'inner',
        verticalPadding: 'zero'
    })}
    width: 100%;
    outline: none;
    color: ${theme.autocompletePlaceholder};
    background-color: ${theme.autocompleteNoColor};
    min-height: ${dynamicHeight({ size })}px;
`)

export const LoaderWrapperStyled = styled.div`
    position: relative;
    width: 100%;
    min-height: ${dynamicHeight}px;
`
