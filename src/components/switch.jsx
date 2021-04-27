import React, { useCallback } from 'react'
import { omit, extend } from 'lodash'

import { CheckboxWrapperStyled, InputStyled, SwitchStyled, CheckboxTypographyStyled} from './styles/switch.style.js'

export const Switch = ({
    onChange = () => { },
    ...props
}) => {
    const handleChange = useCallback((event) => {
        onChange(event?.currentTarget?.checked, event)
    }, [])
    const inputProps = extend(
        omit(props, ['children', 'formName', 'mode']),
        {
            value: props.value,
            type: 'checkbox',
            disabled: props.disabled,
            onChange: handleChange,
            form: props.formName
        }
    )
    return (
        <CheckboxWrapperStyled>
            <InputStyled {...inputProps} />
            <SwitchStyled/>
            <CheckboxTypographyStyled verticalMargin="zero">
                {props.children}
            </CheckboxTypographyStyled>
        </CheckboxWrapperStyled>
    )
}
