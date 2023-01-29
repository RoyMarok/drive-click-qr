import * as colors from './colors.config.style'
/* BASICS: Основные цвета из палитры */
/* https://www.figma.com/file/G5ckzQuZrPcITHvEWCxQzh/06%E3%83%BBWeb%E3%83%BBTokens?node-id=0%3A1 */

export const noColor = colors.white
export const transparent = colors.white0A

export const primary = colors.gray9
export const secondary = colors.gray70A
export const tertiary = colors.gray55A

export const whitePrimary = colors.white
export const whiteSecondary = colors.white70A
export const whiteTertiary = colors.white55A

export const white = whitePrimary

export const brandPrimary = colors.green5
export const brandSecondary = colors.green6
export const brandTertiary = colors.green4
export const brandTransparent40 = colors.hex2rgba(brandPrimary, 40)
export const brandTransparent24 = colors.hex2rgba(brandPrimary, 24)
export const brandTransparent16 = colors.hex2rgba(brandPrimary, 16)
export const brandTransparent8 = colors.hex2rgba(brandPrimary, 8)

export const brand = brandPrimary

export const successPrimary = colors.green5
export const successSecondary = colors.green6
export const successTertiary = colors.green4
export const successTransparent40 = colors.hex2rgba(successPrimary, 40)
export const successTransparent24 = colors.hex2rgba(successPrimary, 24)
export const successTransparent16 = colors.hex2rgba(successPrimary, 16)
export const successTransparent8 = colors.hex2rgba(successPrimary, 8)

export const success = successPrimary

export const infoPrimary = colors.violet5
export const infoSecondary = colors.violet6
export const infoTertiary = colors.violet4
export const infoTransparent60 = colors.hex2rgba(infoPrimary, 60)
export const infoTransparent40 = colors.hex2rgba(infoPrimary, 40)
export const infoTransparent24 = colors.hex2rgba(infoPrimary, 24)
export const infoTransparent16 = colors.hex2rgba(infoPrimary, 16)
export const infoTransparent8 = colors.hex2rgba(infoPrimary, 8)

export const info = infoPrimary

export const warningPrimary = colors.orange5
export const warningSecondary = colors.orange6
export const warningTertiary = colors.orange4
export const warningTransparent40 = colors.hex2rgba(warningPrimary, 40)
export const warningTransparent24 = colors.hex2rgba(warningPrimary, 24)
export const warningTransparent16 = colors.hex2rgba(warningPrimary, 16)
export const warningTransparent8 = colors.hex2rgba(warningPrimary, 8)

export const warning = warningPrimary

export const additional100 = colors.gray9
export const additional60 = colors.gray60A
export const additional40 = colors.gray40A
export const additional24 = colors.gray24A
export const additional16 = colors.gray16A
export const additional8 = colors.gray8A
export const additional4 = colors.gray4A

export const background0 = white
export const background1 = '#F5F5F5'
export const background1Narnia = '#F5F5F5'
export const background1Neutral = '#F5F5F5'
export const background1Success = '#EFFCF0'
export const background1Info = '#F8F6FB'
export const background1Warning = '#FCF3EF'

/* Компонентные семантические цвета */
/* User choice */

/* Common */
export const firstShadow = additional4
export const secondShadow = additional16

/* Text for selection */
export const selectionCheckedText = primary
export const selectionWarningText = warningPrimary
export const selectionWarningHoverText = warningSecondary
export const selectionHoverText = primary
export const selectionUncheckedText = secondary
export const selectionDisableText = tertiary

/* Checkbox + radio */
export const checkboxBorderOffNormal = additional24
export const checkboxBody = noColor
export const checkboxToggle = whitePrimary
export const checkboxOnNormal = successPrimary
export const checkboxOffHover = additional40
export const checkboxOnHover = successSecondary
export const checkboxOffClick = additional60
export const checkboxOnClick = successPrimary
export const checkboxBorderOffDisabled = additional16
export const checkboxBodyOffDisabled = additional4
export const checkboxBorderOnDisabled = successPrimary
export const checkboxBorderFocus = primary
export const checkboxBodyOnDisabled = '#90d8b1'
export const checkboxWarningNormal = warningPrimary
export const checkboxWarningHover = warningSecondary
export const checkboxWarningClick = warningPrimary

/* SegmentedRadio */
export const segmentedRadioTextNormal = primary
export const segmentedRadioTextSelected = white
export const segmentedRadioTextDisabled = tertiary
export const segmentedRadioBodyNormal = transparent
export const segmentedRadioBodyHover = additional8
export const segmentedRadioBodyActive = additional16
export const segmentedRadioBodySelected = brandPrimary
export const segmentedRadioFocusBorder = primary
export const segmentedGroupBorder = additional8

/* Switch */
export const switchOffNormal = additional24
export const switchToggle = whitePrimary
export const switchOnNormal = successPrimary
export const switchOffHover = additional40
export const switchOnHover = successSecondary
export const switchOffClick = additional60
export const switchOnClick = successPrimary
export const switchBodyOffDisabled = additional16
export const switchToggleDisabled = whiteTertiary
export const switchBodyOnDisabled = successPrimary
export const switchWarningNormal = warningPrimary
export const switchWarningHover = warningSecondary
export const switchWarningClick = warningPrimary

