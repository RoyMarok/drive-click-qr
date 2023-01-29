import React from 'react'
import PropTypes from 'prop-types'

import {
    LinkStyled,
    TypographyStyled,
    WrapperStyled,
    HEADERS
} from './styles/link.style'

export const Link = ({
    title,
    iconName,
    icon,
    colorScheme,
    size = 'md',
    iconReverse,
    fontWeight,
    horizontalMargin = 'inner',
    verticalMargin = 'zero',
    ariaLabel = 'Link',
    as = 'a',
    underlined = true,
    disabled,
    onClick,
    children,
    ...rest
}) => (
    <LinkStyled
        as={as}
        underlined={underlined && !(icon || iconName)}
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={onClick}
        colorScheme={colorScheme}
        aria-label={title || ariaLabel}
        horizontalMargin={horizontalMargin}
        verticalMargin={verticalMargin}
        size={size}
        {...rest}
    >
        <WrapperStyled
            iconReverse={iconReverse}
        >
            {children}
            {title && <TypographyStyled
                as={HEADERS.includes(size) ? size : 'span'}
                verticalMargin="zero"
                size={size}
                fontWeight={fontWeight}
            >
                {title}
            </TypographyStyled>}

            {icon}
        </WrapperStyled>
    </LinkStyled>)

Link.propTypes = {
    /**
     * Текстовое содержимое ссылки
     */
    title: PropTypes.string,
    /**
     * Наименование иконки из сформированного namespace с помощью IconLoader.addIcons
     * или готового iconPacka предоставляемого дизайн-системой
     */
    iconName: PropTypes.string,
    /**
     * svg файл
     */
    icon: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'h1', 'h2', 'h3', 'h4', 'h5']),
    fontWeight: PropTypes.oneOf(['regular', 'medium', 'semibold']),
    colorScheme: PropTypes.oneOf(['success', 'warning', 'info', 'primary']),
    verticalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    horizontalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    refWrapper: PropTypes.func,
    /**
     * Может быть Link из react-router(-dom)
     */
    as: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    iconReverse: PropTypes.bool,
    disabled: PropTypes.bool,
    underlined: PropTypes.bool,
    ariaLabel: PropTypes.string,
    onClick: PropTypes.func,
}
