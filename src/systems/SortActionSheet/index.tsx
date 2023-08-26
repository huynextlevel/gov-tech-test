import React, {
  useRef,
  useState,
  forwardRef,
  useCallback,
  useImperativeHandle,
  ForwardRefRenderFunction
} from 'react'
import { View, StyleSheet } from 'react-native'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet'

import { SORT_DATA, Dimension } from 'src/utils'

import { Typography } from 'src/components/basics/typographies'
import { RadioButton, BoxTextButton } from 'src/components/basics/buttons'

export interface SortActionSheetHandle {
  /**
   * @prop show: callback to show the modal
   */
  show: () => void

  /**
   * @prop close: callback to close the modal
   */
  close: () => void
}

export interface SortActionSheetProps {
  /**
   * @prop value: The selected sort value
   */
  value: string | undefined

  /**
   * @prop onChange: Callback function
   */
  onChange: (value: any) => void
}

const SortActionSheet: ForwardRefRenderFunction<
  SortActionSheetHandle,
  SortActionSheetProps
> = ({ value, onChange }, ref) => {
  const actionSheetRef = useRef<ActionSheetRef>(null)
  const [selectedValue, setSelectedValue] = useState<string | undefined>()

  const show = useCallback(() => {
    actionSheetRef.current?.show()
  }, [actionSheetRef])

  const close = useCallback(() => {
    actionSheetRef.current?.hide()
  }, [actionSheetRef])

  useImperativeHandle(ref, () => ({ show: show, close: close }), [show, close])

  const onSelected = (value: any) => {
    setSelectedValue(value)
  }

  const onReset = () => {
    onChange(undefined)
    setSelectedValue(undefined)
  }

  const onApply = useCallback(() => {
    onChange(selectedValue)
    setTimeout(() => close(), 100)
  }, [close, selectedValue])

  const onClose = () => {
    if (value === undefined) setSelectedValue(undefined)
  }

  return (
    <ActionSheet
      ref={actionSheetRef}
      headerAlwaysVisible
      containerStyle={{ paddingTop: 8 }}
      onClose={onClose}
      onBeforeShow={() => {
        setSelectedValue(value)
      }}
    >
      <View style={[styles.root, { height: Dimension.verticalPercent(0.75) }]}>
        <Typography size={16} weight="medium" color="black" align="center">
          Sort
        </Typography>
        <View style={styles.contentWrapper}>
          <View>
            {SORT_DATA.map((item: any) => (
              <View key={item.id} style={styles.row}>
                <Typography size={16} color="gray3" weight="regular">
                  {item.label}
                </Typography>
                <RadioButton
                  value={item.value}
                  selectedValue={selectedValue}
                  onChange={onSelected}
                />
              </View>
            ))}
          </View>
          <View style={styles.row}>
            <BoxTextButton
              type="sec"
              size="large"
              label="Reset"
              onPress={onReset}
              isFullWidth={false}
              style={{ width: 150, marginRight: 11 }}
            />
            <BoxTextButton
              type="pri"
              size="large"
              label="Apply"
              onPress={onApply}
            />
          </View>
        </View>
      </View>
    </ActionSheet>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 20,
    paddingHorizontal: 17
  },
  row: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  contentWrapper: {
    flex: 1,
    marginTop: 19,
    justifyContent: 'space-between'
  }
})

export default forwardRef(SortActionSheet)
