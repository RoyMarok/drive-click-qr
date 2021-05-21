import styled from '@emotion/styled/macro'
import { css } from '@emotion/react/macro'

import * as theme from './light.theme.style'
import { xsShadow } from './common.config.style'
import { lineHeightMd, baseX } from './font-sizes.config.style'
import { mdCheckedSwitchAnimation } from './md-checked-switch-animation.keyframe'
import { mdUncheckedSwitchAnimation } from './md-unchecked-switch-animation.keyframe'

const parametrs = {
    size: '20px',
    widthSwitch: '36px',
    circleSize: '16px',
    endPoint: '16px',
    borderRadius: '20px',
    checkedSwitchAnimation: mdCheckedSwitchAnimation,
    uncheckedSwitchAnimation: mdUncheckedSwitchAnimation
}

const checkedSwitchAnimationDuration = '1s'
const uncheckedSwitchAnimationDuration = '1s'

export const CheckboxTypographyStyled = styled.p(() => css `
    margin-left: 5px;
    color: ${theme.tertiary};
    cursor: pointer;
`)


export const SwitchStyled = styled.div(() => css `
    position: relative;
    width: ${parametrs.widthSwitch};
    height: ${parametrs.size};
    flex-shrink: 0;
    cursor: pointer;
    border-radius: ${parametrs.borderRadius};
    transition: background-color 0.3s ease;

    &::before {
        content: '';
        position: absolute;
        left: 2px;
        top: 2px;
        height: ${parametrs.circleSize};
        width: ${parametrs.circleSize};
        border-radius: 100%;
        box-shadow: ${xsShadow};
        background-color: ${theme.whitePrimary};
        animation: ${parametrs.uncheckedSwitchAnimation} ${uncheckedSwitchAnimationDuration} linear;
    }
`)

export const InputStyled = styled.input(css `
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    margin: 3px;

`, () => {
    const checkboxColors = theme

    return css `
            /* Switch */
            & ~ ${SwitchStyled} {
                background-color: ${checkboxColors.switchOffNormal};
            }

            &:hover ~ ${SwitchStyled} {
                background-color: ${checkboxColors.switchOffHover};

            }

            &:active ~ ${SwitchStyled} {
                background-color: ${checkboxColors.switchOffClick};

            }

            &:disabled ~ ${SwitchStyled} {
                background-color: ${checkboxColors.switchBodyOffDisabled};
                cursor: default;
            }

            &:disabled ~ ${SwitchStyled}::before {
                background-color: ${checkboxColors.switchToggleDisabled};
                cursor: default;
            }

            body:not(.pointer-events) &:focus {
                & ~ ${SwitchStyled} {
                    box-shadow: 0 0 0 2px ${checkboxColors.transparent};
                }
            }

            &:checked {
                & ~ ${SwitchStyled} {
                    background-color: ${checkboxColors.switchOnNormal};
                }

                & ~ ${SwitchStyled}::before {
                    transform: translateX(${parametrs.endPoint});
                    animation: ${parametrs.checkedSwitchAnimation} ${checkedSwitchAnimationDuration} linear;
                }

                &:hover ~ ${SwitchStyled} {
                    background-color: ${checkboxColors.switchOnHover};

                }

                &:active ~ ${SwitchStyled} {
                    background-color: ${checkboxColors.switchOnNormal};

                }

                &:disabled ~ ${SwitchStyled} {
                    background-color: ${checkboxColors.switchBodyOnDisabled};
                    cursor: default;
                }

                &:disabled ~ ${SwitchStyled}::before {
                    background-color: ${checkboxColors.switchToggleDisabled};
                    cursor: default;
                }
            }

            /* Text content */
            & ~ ${CheckboxTypographyStyled} {
                color: ${checkboxColors.selectionUncheckedText};
            }

            &:hover ~ ${CheckboxTypographyStyled} {
                color: ${checkboxColors.selectionHoverText};
            }

            body:not(.pointer-events) &:focus ~ ${CheckboxTypographyStyled} {
                color: ${checkboxColors.selectionUncheckedText};
            }

            &:checked {
                & ~ ${CheckboxTypographyStyled} {
                    color: ${checkboxColors.selectionCheckedText};
                }

                &:hover ~ ${CheckboxTypographyStyled} {
                    color: ${checkboxColors.selectionHoverText};
                }

                body:not(.pointer-events) &:focus {
                    & ~ ${CheckboxTypographyStyled} {
                        color: ${checkboxColors.selectionCheckedText};
                    }
                }
            }

            &:disabled {
                & ~ ${CheckboxTypographyStyled} {
                    color: ${theme.selectionDisableText};
                }

                &:hover ~ ${CheckboxTypographyStyled} {
                    cursor: default;
                    color: ${theme.selectionDisableText};
                }
            }
        `
})

export const CheckboxWrapperStyled = styled.label(() => css `
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    user-select: none;

    body:not(.pointer-events) &:focus-within {
        border-color: ${theme.primary};
    }

    svg {
        margin: 0 auto;
    }
`)

