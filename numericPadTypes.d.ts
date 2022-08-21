declare module "react-native-numeric-pad" {
    // @ts-ignore
    import React from "react"
    // @ts-ignore
    import { ViewStyle, TextStyle } from "react-native"

    type onRightBottomButtonPressCallback = () => void
    type onValueChangeCallback = (value: string) => void

    export interface NumericPadProps {
        onRightBottomButtonPress?: onRightBottomButtonPressCallback
        onValueChange?: onValueChangeCallback

        numLength: number,
        activeOpacity?: number
        buttonSize?: number
        rightBottomButtonSize?: number

        style ?: ViewStyle
        buttonItemStyle?: ViewStyle
        rightBottomButtonItemStyle?: ViewStyle
        buttonAreaStyle ?: ViewStyle
        buttonTextStyle?: TextStyle

        numericDisabled?: boolean
        rightBottomButtonDisabled?: boolean
        allowDecimal?: boolean
        accessible?: boolean

        buttonTextByKey ?: object,
        rightBottomButton?: React.FunctionComponent<any>
        rightBottomAccessibilityLabel?: string,
    }

    const NumericPad: React.FunctionComponent<NumericPadProps>
    export default NumericPad
}
