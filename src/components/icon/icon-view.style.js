import styled from '@emotion/styled/macro'
import { css } from '@emotion/react/macro'

import { Icon } from './icon'
import { IconLoader } from './icon-loader'

export const IconViewBoxStyled = styled(Icon)`
    ${({ width = 20, height = 20 }) => css`
        display: inline-block;
        position: relative;
        width: ${width}px;
        height: ${height}px;
        overflow: hidden;
        flex-shrink: 0;

        svg {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    `}
`

export const IconLoaderViewBoxStyled = styled(IconLoader)`
    ${({ width = 32, height = 32 }) => css`
        display: inline-block;
        position: relative;
        width: ${width}px;
        height: ${height}px;
        overflow: hidden;
        flex-shrink: 0;

        svg {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    `}
`
