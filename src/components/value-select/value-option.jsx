import React from 'react'
import PropTypes from 'prop-types'

import {
    ItemColumnStyled,
    ItemTitleStyled,
    ItemAsideStyled,
    ItemDescriptionStyled,
    ItemAsideDescriptionStyled,
    IconLoaderStyled
} from './value-select.style'

export const mapTypographySize = {
    lg: 'md',
    md: 'sm'
}

export const ValueOption = ({
    icon = '',
    title = '',
    description = '',
    additional = '',
    additionalDescription = '',
    size = 'md',
    ...props
}) => (
    <>
        {icon && <IconLoaderStyled name={icon} size={size} />}

        <ItemColumnStyled>
            <ItemTitleStyled size={size} fontWeight="medium" {...props}>
                {title}
            </ItemTitleStyled>

            {description && (
                <ItemDescriptionStyled size={mapTypographySize[size]}>
                    {description}
                </ItemDescriptionStyled>
            )}
        </ItemColumnStyled>

        {(additional || additionalDescription) && (
            <ItemColumnStyled>
                {additional && (
                    <ItemAsideStyled size={size} fontWeight="medium">
                        {additional}
                    </ItemAsideStyled>
                )}

                {additionalDescription && (
                    <ItemAsideDescriptionStyled size={mapTypographySize[size]}>
                        {additionalDescription}
                    </ItemAsideDescriptionStyled>
                )}
            </ItemColumnStyled>
        )}
    </>
)

ValueOption.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    additional: PropTypes.string,
    additionalDescription: PropTypes.string,
    size: PropTypes.string
}
