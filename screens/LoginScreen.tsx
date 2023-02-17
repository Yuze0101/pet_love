import { useState } from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Toast from 'react-native-root-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLinkTo } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, Input, Icon, Spinner } from '@ui-kitten/components';

// import Button from '../components/Button';
import Colors from '../constants/Colors';
import { pxToDp } from '../constants/Layout';
import { login } from '../api';
import { RootStackScreenProps } from '../types';
import storage from '../utils/storage';

const icon = require('../assets/images/icon.png');
const { themeColor } = Colors;

type LoginParams = {
  phoneNumber: string;
  password: string;
};

const userLoginParams: LoginParams = {
  phoneNumber: '',
  password: '',
};

const validateLoginParams = (loginParams: LoginParams) => {
  const result = {
    phoneNumber: false,
    password: false,
  };
  let isOk = false;
  for (const key in loginParams) {
    //@ts-ignore
    let value = loginParams[key];
    switch (key) {
      case 'phoneNumber':
        // 手机号验证
        isOk = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(value);
        break;
      case 'password':
        isOk = value.length >= 8;
        break;
      default:
        break;
    }
    //@ts-ignore
    result[key] = isOk;
  }
  return result;
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
export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
  const insets = useSafeAreaInsets();
  const linkTo = useLinkTo();

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loginButtonIsLoading, setLoginButtonIsLoading] = useState(false);
  const [checkResult, setCheckResult] = useState({
    phoneNumber: false,
    password: false,
  });
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
  const userLogin = async () => {
    if (loginButtonIsLoading) return;
    setLoginButtonIsLoading(true);
    try {
      const res: any = await login(userLoginParams);
      setLoginButtonIsLoading(false);
      Toast.show('Request success. ' + JSON.stringify(res), {
        position: Toast.positions.CENTER,
      });
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
  return (
    <View
      style={{
        ...style.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: pxToDp(24),
        paddingRight: pxToDp(24),
      }}
    >
      <View style={{ height: pxToDp(45), width: '100%', flexDirection: 'row' }}>
          <Button
            // appearance="outline"
            status="basic"
            accessoryRight={() => {
              return (
                <Icon
                  fill={themeColor.orange}
                  style={{ width: pxToDp(18), height: pxToDp(18) }}
                  name="arrow-back-outline"
                />
              );
            }}
            style={{
              width: pxToDp(45),
              borderRadius: pxToDp(45),
            }}
            onPress={()=> navigation.goBack()}
          />
        </View>
      <Image source={icon} style={style.image} />
      <View>
        <Input
          placeholder="手机号码"
          placeholderTextColor={'#361D1E50'}
          // @ts-ignore
          caption={() => renderCaption({ rule: '手机号码不合法', isOk: checkResult.phoneNumber })}
          size={'large'}
          textContentType={'username'}
          returnKeyType={'next'}
          keyboardType={'number-pad'}
          onChangeText={phoneNumber => {
            userLoginParams.phoneNumber = phoneNumber;
            setCheckResult(validateLoginParams(userLoginParams));
          }}
        />
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
          onChangeText={password => {
            userLoginParams.password = password;
            setCheckResult(validateLoginParams(userLoginParams));
          }}
        />
        <Button style={{ ...style.button, marginTop: pxToDp(32) }} onPress={() => userLogin()}>
          {evaProps => (
            <Text {...evaProps} style={style.font}>
              {loginButtonIsLoading ? <Spinner status="control" /> : '登陆'}
            </Text>
          )}
        </Button>
        <Button
          appearance="ghost"
          style={{ ...style.button, marginTop: pxToDp(32) }}
          onPress={() => linkTo('/register/resetPassword')}
        >
          {evaProps => <Text {...evaProps}>忘记密码</Text>}
        </Button>
      </View>
      <StatusBar style={'auto'} />
    </View>
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
    width: pxToDp(125),
    height: pxToDp(125),
    marginBottom: pxToDp(32),
  },
  input: {
    width: pxToDp(327),
    height: pxToDp(46),
    borderBottomColor: '#bbbbbb',
    borderBottomWidth: pxToDp(1),
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
});
