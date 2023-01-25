import { Global } from '@emotion/react'

export const Fonts = () => (
  <Global
    styles={`
      @font-face {
    font-family: 'Tilda Sans Extra';
    src: url('fonts/tildasans/TildaSans-ExtraBold.eot');
    src: local('Tilda Sans Extra Bold'), local('TildaSans-ExtraBold'),
        url('fonts/tildasans/TildaSans-ExtraBold.eot?#iefix') format('embedded-opentype'),
        url('fonts/tildasans/TildaSans-ExtraBold.woff2') format('woff2'),
        url('fonts/tildasans/TildaSans-ExtraBold.woff') format('woff'),
        url('fonts/tildasans/TildaSans-ExtraBold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Tilda Sans VF';
    src: url('fonts/tildasans/TildaSansVF.eot');
    src: local('Tilda Sans VF'), local('TildaSansVF'),
        url('fonts/tildasans/TildaSansVF.eot?#iefix') format('embedded-opentype'),
        url('fonts/tildasans/TildaSansVF.woff2') format('woff2'),
        url('fonts/tildasans/TildaSansVF.woff') format('woff'),
        url('fonts/tildasans/TildaSansVF.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Tilda Sans';
    src: url('fonts/tildasans/TildaSans-Medium.eot');
    src: local('Tilda Sans Medium'), local('TildaSans-Medium'),
        url('fonts/tildasans/TildaSans-Medium.eot?#iefix') format('embedded-opentype'),
        url('fonts/tildasans/TildaSans-Medium.woff2') format('woff2'),
        url('fonts/tildasans/TildaSans-Medium.woff') format('woff'),
        url('fonts/tildasans/TildaSans-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Tilda Sans';
    src: url('fonts/tildasans/TildaSans-Bold.eot');
    src: local('Tilda Sans Bold'), local('TildaSans-Bold'),
        url('fonts/tildasans/TildaSans-Bold.eot?#iefix') format('embedded-opentype'),
        url('fonts/tildasans/TildaSans-Bold.woff2') format('woff2'),
        url('fonts/tildasans/TildaSans-Bold.woff') format('woff'),
        url('fonts/tildasans/TildaSans-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Tilda Sans';
    src: url('fonts/tildasans/TildaSans-Light.eot');
    src: local('Tilda Sans Light'), local('TildaSans-Light'),
        url('fonts/tildasans/TildaSans-Light.eot?#iefix') format('embedded-opentype'),
        url('fonts/tildasans/TildaSans-Light.woff2') format('woff2'),
        url('fonts/tildasans/TildaSans-Light.woff') format('woff'),
        url('fonts/tildasans/TildaSans-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Tilda Sans';
    src: url('fonts/tildasans/TildaSans-Black.eot');
    src: local('Tilda Sans Black'), local('TildaSans-Black'),
        url('fonts/tildasans/TildaSans-Black.eot?#iefix') format('embedded-opentype'),
        url('fonts/tildasans/TildaSans-Black.woff2') format('woff2'),
        url('fonts/tildasans/TildaSans-Black.woff') format('woff'),
        url('fonts/tildasans/TildaSans-Black.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Tilda Sans';
    src: url('fonts/tildasans/TildaSans-Regular.eot');
    src: local('Tilda Sans'), local('TildaSans-Regular'),
        url('fonts/tildasans/TildaSans-Regular.eot?#iefix') format('embedded-opentype'),
        url('fonts/tildasans/TildaSans-Regular.woff2') format('woff2'),
        url('fonts/tildasans/TildaSans-Regular.woff') format('woff'),
        url('fonts/tildasans/TildaSans-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

      `}
  />
)