/* Button */
/* Primary */
export const buttonPrimaryTextNormal = whitePrimary
export const buttonPrimaryNormal = brandPrimary
export const buttonPrimaryHover = additional24
export const buttonPrimaryClick = additional40
export const buttonPrimaryFocusBody = brandPrimary
export const buttonPrimaryFocusBorder = primary

/* Secondary/ Tertiary */
export const buttonSecondaryTextNormal = primary
export const buttonSecondaryNormal = additional24
export const buttonSecondaryHover = additional40
export const buttonSecondaryClick = additional60
export const buttonSecondaryFocus = primary

/* Text */
export const buttonTextNormal = primary
export const buttonTextBodyNormal = transparent
export const buttonTextBorderNormal = whiteTertiary
export const buttonTextHover = additional8
export const buttonTextClick = additional16
export const buttonTextFocus = primary

/* Accordion */
export const accordionTextNormal = primary
export const accordionDescriptionNormal = secondary
export const accordionBorderNormal = additional4
export const accordionTextHover = secondary
export const accordionTextClicked = tertiary
export const accordionBorderFocused = primary

/*Table*/
export const tableRow = tertiary
export const tableRowBorder = additional8
export const tableLabel = secondary

/* Alert */
export const alertTitle = primary
export const alertDescription = secondary

export const alertSuccessBody = successTransparent8
export const alertSuccessBorder = successTransparent24
export const alertSuccessIcon = successPrimary
export const alertSuccessActions = successSecondary

export const alertDraftBody = additional8
export const alertDraftBorder = additional24
export const alertDraftIcon = primary
export const alertDraftActions = primary

export const alertWarningBody = warningTransparent8
export const alertWarningBorder = warningTransparent24
export const alertWarningIcon = warningPrimary
export const alertWarningActions = warningSecondary

export const alertInfoBody = infoTransparent8
export const alertInfoBorder = infoTransparent24
export const alertInfoIcon = infoPrimary
export const alertInfoActions = infoSecondary

/* Card */
export const cardBase = noColor
export const cardBaseBorder = additional8
export const cardBaseHover = additional16
export const cardBaseActive = additional40
export const cardBaseFocus = additional100
export const cardLabel = brandTransparent16
export const cardCloseButton = additional4
export const cardCloseButtonHover = additional8
export const cardCloseButtonActive = additional16
export const cardCloseButtonFocus = primary
export const cardCloseButtonIconHover = primary
export const cardCloseButtonIconActive = primary
export const cardExternalLinkIcon = additional24
export const cardExternalLinkIconHover = primary
export const cardExternalLinkIconFocus = primary
export const cardMenuIconNormal = additional24
export const cardMenuIconHover = primary
export const cardMenuIconActive = primary

/* Banner */
export const bannerSuccessBody = successTransparent8
export const bannerWarningBody = warningTransparent8
export const bannerInfoBody = infoTransparent8
export const bannerDraftBody = additional8

/* Tooltip */
export const tooltipBody = whitePrimary
export const tooltipWarning = colors.orange5
export const tooltipTitle = primary
export const tooltipDescription = secondary
export const tooltipTextBorder = secondary

/* TextField */
export const textFieldBody = whitePrimary
export const textFieldNormalBorder = additional24
export const textFieldHoverBorder = additional40
export const textFieldClickBorder = successPrimary
export const textFieldFocusBorder = primary
export const textFieldPlaceholder = tertiary
export const textFieldText = primary
export const textFieldDisabledBody = additional4
export const textFieldDisabledBorder = additional16
export const textFieldDisabledText = tertiary
export const textFieldErrorNormal = warningPrimary
export const textFieldErrorHover = warningSecondary
export const textFieldControlBorderNormal = colors.gray2
export const textFieldAdditionalContentHover = buttonTextHover
export const textFieldAdditionalContentActive = buttonTextClick
export const textFieldAdditionalContentFocus = buttonTextFocus

/* TextField Counter Control */
export const counterControlBackgroundNormal = buttonTextBodyNormal
export const counterControlBackgroundHover = buttonTextHover
export const counterControlBackgroundActive = buttonTextClick
export const counterControlBorderFocus = buttonTextFocus
export const counterControlBackgroundDisabled = colors.gray2

/* TextField Dropdown */
export const dropdownBackgroundNormal = whitePrimary
export const dropdownItemBackgroundHover = additional8
export const dropdownItemBackgroundClick = additional16
export const dropdownItemBackgroundActive = additional8
export const dropdownItemBackgroundSelected = successTransparent16
export const dropdownButtonBorderFocus = primary
export const dropdownIconDisabled = additional24

/* Autocomplete */
export const autocompleteContentBody = whitePrimary
export const autocompleteContentBorder = colors.gray2
export const autocompleteItemBorder = additional8
export const autocompletePlaceholder = tertiary
export const autocompleteNoColor = transparent

