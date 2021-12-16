import { baseX } from './common.config.style'

export const xsBorderRadius = `${baseX}px`
export const smBorderRadius = `${baseX * 2}px`
export const mdBorderRadius = `${baseX * 3}px`
export const lgBorderRadius = `${baseX * 4}px`

export const getBorderRadius = (size) => {
    switch (size) {
        case 'lg':
            return lgBorderRadius
        case 'sm':
            return smBorderRadius
        
        case 'md':
            return mdBorderRadius
        case 'xs':
        default:
            return xsBorderRadius
    }
}
