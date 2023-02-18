import { View, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLinkTo } from '@react-navigation/native';
import { pxToDp } from '../constants/Layout';
import { Button, Text } from '@ui-kitten/components';

import Colors from '../constants/Colors';
const { themeColor } = Colors;
const icon = require('../assets/images/icon.png');

type Props = {};

const WelcomeScreen = (props: Props) => {
  const insets = useSafeAreaInsets();
  const linkTo = useLinkTo();
  return (
    <View
      style={{
        backgroundColor: themeColor.orange,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View style={style.container}>
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Image source={icon} style={style.image} />
          <Text category="h1" style={{ color: '#ffffff', paddingTop: pxToDp(45) }}>
            宠趣
          </Text>
          <Text category="h6" style={{ color: '#ffffff', paddingTop: pxToDp(21) }}>
            他的每一天
          </Text>
        </View>
        <View>
          <Button
            status="info"
            style={{ ...style.button, marginBottom: pxToDp(24) }}
            onPress={() => linkTo('/register/regist')}
          >
            {evaProps => (
              <Text  {...evaProps} style={style.font} >
                注册
              </Text>
            )}
          </Button>
          <Button style={style.button} onPress={() => linkTo('/login')}>
            {evaProps => (
              <Text {...evaProps} style={style.font}>
                登陆
              </Text>
            )}
          </Button>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: themeColor.orange,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: pxToDp(118),
    paddingBottom: pxToDp(121),
  },
  image: {
    width: pxToDp(125),
    height: pxToDp(125),
  },
  button: {
    width: pxToDp(327),
    height: pxToDp(48),
    borderRadius: pxToDp(3),
  },
  font: {
    fontSize: pxToDp(18),
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
export default WelcomeScreen;
