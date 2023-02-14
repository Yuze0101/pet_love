import { useState } from 'react';
import { View, TextInput, Text, Image, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import { pxToDp } from '../constants/Layout';
import { get, post } from '../api/fetch';

const icon = require('../assets/images/icon.png');
const { themeColor } = Colors;
type Props = {};

export default function LoginScreen({}: Props) {
  const insets = useSafeAreaInsets();
  const [test, setTest] = useState('test');
  const login = async () => {
    try {
      // const res = await post('')
    } catch (error) {
      console.error('Err: ' + error);
    }
  };
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
      <Image source={icon} style={style.image} />
      <View>
        <TextInput
          placeholder="手机号码"
          placeholderTextColor={'#361D1E50'}
          style={style.input}
          textContentType={'username'}
          returnKeyType={'next'}
        />
        <TextInput
          placeholder="密码"
          placeholderTextColor={'#361D1E50'}
          style={style.input}
          secureTextEntry={true}
          textContentType={'password'}
          returnKeyType={'done'}
          onChangeText={text => {
            setTest(text);
          }}
        />
        <Button
          title="登陆"
          viewStyle={{ ...style.buttonView, marginTop: pxToDp(32) }}
          textStyle={style.buttonText}
          onPress={() => login()}
        />
      </View>
      <Text>{test}</Text>
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
    width: pxToDp(125),
    height: pxToDp(125),
    marginBottom: pxToDp(32),
  },
  input: {
    width: pxToDp(327),
    height: pxToDp(58),
    borderBottomColor: '#bbbbbb',
    // borderBottomWidth: pxToDp(1),
    // FIXME 测试样式
    borderWidth: 1,
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
