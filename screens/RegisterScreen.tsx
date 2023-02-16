import { useState, useEffect } from 'react';
import { View, Image, Platform, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-root-toast';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, Input, Icon } from '@ui-kitten/components';

import storage from '../utils/storage';
import { RootStackScreenProps } from '../types';
import Colors from '../constants/Colors';
import { pxToDp } from '../constants/Layout';
import { login, register, getVerificationCode } from '../api';
const locked = require('../assets/images/locked.png');
// const { themeColor } = Colors;
type RegisterParams = {
  phoneNumber: number;
  verificationCode: number;
  password: string;
  confirmPassword: string;
};

const ShowIcon = (props: any) => (
  <Icon
    style={{ width: pxToDp(12), height: pxToDp(12), marginRight: pxToDp(3) }}
    fill={props.color}
    name={props.name}
  />
);

const validateRegisterParams = (registerParams: RegisterParams) => {
  const checkResult = {
    phoneNumber: false,
    verificationCode: false,
    password: false,
    confirmPassword: false,
  };
  let isOk = false;
  for (const key in registerParams) {
    //@ts-ignore
    let value = registerParams[key];
    switch (key) {
      case 'phoneNumber':
        // 手机号验证
        isOk = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(value);
        break;
      case 'verificationCode':
        // 纯数字验证
        isOk = String(value).length == 4;
        break;
      case 'password':
        isOk = value.length == 8;
        break;
      case 'confirmPassword':
        isOk = registerParams[key] == registerParams.password;
        break;
      default:
        break;
    }
    //@ts-ignore
    checkResult[key] = isOk;
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

  useEffect(() => {
    //@ts-ignore
    setTitle(route?.params?.status == 'regist' ? '注册 & 登陆' : '重制密码 & 登陆');
  }, []);
  const [title, setTitle] = useState('');
  const [checkResult, setCheckResult] = useState({});
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const userGetVerificationCode = async () => {
    try {
      const res = await getVerificationCode({
        phoneNumber: registerParams.phoneNumber,
      });
      // TODO 按钮倒计时
      Toast.show('res is : ' + JSON.stringify(res));
    } catch (error) {
      console.error('Err: ' + error);
    }
  };
  const userRegister = async () => {
    // @ts-ignore
    if (!Object.keys(checkResult).every(result => checkResult[result] == true)) {
      Toast.show('注册信息不合法，请修改');
      return;
    }
    try {
      const res: any = await register(registerParams);
      console.log('res is : ' + JSON.stringify(res));
      if (res.success) {
        userLogin();
      }
    } catch (error) {
      console.error('Err: ' + error);
    }
  };
  const userLogin = async () => {
    try {
      const res: any = await login({
        phoneNumber: registerParams.phoneNumber,
        password: registerParams.password,
      });
      Toast.show('Request success. ' + JSON.stringify(res), {
        position: Toast.positions.CENTER,
      });
      // TODO 保存token
      console.log('login res : ' + JSON.stringify(res));
      if (res.success) {
        storage.save({
          key: 'token',
          data: res.data?.token,
        });
        navigation.replace('Root');
      }
    } catch (error) {
      console.error('Err: ' + error);
    }
  };
  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );
  const renderCaption = (props: any) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', height: pxToDp(12) }}>
        {ShowIcon({
          color: props.isOk ? '#3DE27C' : '#FF5182',
          name: props.isOk ? 'checkmark-outline' : 'alert-circle-outline',
        })}
        <Text style={{ color: '#FF5182', fontSize: pxToDp(11) }}>{!props.isOk ? props.rule : ''}</Text>
      </View>
    );
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        ...style.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: pxToDp(24),
        paddingRight: pxToDp(24),
      }}
    >
      <Image source={locked} style={style.image} />
      <Input
        placeholder="手机号码"
        placeholderTextColor={'#361D1E50'}
        // @ts-ignore
        caption={() => renderCaption({ rule: '手机号码不合法', isOk: checkResult.phoneNumber })}
        size={'large'}
        textContentType={'username'}
        returnKeyType={'next'}
        keyboardType={'number-pad'}
        onChangeText={number => {
          registerParams.phoneNumber = Number(number);
          setCheckResult(validateRegisterParams(registerParams));
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <Input
          placeholder="验证码"
          placeholderTextColor={'#361D1E50'}
          // @ts-ignore
          caption={() => renderCaption({ rule: '验证码必须为4位数字', isOk: checkResult.verificationCode })}
          size="large"
          style={{ marginTop: pxToDp(16), width: pxToDp(210) }}
          keyboardType={'number-pad'}
          textContentType={'oneTimeCode'}
          returnKeyType={'next'}
          onChangeText={code => {
            registerParams.verificationCode = Number(code);
            setCheckResult(validateRegisterParams(registerParams));
          }}
        />
        <Button
          status="info"
          size="large"
          style={{ flex: 1, marginLeft: pxToDp(5) }}
          onPress={() => userGetVerificationCode()}
        >
          {evaProps => (
            <Text {...evaProps} style={style.buttonBrownText}>
              获取验证码
            </Text>
          )}
        </Button>
      </View>
      <Input
        placeholder="新的密码"
        size={'large'}
        placeholderTextColor={'#361D1E50'}
        // @ts-ignore
        caption={() => renderCaption({ rule: '密码必须大于8位', isOk: checkResult.password })}
        accessoryRight={renderIcon}
        style={{ marginTop: pxToDp(16) }}
        secureTextEntry={secureTextEntry}
        textContentType={'newPassword'}
        returnKeyType={'next'}
        onChangeText={string => {
          registerParams.password = string;
          setCheckResult(validateRegisterParams(registerParams));
        }}
      />
      <Input
        placeholder="确认密码"
        size={'large'}
        placeholderTextColor={'#361D1E50'}
        style={{ marginTop: pxToDp(16) }}
        secureTextEntry={secureTextEntry}
        // @ts-ignore
        caption={() => renderCaption({ rule: '确认密码必须和新的密码一致', isOk: checkResult.confirmPassword })}
        accessoryRight={renderIcon}
        textContentType={'newPassword'}
        returnKeyType={'done'}
        onChangeText={string => {
          registerParams.confirmPassword = string;
          setCheckResult(validateRegisterParams(registerParams));
        }}
      />
      <Button style={{ ...style.button, marginTop: pxToDp(32) }} onPress={() => userRegister()}>
        {evaProps => (
          <Text {...evaProps} style={style.font}>
            {title}
          </Text>
        )}
      </Button>
      <StatusBar style={'auto'} />
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    // backgroundColor: themeColor.white,
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
    fontSize: pxToDp(16),
    color: '#3611d1e',
    marginTop: pxToDp(16),
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
  buttonBrownText: { fontSize: pxToDp(12), color: '#F8BC3C', fontWeight: 'bold' },
});
