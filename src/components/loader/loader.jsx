import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { LoaderStyled, LoaderPointStyled } from './loader.style'
import { PulseLoaderThemeStyle } from './loader-themes/pulse-loader.style'
import { JumpLoaderThemeStyle } from './loader-themes/jump-loader.style'
import { SwapLoaderThemeStyle } from './loader-themes/swap-loader.style'

const THEMES = [
    PulseLoaderThemeStyle,
    JumpLoaderThemeStyle,
    SwapLoaderThemeStyle
]

const DEFAULT_DELAY = 300
const DEFAULT_CHANGE_INTERVAL = 25600

/**
 * Лоадер для страницы
 *
 * @param {Object} props - свойства компонента
 * @return {JSX} - компонент
 */
export const Loader = ({ size = 'md', colorScheme, className }) => {
    const [showed, setShowed] = useState(false)
    const [animationThemeIndex, setIndex] = useState(0)

    useEffect(() => {
        const timeoutId = setTimeout(() => setShowed(true), DEFAULT_DELAY)

        return () => clearTimeout(timeoutId)
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentThemeIndex = (animationThemeIndex + 1) % THEMES.length

            setIndex(currentThemeIndex)
        }, DEFAULT_CHANGE_INTERVAL)

        return () => clearInterval(intervalId)
    }, [showed, animationThemeIndex])

    if (!showed) {
        return null
    }

    return (
        <LoaderStyled
            className={className}
            size={size}
            animationTheme={THEMES[animationThemeIndex]}
            colorScheme={colorScheme}
        >
            <LoaderPointStyled />
            <LoaderPointStyled />
            <LoaderPointStyled />
        </LoaderStyled>
    )
}

Loader.propTypes = {
    /**
     * Размер отображаемого лоадера
     */
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    /**
     * Светлый или темный цвет лоадера
     */
    colorScheme: PropTypes.string,
    className: PropTypes.string
}

export default Loader
