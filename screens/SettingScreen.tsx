import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, Layout, Button, Input, Icon, Spinner } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserCenterScreenProps } from '../types';
import { pxToDp } from '../constants/Layout';
import Colors from '../constants/Colors';
import { queryDetail } from '../api';
const { themeColor } = Colors;
interface UserInfo {
  username: string;
  portraitUrl: string;
  token: string;
  followCount: number;
}
export default function SettingScreen({ navigation }: UserCenterScreenProps<'Setting'>) {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [haveUserInfo, setHaveUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState({} as UserInfo);
  const [havePets, setHavePets] = useState(false);
  const [petInfoList, setPetInfoList] = useState([] as any);
  const [currentIndex, setCurrentIndex] = useState(null as any);
  const getUserInfo = async () => {
    setLoading(true);
    console.log('getUserInfo');
    let res: any = await queryDetail({});
    console.log(res);
    if (res.success) {
      let userInfo: any = res.data.userInfo;
      let petInfoList: any = res.data.petInfoList;
      if (userInfo == null) {
        setHaveUserInfo(false);
      } else {
        setHaveUserInfo(true);
        setUserInfo(userInfo);
      }
      if (petInfoList == null) {
        setHavePets(false);
      } else {
        setHavePets(true);
        if (petInfoList.length > 0) {
          petInfoList = petInfoList.map((item: any, index: number) => {
            if (index === 0) {
              item.active = true;
            } else {
              item.active = false;
            }
            return item;
          });
        }
        setCurrentIndex(0);
        setPetInfoList(petInfoList);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
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
      <Layout>

      </Layout>
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
  petList: {
    marginTop: pxToDp(50),
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  petListItem: {
    width: pxToDp(72),
    height: pxToDp(72),
    borderRadius: pxToDp(36),
    backgroundColor: '#E8EAEC',
    marginRight: pxToDp(20),
  },
  petListItemSelected: {
    borderWidth: pxToDp(3),
    borderColor: themeColor.orange,
    backgroundColor: '#E8EAEC',
  },
  petInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  petInfoLeft: {
    paddingTop: pxToDp(40),
    paddingBottom: pxToDp(40),
  },
  petName: {
    fontSize: pxToDp(18),
  },
  petDesc: {
    fontSize: pxToDp(12),
  },
  petInfoItem: {
    width: pxToDp(90),
    height: pxToDp(64),
    borderWidth: pxToDp(1),
    borderColor: '#E8EAEC',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  petInfoItemTitle: {
    fontSize: pxToDp(14),
  },
  petInfoItemDesc: {
    fontSize: pxToDp(16),
  },
  petData: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingTop: pxToDp(40),
  },
  petDataItem: {
    marginRight: pxToDp(20),
  },
  petDataItemTitle: {
    fontSize: pxToDp(18),
  },
  petDataItemDesc: {
    fontSize: pxToDp(12),
  },
  cardListTitle: {
    width: '100%',
    marginTop: pxToDp(40),
    fontSize: pxToDp(20),
    textAlign: 'left',
  },
  cardList: {
    marginTop: pxToDp(20),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  cardListItem: {
    width: '50%',
  },
});
