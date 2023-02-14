import { View, TextInput, Image, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import { pxToDp } from '../constants/Layout';
const locked = require('../assets/images/locked.png');
const { themeColor } = Colors;
type Props = {};

export default function RegisterScreen({}: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        ...style.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Image source={locked} style={style.image} />
      <View>
        <TextInput placeholder="手机号码" placeholderTextColor={'#361D1E50'} style={style.input} />
        <TextInput placeholder="验证码" placeholderTextColor={'#361D1E50'} style={style.input} />
        <TextInput placeholder="新的密码" placeholderTextColor={'#361D1E50'} style={style.input} />
        <TextInput placeholder="确认密码" placeholderTextColor={'#361D1E50'} style={style.input} />
        <Button title="注册" viewStyle={{ ...style.buttonView, marginTop: pxToDp(32) }} textStyle={style.buttonText} />
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: themeColor.white,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: pxToDp(64),
    height: pxToDp(80),
    marginTop: pxToDp(53),
    marginBottom:pxToDp(20),
  },
  input: {
    width: pxToDp(327),
    height: pxToDp(58),
    borderBottomColor: '#bbbbbb',
    borderBottomWidth: pxToDp(1),
    lineHeight: pxToDp(29),
    fontSize: pxToDp(16),
    color: '#3611d1e',
    marginTop: pxToDp(16),
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