/* Suggest/tags */
export const tagText = primary
export const tagBodyNormal = additional4
export const tagBorderNormal = additional8
export const tagBodyHover = additional8
export const tagBorderHover = additional16
export const tagBodyClick = additional16
export const tagBorderClick = additional24

/* Slider */
export const slider = brandPrimary
export const sliderBody = whitePrimary
export const sliderHover = brandSecondary
export const sliderClick = brandSecondary
export const sliderError = warningPrimary
export const sliderErrorHover = warningSecondary
export const sliderErrorClick = warningSecondary
export const sliderDisabled = colors.gray3
export const sliderSegments = additional24

/* HorizontalScroll */
export const buttonScrollBackground = noColor
export const buttonScrollBody = tertiary
export const buttonScrollHover = primary
export const buttonScrollBlockBackground = noColor
export const buttonScrollGradientFrom = noColor
export const buttonScrollGradientTo = transparent
export const buttonScrollBorder = colors.gray8A

/* Tabs */
export const tabTextActive = primary
export const tabTextNormal = secondary
export const tabTextHover = primary
export const tabFocus = primary
export const tabButtonHover = colors.gray3

/* ValueSelect */
export const valueSelectText = primary
export const valueSelectDisabledText = tertiary
export const valueSelectGroupText = tertiary
export const valueSelectBody = whitePrimary
export const valueSelectContentBody = whitePrimary
export const valueSelectDisabledBody = additional4
export const valueSelectPlaceholder = tertiary
export const valueSelectNormalBorder = additional24
export const valueSelectActiveBorder = additional60
export const valueSelectHoverBorder = additional40
export const valueSelectFocusBorder = primary
export const valueSelectDisabledBorder = additional16
export const valueSelectErrorBorder = warningPrimary
export const valueSelectNoColor = transparent
export const valueSelectContentBorder = colors.gray2
export const valueSelectDescriptionText = tertiary
export const valueSelectHover = additional8
export const valueSelectItemSelectedBody = successTransparent16
export const valueSelectItemBorder = additional8
export const valueSelectMultiIcon = additional24
export const valueSelectMultiIconHover = additional60
export const valueSelectMultiIconActive = primary

/* Labeled */
export const labeledInfoIconNormal = colors.gray24A
export const labeledInfoIconHover = colors.gray9

/* Loader */
export const loaderBodyPrimary = colors.black
export const loaderBodySecondary = colors.white

/* LoaderIcon */
export const loaderIconBorderPrimary = additional8
export const loaderIconLoaderPrimary = additional100
export const ieLoaderIconLoaderPrimary = transparent
export const loaderIconLoaderSecondary = white
export const loaderIconBorderSecondary = whiteTertiary

/* Links*/
/* Link Primary */
export const linkPrimaryNormal = primary
export const linkPrimaryHover = secondary
export const linkPrimaryClick = primary

/* Link Success */

export const linkSuccessNormal = successPrimary
export const linkSuccessHover = successSecondary
export const linkSuccessClick = successSecondary

/* Link Info */
export const linkInfoNormal = infoPrimary
export const linkInfoHover = infoSecondary
export const linkInfoClick = infoSecondary

/* Link Warning */

export const linkWarningNormal = warningPrimary
export const linkWarningHover = warningSecondary
export const linkWarningClick = warningSecondary

/* Link */
export const linkNormal = linkPrimaryNormal
export const linkHover = linkPrimaryHover
export const linkClick = linkPrimaryClick
export const linkFocus = primary
export const linkDisabled = tertiary

/* Menu */
export const menuNormal = white
export const menuHover = additional8
export const menuActive = additional16
export const menuFocus = primary
export const menuBorderNormal = additional8

/* Calendar */
export const calendarBackground = white
export const calendarTextNormal = primary
export const calendarTextHover = primary
export const calendarTextActive = white
export const calendarTextDisabled = colors.hex2rgba(primary, 55)
export const calendarWeekendTextNormal = brandPrimary
export const calendarButtonHover = colors.hex2rgba(primary, 8)
export const calendarButtonClick = additional16
export const calendarButtonActive = brandPrimary
export const calendarButtonCurrent = brandPrimary
export const calendarButtonCurrentActive = white
export const calendarButtonFocus = primary
export const calendarButtonInvalid = warningTransparent16
export const calendarButtonWithin = successTransparent16
export const calendarBorder = colors.hex2rgba(primary, 8)

/* Stages */
export const stagesNeutralBorder = additional24
export const stagesNeutralBg = transparent
export const stagesNeutralFont = tertiary

export const stagesSuccessBorder = brandPrimary
export const stagesSuccessBg = brandPrimary
export const stagesSuccessFont = white

export const stagesCaption = primary
export const stagesCaptionBg = white

export const stagesTitle = primary

/* HorizontalScroll navigation*/
export const navigationFill = colors.gray3
export const navigationHover = primary
export const navigationActive = primary
