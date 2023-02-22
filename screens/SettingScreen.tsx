import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, Layout, Button, Input, Icon, Spinner } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserCenterScreenProps } from '../types';
import { pxToDp } from '../constants/Layout';
import Colors from '../constants/Colors';
import storage from '../utils/storage';
import { useLinkTo } from '@react-navigation/native';
const { themeColor } = Colors;
interface UserInfo {
  username: string;
  portraitUrl: string;
  token: string;
  followCount: number;
}
export default function SettingScreen({ navigation }: UserCenterScreenProps<'Setting'>) {
  const insets = useSafeAreaInsets();
  const linkTo = useLinkTo();
  const [userInfo, setUserInfo] = useState({} as UserInfo);
  const getUserInfo = async () => {
    await storage
      .load({
        key: 'userData',
      })
      .then(value => {
        setUserInfo(value);
      })
      .catch(error => {
        console.log('Err: ' + error);
      });
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  const logOut = async () => {
    await storage.remove({
      key: 'userData',
    });
    await storage.remove({
      key: 'petData',
    });
    await storage.remove({
      key: 'userInfo',
    });
    linkTo('/welcome');
  };
  return (
    <Layout
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: pxToDp(24),
        paddingRight: pxToDp(24),
      }}
    >
      <Layout style={{ height: pxToDp(45), width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
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
          onPress={() => navigation.goBack()}
        />
      </Layout>
      <Layout style={styles.topInfo}>
        <Layout style={styles.topInfoLeft}>
          <Image resizeMode="cover" source={{ uri: userInfo.portraitUrl }} style={styles.topInfoLeftImg} />
          <Text style={styles.topInfoLeftName}>{userInfo.username}</Text>
        </Layout>
        <Layout style={styles.topInfoRight}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('EditUser')}>
            <Image source={require('../assets/images/edit.png')} style={styles.topInfoRightIcon} />
          </TouchableWithoutFeedback>
        </Layout>
      </Layout>
      <Layout
        style={{
          ...styles.SettingListItem,
          marginTop: pxToDp(20),
        }}
      >
        <Text style={styles.SettingListItemTitle}>用户协议</Text>
        <Text style={styles.SettingListItemRight}>{'>'}</Text>
      </Layout>
      <Layout style={styles.SettingListItem}>
        <Text style={styles.SettingListItemTitle}>隐私政策</Text>
        <Text style={styles.SettingListItemRight}>{'>'}</Text>
      </Layout>
      <Layout style={styles.SettingListItem}>
        <Text style={styles.SettingListItemTitle}>注销账号</Text>
        <Text style={styles.SettingListItemRight}>{'>'}</Text>
      </Layout>
      <TouchableWithoutFeedback
        onPress={() => {
          logOut();
        }}
      >
        <Layout style={styles.SettingListItem}>
          <Text style={styles.SettingListItemTitle}>退出登录</Text>
          <Text style={styles.SettingListItemRight}>{'>'}</Text>
        </Layout>
      </TouchableWithoutFeedback>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: pxToDp(24),
    paddingRight: pxToDp(24),
  },
  topInfo: {
    height: pxToDp(70),
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: pxToDp(20),
  },
  topInfoLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topInfoLeftImg: {
    width: pxToDp(50),
    height: pxToDp(50),
    borderRadius: pxToDp(25),
    backgroundColor: '#E8EAEC',
  },
  topInfoLeftName: {
    marginLeft: pxToDp(10),
    fontSize: pxToDp(18),
    fontWeight: '400',
    color: '#361D1E',
  },
  topInfoRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  topInfoRightIcon: {
    marginLeft: pxToDp(20),
    width: pxToDp(20),
    height: pxToDp(20),
  },
  SettingListItem: {
    width: '100%',
    height: pxToDp(50),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: pxToDp(1),
    borderTopColor: '#E8EAEC',
  },
  SettingListItemTitle: {},
  SettingListItemRight: {},
});
