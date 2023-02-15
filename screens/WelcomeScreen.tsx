import { Text, View, Image, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLinkTo } from '@react-navigation/native';
import { pxToDp } from '../constants/Layout';
import Button from '../components/Button';
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
        // FIXME 去掉安全区颜色
        backgroundColor: themeColor.yellow,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View style={style.container}>
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Image source={icon} style={style.image} />
          <Text style={style.mainTitle}>宠趣</Text>
          <Text style={style.subTitle}>他的每一天</Text>
        </View>
        <View>
          <Button
            title="注册"
            viewStyle={{ ...style.buttonView, marginBottom: pxToDp(10), backgroundColor: themeColor.lightBrown }}
            textStyle={style.buttonText}
            onPress={() => linkTo('/register/regist')}
          />
          <Button
            title="登陆"
            viewStyle={style.buttonView}
            textStyle={style.buttonText}
            onPress={() => linkTo('/login')}
          />
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  safeArea: {
    backgroundColor: themeColor.yellow,
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: themeColor.orange,
    width: '100%',
    height: '100%',
    display: 'flex',
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
  mainTitle: {
    fontWeight: 'bold',
    fontSize: pxToDp(32),
    color: '#ffffff',
    paddingTop: pxToDp(45),
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: pxToDp(16),
    color: '#ffffff',
    paddingTop: pxToDp(24),
  },
  buttonView: {
    width: pxToDp(327),
    height: pxToDp(48),
    backgroundColor: themeColor.yellow,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: pxToDp(3),
  },
  buttonText: {
    color: '#fff',
    fontSize: pxToDp(18),
  },
});
export default WelcomeScreen;
