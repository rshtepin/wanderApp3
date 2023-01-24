import { Global } from '@emotion/react'

export const Fonts = () => (
  <Global
    styles={`
      @font-face {
    font-family: 'Tilda Sans Extra';
    src: url('/tildasans/TildaSans-ExtraBold.eot');
    src: local('Tilda Sans Extra Bold'), local('TildaSans-ExtraBold'),
        url('/tildasans/TildaSans-ExtraBold.eot?#iefix') format('embedded-opentype'),
        url('/tildasans/TildaSans-ExtraBold.woff2') format('woff2'),
        url('/tildasans/TildaSans-ExtraBold.woff') format('woff'),
        url('/tildasans/TildaSans-ExtraBold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Tilda Sans VF';
    src: url('/tildasans/TildaSansVF.eot');
    src: local('Tilda Sans VF'), local('TildaSansVF'),
        url('/tildasans/TildaSansVF.eot?#iefix') format('embedded-opentype'),
        url('/tildasans/TildaSansVF.woff2') format('woff2'),
        url('/tildasans/TildaSansVF.woff') format('woff'),
        url('/tildasans/TildaSansVF.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Tilda Sans';
    src: url('/tildasans/TildaSans-Medium.eot');
    src: local('Tilda Sans Medium'), local('TildaSans-Medium'),
        url('/tildasans/TildaSans-Medium.eot?#iefix') format('embedded-opentype'),
        url('/tildasans/TildaSans-Medium.woff2') format('woff2'),
        url('/tildasans/TildaSans-Medium.woff') format('woff'),
        url('/tildasans/TildaSans-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Tilda Sans';
    src: url('/tildasans/TildaSans-Bold.eot');
    src: local('Tilda Sans Bold'), local('TildaSans-Bold'),
        url('/tildasans/TildaSans-Bold.eot?#iefix') format('embedded-opentype'),
        url('/tildasans/TildaSans-Bold.woff2') format('woff2'),
        url('/tildasans/TildaSans-Bold.woff') format('woff'),
        url('/tildasans/TildaSans-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Tilda Sans';
    src: url('/tildasans/TildaSans-Light.eot');
    src: local('Tilda Sans Light'), local('TildaSans-Light'),
        url('/tildasans/TildaSans-Light.eot?#iefix') format('embedded-opentype'),
        url('/tildasans/TildaSans-Light.woff2') format('woff2'),
        url('/tildasans/TildaSans-Light.woff') format('woff'),
        url('/tildasans/TildaSans-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Tilda Sans';
    src: url('/tildasans/TildaSans-Black.eot');
    src: local('Tilda Sans Black'), local('TildaSans-Black'),
        url('/tildasans/TildaSans-Black.eot?#iefix') format('embedded-opentype'),
        url('/tildasans/TildaSans-Black.woff2') format('woff2'),
        url('/tildasans/TildaSans-Black.woff') format('woff'),
        url('/tildasans/TildaSans-Black.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Tilda Sans';
    src: url('/tildasans/TildaSans-Regular.eot');
    src: local('Tilda Sans'), local('TildaSans-Regular'),
        url('/tildasans/TildaSans-Regular.eot?#iefix') format('embedded-opentype'),
        url('/tildasans/TildaSans-Regular.woff2') format('woff2'),
        url('/tildasans/TildaSans-Regular.woff') format('woff'),
        url('/tildasans/TildaSans-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

      `}
  />
)
