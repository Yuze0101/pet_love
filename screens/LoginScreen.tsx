import { View, TextInput, Image, Platform, StyleSheet } from 'react-native';
import Toast from 'react-native-root-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import { pxToDp } from '../constants/Layout';
import { login } from '../api';

const icon = require('../assets/images/icon.png');
const { themeColor } = Colors;
type LoginParams = {
  phoneNumber: string;
  password: string;
};

export default function LoginScreen() {
  const insets = useSafeAreaInsets();

  const userLoginParams: LoginParams = {
    phoneNumber: '',
    password: '',
  };

  const userLogin = async () => {
    try {
      const res = await login(userLoginParams);
      Toast.show('Request success. ' + JSON.stringify(res));
      console.log('login res : ' + JSON.stringify(res));
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
