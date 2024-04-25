import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'

const ButtonItem = ({
  activeOpacity,
  onButtonPress,
  buttonSize = 60,
  text,
  customComponent,
  customViewStyle,
  accessible,
  accessibilityLabel,
  disabled,
  customTextStyle
}) => {
  return (
    <TouchableOpacity
      accessible={accessible}
      accessibilityRole="keyboardkey"
      accessibilityLabel={customComponent !== undefined ? accessibilityLabel : text}
      activeOpacity={activeOpacity}
      disabled={disabled}
      style={NumpadStyle.buttonContainer}
      onPress={onButtonPress}>
      <View
        style={[
          NumpadStyle.buttonView,
          { width: buttonSize, height: buttonSize, borderRadius: buttonSize / 2 },
          customViewStyle
        ]}>
        {customComponent || (
          <Text style={[NumpadStyle.buttonText, customTextStyle]}>{text}</Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

const ViewHolder = () => {
  return <View style={NumpadStyle.buttonContainer} />
}

const NumericPad = React.forwardRef(
  (
    {
      numLength,
      allowDecimal,
      onValueChange,
      buttonTextByKey,
      accessible,
      style,
      activeOpacity,
      buttonSize,
      buttonItemStyle,
      buttonAreaStyle,
      buttonTextStyle,
      numericDisabled,
      rightBottomButton,
      rightBottomButtonDisabled,
      rightBottomButtonSize = 60,
      rightBottomAccessibilityLabel,
      rightBottomButtonItemStyle,
      onRightBottomButtonPress
    },
    ref
  ) => {
    const [input, setInput] = useState('')
    ref.current = {
      clear: () => {
        if (input.length > 0) {
          setInput(input.slice(0, -1))
        }
      },
      clearAll: () => {
        if (input.length > 0) {
          setInput('')
        }
      },
      setValue: (newValue) => {
        // Check for valid value based on rules (e.g., respecting numLength and decimal handling)
        if (typeof newValue === 'string' && newValue.length <= numLength) {
          if (!allowDecimal && newValue.includes('.')) {
            // Ignore setting the value if decimals are not allowed
            return;
          }
          if (newValue.includes('.')) {
            const parts = newValue.split('.');
            if (parts[1].length > 2) { // Assuming you want at most two digits after the decimal
              newValue = parts[0] + '.' + parts[1].substring(0, 2);
            }
          }
          setInput(newValue);
        }
      }
    }

    const onButtonPressHandle = (key, value) => {
      // only 1 dot
      if ((key === 'dot' && input.length < 1) || (key === 'dot' && input.includes('.'))) return
      if (input.includes('.') && input.substring(input.indexOf('.')).length === 3) return
      // 2 digits after the dot
      if (input.length < numLength) {
        setInput(input + '' + value)
      }
    }

    useEffect(() => {
      if (onValueChange !== undefined) {
        onValueChange(input)
      }
    }, [input])

    return (
      <View style={[NumpadStyle.container, style]}>
        <View style={[NumpadStyle.buttonAreaContainer, buttonAreaStyle]}>
          <ButtonItem
            disabled={numericDisabled}
            accessible={accessible}
            activeOpacity={activeOpacity}
            onButtonPress={() => onButtonPressHandle('one', '1')}
            buttonSize={buttonSize}
            text={buttonTextByKey.one}
            customTextStyle={buttonTextStyle}
            customViewStyle={buttonItemStyle}
          />
          <ButtonItem
            disabled={numericDisabled}
            accessible={accessible}
            activeOpacity={activeOpacity}
            onButtonPress={() => onButtonPressHandle('two', '2')}
            buttonSize={buttonSize}
            text={buttonTextByKey.two}
            customTextStyle={buttonTextStyle}
            customViewStyle={buttonItemStyle}
          />
          <ButtonItem
            disabled={numericDisabled}
            accessible={accessible}
            activeOpacity={activeOpacity}
            onButtonPress={() => onButtonPressHandle('three', '3')}
            buttonSize={buttonSize}
            text={buttonTextByKey.three}
            customTextStyle={buttonTextStyle}
            customViewStyle={buttonItemStyle}
          />
          <ButtonItem
            disabled={numericDisabled}
            accessible={accessible}
            activeOpacity={activeOpacity}
            onButtonPress={() => onButtonPressHandle('four', '4')}
            buttonSize={buttonSize}
            text={buttonTextByKey.four}
            customTextStyle={buttonTextStyle}
            customViewStyle={buttonItemStyle}
          />
          <ButtonItem
            disabled={numericDisabled}
            accessible={accessible}
            activeOpacity={activeOpacity}
            onButtonPress={() => onButtonPressHandle('five', '5')}
            buttonSize={buttonSize}
            text={buttonTextByKey.five}
            customTextStyle={buttonTextStyle}
            customViewStyle={buttonItemStyle}
          />
          <ButtonItem
            disabled={numericDisabled}
            accessible={accessible}
            activeOpacity={activeOpacity}
            onButtonPress={() => onButtonPressHandle('six', '6')}
            buttonSize={buttonSize}
            text={buttonTextByKey.six}
            customTextStyle={buttonTextStyle}
            customViewStyle={buttonItemStyle}
          />
          <ButtonItem
            disabled={numericDisabled}
            accessible={accessible}
            activeOpacity={activeOpacity}
            onButtonPress={() => onButtonPressHandle('seven', '7')}
            buttonSize={buttonSize}
            text={buttonTextByKey.seven}
            customTextStyle={buttonTextStyle}
            customViewStyle={buttonItemStyle}
          />
          <ButtonItem
            disabled={numericDisabled}
            accessible={accessible}
            activeOpacity={activeOpacity}
            onButtonPress={() => onButtonPressHandle('eight', '8')}
            buttonSize={buttonSize}
            text={buttonTextByKey.eight}
            customTextStyle={buttonTextStyle}
            customViewStyle={buttonItemStyle}
          />
          <ButtonItem
            disabled={numericDisabled}
            accessible={accessible}
            activeOpacity={activeOpacity}
            onButtonPress={() => onButtonPressHandle('nine', '9')}
            buttonSize={buttonSize}
            text={buttonTextByKey.nine}
            customTextStyle={buttonTextStyle}
            customViewStyle={buttonItemStyle}
          />
           {allowDecimal ? (
          <ButtonItem
            disabled={numericDisabled}
            accessible={accessible}
            activeOpacity={activeOpacity}
            onButtonPress={() => onButtonPressHandle('dot', '.')}
            buttonSize={buttonSize}
            text={buttonTextByKey.dot}
            customTextStyle={buttonTextStyle}
            customViewStyle={buttonItemStyle}
          />): (
            <ViewHolder />
          )}
          <ButtonItem
            disabled={numericDisabled}
            accessible={accessible}
            activeOpacity={activeOpacity}
            onButtonPress={() => onButtonPressHandle('zero', '0')}
            buttonSize={buttonSize}
            text={buttonTextByKey.zero}
            customTextStyle={buttonTextStyle}
            customViewStyle={buttonItemStyle}
          />
          {rightBottomButton !== undefined
            ? (
              <ButtonItem
                disabled={rightBottomButtonDisabled}
                accessible={accessible}
                activeOpacity={activeOpacity}
                accessibilityLabel={rightBottomAccessibilityLabel}
                onButtonPress={() => onRightBottomButtonPress('right_bottom')}
                customViewStyle={rightBottomButtonItemStyle}
                customComponent={rightBottomButton}
                buttonSize={rightBottomButtonSize}
              />
            )
            : (
              <ViewHolder />
            )}
        </View>
      </View>
    )
  }
)

NumericPad.defaultProps = {
  buttonTextByKey: {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    dot: '.',
    zero: '0'
  },
  accessible: false,
  onButtonPress: () => {},
  onRightButtonPress: () => {},
  style: { paddingVertical: 12 },
  activeOpacity: 0.9,
  buttonTextStyle: { color: '#000', fontSize: 30, fontWeight: '400' },
  rightBottomAccessibilityLabel: 'right_bottom',
  numericDisabled: false,
  rightBottomButtonDisabled: false,
  allowDecimal: true
}

const NumpadStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  buttonAreaContainer: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  buttonContainer: {
    marginBottom: 12,
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonView: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold'
  }
})

export default NumericPad
