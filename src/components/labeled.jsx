import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { MarginWrapper } from './styles/margin-wrapper.style'

import { Info } from './info'
import {
    HeadlineStyled,
    DescriptionStyled,
    ErrorStyled,
    LabelStyled
} from './labeled.style'

const mapTypographySize = {
    lg: 'md',
    md: 'sm',
    sm: 'sm'
}

export const Labeled = ({
    className,
    verticalMargin = 'inner',
    verticalMarginDirection,
    horizontalMargin,
    horizontalMarginDirection,
    size = 'md',
    label,
    children,
    error,
    description,
    tooltip
}) => (
    <MarginWrapper
        className={className}
        verticalMargin={verticalMargin}
        verticalMarginDirection={verticalMarginDirection}
        horizontalMargin={horizontalMargin}
        horizontalMarginDirection={horizontalMarginDirection}
        size={size}
    >
        {label ? (
            <Fragment>
                <HeadlineStyled size={mapTypographySize[size]}>
                    <label>
                        <LabelStyled
                            size={mapTypographySize[size]}
                            verticalMargin="micro"
                            colorScheme="primary"
                            aria-label={label}
                        >
                            {label}
                        </LabelStyled>
                    </label>
                    {tooltip && <Info size={size} {...tooltip} />}
                </HeadlineStyled>
                {children}
            </Fragment>
        ) :
            children
        }

        {error && <ErrorStyled
            size={mapTypographySize[size]}
            colorScheme="warning"
            verticalMargin="micro"
            error={error}
        >
            {error}
        </ErrorStyled>}
        {description && (
            <DescriptionStyled
                size={mapTypographySize[size]}
                colorScheme="secondary"
                verticalMargin="micro"
            >
                {description}
            </DescriptionStyled>
        )}
    </MarginWrapper>
)

Labeled.propTypes = {
    className: PropTypes.string,
    verticalMargin: PropTypes.string,
    verticalMarginDirection: PropTypes.string,
    horizontalMargin: PropTypes.string,
    horizontalMarginDirection: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
    error: PropTypes.string,
    description: PropTypes.string,
    tooltip: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string
    })
}
