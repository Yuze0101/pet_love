import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export const pxToDp = (elePx: number) => (width * elePx) / 375;
export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
