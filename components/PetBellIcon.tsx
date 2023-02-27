import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '@ui-kitten/components';

import { TabIconProps } from '../types';

function PetBellIcon(props: TabIconProps) {
  const theme = useTheme();
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20">
      <Path
        d="M7.854 14.896a2.16 2.16 0 001.56 1.884v3.2a8.445 8.445 0 01-4.777-1.906 8.475 8.475 0 01-2.384-3.178zm9.893 0a8.475 8.475 0 01-2.379 3.175 8.444 8.444 0 01-4.782 1.908V16.78a2.16 2.16 0 001.56-1.884zm.098-5.482c1.188 0 2.155.967 2.155 2.155a2.157 2.157 0 01-2.155 2.155H2.155A2.157 2.157 0 010 11.569c0-1.188.967-2.155 2.155-2.155zM10 0c1.188 0 2.155.967 2.155 2.155 0 .435-.13.84-.352 1.179a8.437 8.437 0 015.944 4.908H2.253a8.435 8.435 0 015.945-4.908 2.143 2.143 0 01-.353-1.179C7.845.967 8.812 0 10 0zm0 1.172a.984.984 0 000 1.966.984.984 0 000-1.966z"
        fill={props.isActive ? theme['color-primary-active'] : theme['color-primary-disabled']}
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default PetBellIcon;
