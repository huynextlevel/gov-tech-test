import React from 'react'
import { render } from '@testing-library/react-native'
import { BasicIcon } from 'src/components/basics/icons'

jest.mock('src/assets/svgs/basics', () => ({
  ic_camera: 'ic_camera'
}))

describe('BasicIcon component unit test', () => {
  beforeAll(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the icon with given name', () => {
    const { UNSAFE_getByProps } = render(<BasicIcon name="ic_camera" />)
    expect(UNSAFE_getByProps({ name: 'ic_camera' })).toBeOnTheScreen
  })

  it('applies custom size', () => {
    const size = 40
    const { UNSAFE_getByProps } = render(<BasicIcon name="ic_camera" size={size} />)
    const icon = UNSAFE_getByProps({ name: 'ic_camera' })

    expect(icon).toBeOnTheScreen
    expect(icon.props.size).toEqual(size)
  })

  it('applies custom width and height over size', () => {
    const { UNSAFE_getByProps } = render(<BasicIcon name="ic_camera" width={50} height={60} size={40} />)
    const icon = UNSAFE_getByProps({ name: 'ic_camera' })

    expect(icon).toBeOnTheScreen
    expect(icon.props.width).toEqual(50)
    expect(icon.props.height).toEqual(60)
  })

  it('applies fill color correctly', () => {
    const { UNSAFE_getByProps } = render(<BasicIcon name="ic_camera" color="gray1" />);
    const icon = UNSAFE_getByProps({ name: 'ic_camera' })

    expect(icon).toBeOnTheScreen
    expect(icon.props.color).toEqual('gray1')
  })
})
