import { useState, useEffect } from 'react';
import {
  View,
  Image,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-root-toast';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, Input, Icon, Spinner } from '@ui-kitten/components';

import storage from '../utils/storage';
import { RootStackScreenProps } from '../types';
import Colors from '../constants/Colors';
import { pxToDp } from '../constants/Layout';
import { login, register, getVerificationCode } from '../api';
const locked = require('../assets/images/locked.png');
const { themeColor } = Colors;
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
const renderCaption = (props: any) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', height: pxToDp(13) }}>
      {ShowIcon({
        color: props.isOk ? '#3DE27C' : '#FF5182',
        name: props.isOk ? 'checkmark-outline' : 'alert-circle-outline',
      })}
      <Text style={{ color: '#FF5182', fontSize: pxToDp(11) }}>{!props.isOk ? props.rule : ''}</Text>
    </View>
  );
};
const validateRegisterParams = (registerParams: RegisterParams) => {
  const result = {
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
        isOk = value.length >= 8;
        break;
      case 'confirmPassword':
        isOk = registerParams[key] == registerParams.password && value.length >= 8;
        break;
      default:
        break;
    }
    //@ts-ignore
    result[key] = isOk;
  }
  return result;
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
    setRegisterButtonText(route?.params?.status == 'regist' ? '注册 & 登陆' : '重制密码 & 登陆');
  }, []);
  const [registerButtonText, setRegisterButtonText] = useState('');
  const [checkResult, setCheckResult] = useState({
    phoneNumber: false,
    verificationCode: false,
    password: false,
    confirmPassword: false,
  });
  const [verificationButtonText, setVerificationButtonText] = useState('获取验证码');
  const [verificationButtonStatus, setVerificationButtonStatus] = useState(false);
  const [verificationButtonIsloading, setVerificationButtonIsloading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const userGetVerificationCode = async () => {
    // @ts-ignore
    if (!checkResult.phoneNumber) {
      Toast.show('请输入正确的手机号', { position: Toast.positions.CENTER });
      return;
    }
    if (verificationButtonStatus) return;
    setVerificationButtonStatus(true);
    setVerificationButtonIsloading(true);

    try {
      const res = await getVerificationCode({
        phoneNumber: registerParams.phoneNumber,
      });
      setVerificationButtonIsloading(false);
      let count = 0;
      let timer = setInterval(() => {
        if (count < 60) {
          count++;
          setVerificationButtonText(String(60 - count));
        } else {
          setVerificationButtonText('获取验证码');
          setVerificationButtonStatus(false);
          clearInterval(timer);
        }
      }, 1000);
      Toast.show('res is : ' + JSON.stringify(res));
    } catch (error) {
      console.error('Err: ' + error);
    }
  };
  const userRegister = async () => {
    // @ts-ignore
    if (Object.keys(checkResult).some(result => checkResult[result] != true)) {
      Toast.show('注册信息不合法，请修改', {
        position: Toast.positions.CENTER,
      });
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
  const workAround = (props: any) => {
    const newObj = Object.assign({}, props);
    newObj.fill = newObj['style']['tintColor'];
    delete newObj.style.tintColor;
    return newObj;
  };
  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...workAround(props)} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          ...style.container,
          paddingTop: pxToDp(24),
          // paddingBottom: insets.bottom,
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            disabled={verificationButtonStatus}
            status="info"
            size="large"
            style={{ flex: 1, marginLeft: pxToDp(5), marginTop: pxToDp(3) }}
            onPress={() => userGetVerificationCode()}
          >
            {evaProps =>
              verificationButtonIsloading ? (
                <Spinner />
              ) : (
                <Text {...evaProps} style={verificationButtonStatus ? style.greyText : style.brownText}>
                  {verificationButtonText}
                </Text>
              )
            }
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
              {registerButtonText}
            </Text>
          )}
        </Button>
        <StatusBar style={'auto'} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: themeColor.white,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: pxToDp(64),
    height: pxToDp(80),
    // marginTop: pxToDp(20),
    marginBottom: pxToDp(40),
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
  brownText: { fontSize: pxToDp(12), color: '#F8BC3C', fontWeight: 'bold' },
  greyText: { fontSize: pxToDp(12), color: '#666666', fontWeight: 'bold' },
});
