# GovTech Test

## Book a Room Mobile application
This is the source code of GovTech Test Assignment

## Features
- Fetch, sort the room list
- Scan/choose QR Code to confirm the booking
- Showing the result screen
  
## Prerequisites

- [Node](https://nodejs.org) v16 (it is recommended to install it via [NVM](https://github.com/creationix/nvm))
- [Yarn](https://yarnpkg.com/)
- [Cocoapods](https://formulae.brew.sh/formula/cocoapods) (it is recommended to install it via Homebrew)
- A development machine set up for React Native by following [these instructions](https://reactnative.dev/docs/environment-setup)

## My Specs

- Macbook 16-inch M1 Pro
- Xcode v14.3.1
- Android Studio Dolphin | 2021.3.1 Patch 1

## Getting Started

### Installation

1. Clone this repo, `git clone https://github.com/huynextlevel/gov-tech-test.git`
2. Go to project's root directory, `cd gov-tech-test`
3. Run `yarn` to install dependencies
4. Run `cd ios && pod install`

### Start development in locally

1. Go to project's root directory, `cd gov-tech-test`
2. Start the packager with `yarn start`
3. Connect a mobile device to your development machine
4. Run the test application:

- On Android:
  - Run `npx react-native run-android` or Use Android Studio (Recommended)
- On iOS:
  - cd `gov-tech-test/ios`
  - Open `ios/govTechTest.xcworkspace` in Xcode
  - When Xcode open, then hit `Run` after selecting the desired device
  - If you want to test on the real device:

    - On the Xcode, open tab `Signing & Capabilities`
    - Choose your `Apple Developer Account`, under `Team` section
    - hit `Run` after pluging the real Iphone device

### Testing

1. Go to project's root directory, `cd gov-tech-test`
2. Run `yarn test` to run all tests under `__tests__` folder
3. Run `yarn test:coverage` to run all tests and also produces a code coverage report

### Test Coverage Result
  <img height="820" src="/archive/test-coverage/coverage-test.png" alt=""/>
