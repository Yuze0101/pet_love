import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { useTheme } from '@ui-kitten/components';

import { TabIconProps } from '../types';

function ShapeIcon(props: TabIconProps) {
  const theme = useTheme();
  return (
    <Svg width={19} height={20} viewBox="0 0 19 20">
      <Path
        d="M11.003.255a.812.812 0 00-1.181 0L1.211 9.483c-.469.502-.105 1.311.589 1.311h1.54l.673 8.484c.032.407.38.722.798.722H16a.793.793 0 00.797-.726l.632-8.482h1.593c.694 0 1.06-.809.589-1.312L11.002.255zm3.312 18.112a.338.338 0 01-.343.335H6.846a.338.338 0 01-.343-.335v-5.133c0-2.109 1.747-3.827 3.904-3.827h.002c2.156 0 3.904 1.718 3.904 3.827v5.133h.002z"
        transform="translate(-1)"
        fill={props.isActive ? theme['color-primary-active'] : theme['color-primary-disabled']}
        fillRule="nonzero"
        stroke="none"
        strokeWidth={1}
      />
    </Svg>
  );
}

export default ShapeIcon;
