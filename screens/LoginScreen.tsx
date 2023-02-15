import { View, TextInput, Image, Platform, StyleSheet } from 'react-native';
import Toast from 'react-native-root-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLinkTo } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Button from '../components/Button';
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

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
  const insets = useSafeAreaInsets();
  const linkTo = useLinkTo();

  const userLoginParams: LoginParams = {
    phoneNumber: '',
    password: '',
  };

  const userLogin = async () => {
    try {
      const res: any = await login(userLoginParams);
      Toast.show('Request success. ' + JSON.stringify(res), {
        position: Toast.positions.CENTER,
      });
      // TODO 保存token
      console.log('login res : ' + JSON.stringify(res));
      if (res.success) {
        storage.save({
          key: 'token',
          data: res.data,
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
          keyboardType={'number-pad'}
          onChangeText={phoneNumber => {
            userLoginParams.phoneNumber = phoneNumber;
          }}
        />
        <TextInput
          placeholder="密码"
          placeholderTextColor={'#361D1E50'}
          style={style.input}
          secureTextEntry={true}
          textContentType={'password'}
          returnKeyType={'done'}
          onChangeText={password => {
            userLoginParams.password = password;
          }}
        />
        <Button
          title="登陆"
          viewStyle={{ ...style.buttonView, marginTop: pxToDp(32) }}
          textStyle={style.buttonText}
          onPress={() => userLogin()}
        />
        <Button
          title="忘记密码"
          viewStyle={{
            width: pxToDp(327),
            height: pxToDp(20),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: pxToDp(32),
          }}
          textStyle={{ fontSize: pxToDp(14), color: '#9c9494' }}
          onPress={() => linkTo('/register/resetPassword')}
        />
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
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
  buttonView: {
    width: pxToDp(327),
    height: pxToDp(48),
    backgroundColor: themeColor.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: pxToDp(3),
  },
  buttonText: {
    color: '#fff',
    fontSize: pxToDp(18),
  },
});
