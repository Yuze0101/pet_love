import { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, Platform, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-root-toast';
import { StatusBar } from 'expo-status-bar';
import { RootStackScreenProps } from '../types';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import { pxToDp } from '../constants/Layout';
import { register, getVerificationCode } from '../api';
const locked = require('../assets/images/locked.png');
const { themeColor } = Colors;
type RegisterParams = {
  phoneNumber: number;
  verificationCode: number;
  password: string;
  confirmPassword: string;
};
const validateRegisterParams = (registerParams: RegisterParams) => {
  const checkResult = {};
  let isOk = false,
    errorMsg = '';
  for (const key in registerParams) {
    //@ts-ignore
    let value = registerParams[key];
    switch (key) {
      case 'phoneNumber':
        // 手机号验证
        isOk = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(value);
        errorMsg = isOk ? 'Ok' : '您需要输入正确的手机号';
        break;
      case 'verificationCode':
        // 纯数字验证
        isOk = String(value).length <= 4;
        errorMsg = isOk ? 'Ok' : '验证码只能4位数字';
        break;
      case 'password':
        isOk = true;
        errorMsg = isOk ? 'Ok' : '待补充';
        break;
      case 'confirmPassword':
        isOk = true;
        errorMsg = isOk ? 'Ok' : '待补充';
        break;
      default:
        break;
    }
    //@ts-ignore
    checkResult[key] = {
      isOk,
      errorMsg,
    };
  }
  Toast.show(JSON.stringify(checkResult));
  return checkResult;
};
const registerParams: RegisterParams = {
  phoneNumber: 0,
  verificationCode: 0,
  password: '',
  confirmPassword: '',
};
export default function RegisterScreen({ route, navigation }: RootStackScreenProps<'Register'>) {
  const insets = useSafeAreaInsets();

  const userGetVerificationCode = async () => {
    try {
      const res = await getVerificationCode({
        phoneNumber: registerParams.phoneNumber,
      });
      Toast.show('res is : ' + JSON.stringify(res));
    } catch (error) {
      console.error('Err: ' + error);
    }
  };
  const userRegister = async () => {
    try {
      const res = await register(registerParams);
      // TODO 按钮倒计时
      Toast.show('res is : ' + JSON.stringify(res));
    } catch (error) {
      console.error('Err: ' + error);
    }
  };
  useEffect(() => {
    console.log('register mounted : ' + JSON.stringify(route.params));
    //@ts-ignore
    setTitle(route?.params?.status == 'regist' ? '注册 & 登陆' : '重制密码 & 登陆');
  }, []);
  const [title, setTitle] = useState('');
  const [checkResult, setCheckResult] = useState({});
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        ...style.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {Object.keys(checkResult).map((key, index) => {
        // @ts-ignore
        const result = checkResult[key];
        if (!result.isOk) {
          return (
            <Text style={{ position: 'absolute', marginTop: pxToDp(20 * index), paddingTop: pxToDp(20) }} key={key}>
              {result.errorMsg}
            </Text>
          );
        }
      })}
      <Image source={locked} style={style.image} />
      <TextInput
        placeholder="手机号码"
        placeholderTextColor={'#361D1E50'}
        style={style.input}
        textContentType={'username'}
        returnKeyType={'next'}
        keyboardType={'number-pad'}
        onChangeText={number => {
          registerParams.phoneNumber = Number(number);
          setCheckResult(validateRegisterParams(registerParams));
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <TextInput
          placeholder="验证码"
          placeholderTextColor={'#361D1E50'}
          style={{ ...style.input, width: pxToDp(210) }}
          keyboardType={'number-pad'}
          textContentType={'oneTimeCode'}
          returnKeyType={'next'}
          onChangeText={code => {
            registerParams.verificationCode = Number(code);
            setCheckResult(validateRegisterParams(registerParams));
          }}
        />
        <Button
          title="获取验证码"
          viewStyle={{
            ...style.buttonView,
            ...style.buttonBrownView,
          }}
          textStyle={style.buttonBrownText}
          onPress={() => userGetVerificationCode()}
        ></Button>
      </View>
      <TextInput
        placeholder="新的密码"
        placeholderTextColor={'#361D1E50'}
        style={style.input}
        secureTextEntry={true}
        textContentType={'newPassword'}
        returnKeyType={'next'}
        onChangeText={string => {
          registerParams.password = string;
          setCheckResult(validateRegisterParams(registerParams));
        }}
      />
      <TextInput
        placeholder="确认密码"
        placeholderTextColor={'#361D1E50'}
        style={style.input}
        secureTextEntry={true}
        textContentType={'newPassword'}
        returnKeyType={'done'}
        onChangeText={string => {
          registerParams.confirmPassword = string;
          setCheckResult(validateRegisterParams(registerParams));
        }}
      />
      <Button
        title={title}
        viewStyle={{ ...style.buttonView, marginTop: pxToDp(32) }}
        textStyle={style.buttonText}
        onPress={() => {
          userRegister();
        }}
      />
      <StatusBar style={'auto'} />
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: themeColor.white,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: pxToDp(64),
    height: pxToDp(80),
    marginTop: pxToDp(53),
    marginBottom: pxToDp(20),
  },
  input: {
    width: pxToDp(327),
    height: pxToDp(46),
    borderBottomColor: '#bbbbbb',
    borderBottomWidth: pxToDp(1),
    fontSize: pxToDp(16),
    color: '#3611d1e',
    marginTop: pxToDp(16),
    borderWidth: 1,
    // paddingLeft: pxToDp(5),
    // paddingRight: pxToDp(5),
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
  buttonBrownView: {
    height: pxToDp(34),
    width: pxToDp(118),
    backgroundColor: themeColor.darkBrown,
    marginBottom: pxToDp(5),
  },
  buttonBrownText: { fontSize: pxToDp(11), color: '#F8BC3C', fontWeight: 'bold' },
});
