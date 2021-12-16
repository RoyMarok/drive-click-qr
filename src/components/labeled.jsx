import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { MarginWrapper } from './styles/margin-wrapper.style'
import { getDisplayName } from './utils'

import {
    HeadlineStyled,
    ErrorStyled,
    LabelStyled,
    DescriptionStyled
} from './styles/common.config.style'

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
                            size={mapTypographySize['sm']}
                            verticalMargin="micro"
                            colorScheme="primary"
                            aria-label={label}
                        >
                            {label}
                        </LabelStyled>
                    </label>
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
                size={mapTypographySize['sm']}
                colorScheme="secondary"
                verticalMargin="micro"
                content={description}
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

export const withLabel = (WrappedComponent) => {
    const LabeledComponent = ({ className, ...props }) => (
        <Labeled {...props} className={className}>
            <WrappedComponent {...props} />
        </Labeled>
    )

    LabeledComponent.displayName = `Labeled${getDisplayName(WrappedComponent)}`
    return LabeledComponent
}
