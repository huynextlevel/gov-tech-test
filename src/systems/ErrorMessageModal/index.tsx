import React, {
  Component,
  ElementRef
} from 'react'
import { View, StyleSheet } from 'react-native'

import { BasicModal } from 'src/components/basics/modals'
import { BoxTextButton } from 'src/components/basics/buttons'
import { Typography } from 'src/components/basics/typographies'

interface ErrorMessageModalState {
  title: string
  desc: string
  isShowRefreshButton?: boolean
  onPress?: () => void
}

export interface ErrorMessageHandleProps {
  /**
   * @prop title: Title of error
   */
  title: string

  /**
   * @prop desc: Description for the error
   */
  desc: string

  /**
   * @prop isShowRefreshButton: Show the button to allow you can check the error has been resolved
   */
  isShowRefreshButton?: boolean

  /**
   * @prop onPress: Callback function to check the error again
   */
  onPress?: () => void
}

class ErrorMessageModal extends Component<
  {},
  ErrorMessageModalState
> {
  private static __singletonRef: ErrorMessageModal
  private _modalRef: React.RefObject<ElementRef<typeof BasicModal>> | null

  static show({ title, desc, isShowRefreshButton, onPress }: ErrorMessageHandleProps) {
    ErrorMessageModal.__singletonRef.__show({ title, desc, isShowRefreshButton, onPress })
  }

  static hide() {
    ErrorMessageModal.__singletonRef.__hide()
  }

  constructor(props: ErrorMessageHandleProps) {
    super(props)
    ErrorMessageModal.__singletonRef = this
    this.state = {
      title: '',
      desc: '',
      isShowRefreshButton: true,
      onPress: undefined
    }
    this._modalRef = React.createRef()
  }

  __show = ({ title, desc, isShowRefreshButton, onPress }: ErrorMessageHandleProps) => {
    this._modalRef?.current?.show()
    this.setState({
      title,
      desc,
      isShowRefreshButton,
      onPress
    })
  }

  __hide = () => {
    this._modalRef?.current?.close()
    this.setState({
      title: '',
      desc: '',
      isShowRefreshButton: true,
      onPress: undefined
    })
  }

  onTryAgain = () => {
    if (this.state.onPress) {
      this.state.onPress()
    }
  }

  render() {
    return (
      <BasicModal ref={this._modalRef} type="bottom">
        <View style={styles.root}>
          <Typography size={22} color="gray3" align="center" weight="bold" style={{ marginBottom: 8 }}>
            {this.state.title}
          </Typography>
          <Typography size={16} color="gray3" align="center" weight="regular">
            {this.state.desc}
          </Typography>
          {this.state.isShowRefreshButton && (
            <BoxTextButton
              type="sec"
              size="large"
              label="Try Again"
              onPress={this.onTryAgain}
              style={{ marginTop: 16 }}
            />
          )}
        </View>
      </BasicModal>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    paddingBottom: 16,
    paddingHorizontal: 16
  }
})

export default ErrorMessageModal
