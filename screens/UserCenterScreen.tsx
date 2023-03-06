import { StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { useEffect, useState, useContext, useCallback } from 'react';
import { Text, Layout, Button, Divider, Input, Icon, Card, Spinner, IconProps } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useFocusEffect } from '@react-navigation/native';

import { UserCenterScreenProps } from '../types';
import { pxToDp } from '../constants/Layout';
import Colors from '../constants/Colors';
import { queryDetail } from '../api';
import storage from '../utils/storage';
import { CustomTopNavigation } from '../components/CustomTopNavigation';
import { PetContext } from '../contexts/PetContext';
import { UserContext } from '../contexts/UserContext';
import { CacheImage } from '../components/CacheImage';
const { themeColor } = Colors;
interface UserInfo {
  username: string;
  portraitUrl: string;
  token: string;
  followCount: number;
}

export default function UserCenterScreen({ navigation }: UserCenterScreenProps<'Main'>) {
  const insets = useSafeAreaInsets();
  const [userInfo, userInfoDispatch] = useContext(UserContext);
  const [petInfoList, petInfoDispatch] = useContext(PetContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    navigation.addListener('focus', () => {
      userInfoDispatch({
        type: 'GET_USER_INFO',
      });
      petInfoDispatch({
        type: 'GET_PET_INFO',
      });
      console.log('navigation , focus');
    });
    // console.log('UserCenterScreen userInfo is ' + JSON.stringify(userInfo));
    // console.log('UserCenterScreen petInfoList is ' + JSON.stringify(petInfoList));
    // getUserInfo();
  }, [navigation]);
  return (
    <Layout
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <CustomTopNavigation
        title={userInfo.username}
        showRight={true}
        rightIconName="settings-outline"
        rightAction={() => {
          navigation.navigate('Setting');
        }}
      />

      <Layout style={{ paddingLeft: pxToDp(24), paddingRight: pxToDp(24) }}>
        <Layout style={styles.petList}>
          {petInfoList != null && petInfoList.length > 0 ? (
            <>
              {petInfoList.map((item: any, index: number) => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => {
                      setCurrentIndex(index);
                    }}
                  >
                    <Layout
                      key={index}
                      style={
                        currentIndex == index
                          ? { ...styles.petListItemSelected, ...styles.petListItem, overflow: 'hidden' }
                          : { ...styles.petListItem, overflow: 'hidden' }
                      }
                    >
                      {item.portraitUrl ? (
                        <CacheImage source={{ uri: item.portraitUrl }} style={{ flex: 1 }}></CacheImage>
                      ) : (
                        <></>
                      )}
                    </Layout>
                  </TouchableWithoutFeedback>
                );
              })}
              <>
                {petInfoList.length < 3 ? (
                  <>
                    <TouchableWithoutFeedback
                      key={'addPetInfo'}
                      onPress={() => {
                        navigation.navigate('PetInfo', { id: undefined });
                        // navigation.navigate('Setting');
                      }}
                    >
                      <Layout
                        style={{
                          ...styles.petListItem,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Icon
                          fill={themeColor.darkBrown}
                          style={{ width: pxToDp(20), height: pxToDp(20) }}
                          name="plus-outline"
                        />
                      </Layout>
                    </TouchableWithoutFeedback>
                  </>
                ) : (
                  <></>
                )}
              </>
            </>
          ) : (
            <>
              <TouchableWithoutFeedback
                key={'addPetInfo'}
                onPress={() => {
                  navigation.navigate('PetInfo', { id: undefined });
                  // navigation.navigate('Setting');
                }}
              >
                <Layout
                  style={{
                    ...styles.petListItem,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon
                    fill={themeColor.darkBrown}
                    style={{ width: pxToDp(20), height: pxToDp(20) }}
                    name="plus-outline"
                  />
                </Layout>
              </TouchableWithoutFeedback>
            </>
          )}
        </Layout>
        {petInfoList.length > 0 ? (
          <>
            <Layout style={styles.petInfo}>
              <Layout style={styles.petInfoLeft}>
                <Text category="h2">
                  {petInfoList[currentIndex]?.name ? petInfoList[currentIndex]?.name : '未命名'}
                </Text>
                <Text category="s1">
                  {petInfoList[currentIndex]?.desc ? petInfoList[currentIndex]?.desc : '无描述信息'}
                </Text>
              </Layout>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('PetInfo', { id: petInfoList[currentIndex]?.id });
                }}
              >
                <Icon
                  fill={themeColor.darkBrown}
                  style={{ width: pxToDp(20), height: pxToDp(20) }}
                  name="edit-2-outline"
                />
              </TouchableWithoutFeedback>
            </Layout>
            <Layout style={styles.petInfo}>
              <Layout style={styles.petInfoItem}>
                <Text style={styles.petInfoItemTitle}>{'年龄'}</Text>
                <Text style={styles.petInfoItemDesc}>{petInfoList[currentIndex]?.age}</Text>
              </Layout>
              <Layout style={styles.petInfoItem}>
                <Text style={styles.petInfoItemTitle}>{'性别'}</Text>
                <Text style={styles.petInfoItemDesc}>{petInfoList[currentIndex]?.gender == 'MALE' ? '公' : '母'}</Text>
              </Layout>
              <Layout style={styles.petInfoItem}>
                <Text style={styles.petInfoItemTitle}>{'体重(kg)'}</Text>
                <Text style={styles.petInfoItemDesc}>{petInfoList[currentIndex]?.weight}</Text>
              </Layout>
            </Layout>
          </>
        ) : (
          <></>
        )}

        <Layout style={styles.petData}>
          <Layout style={styles.petDataItem}>
            <Text style={styles.petDataItemTitle}>
              {petInfoList.length > 0 ? petInfoList[currentIndex]?.cardCount : 0}
            </Text>
            <Text style={styles.petDataItemDesc}>{'动态'}</Text>
          </Layout>
          <Layout style={styles.petDataItem}>
            <Text style={styles.petDataItemTitle}>
              {petInfoList.length > 0 ? petInfoList[currentIndex]?.fansCount : 0}
            </Text>
            <Text style={styles.petDataItemDesc}>{'关注'}</Text>
          </Layout>
          <Layout style={styles.petDataItem}>
            <Text style={styles.petDataItemTitle}>
              {petInfoList.length > 0 ? petInfoList[currentIndex]?.fansCount : 0}
            </Text>
            <Text style={styles.petDataItemDesc}>{'粉丝'}</Text>
          </Layout>
        </Layout>
        {petInfoList.length > 0 ? (
          <>
            <Text style={styles.cardListTitle}>{'动态'}</Text>
            <Layout style={styles.cardList}>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('AddPetStory', { id: petInfoList[currentIndex]?.id });
                }}
              >
                <Layout
                  style={{
                    width: pxToDp(142),
                    height: pxToDp(178),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    borderWidth: pxToDp(1),
                    borderStyle: 'dashed',
                    borderColor: themeColor.lightBrown,
                    borderRadius: pxToDp(5),
                  }}
                >
                  <Icon
                    fill={themeColor.darkBrown}
                    style={{ width: pxToDp(20), height: pxToDp(20) }}
                    name="plus-outline"
                  />
                  <Text>{'记录此刻'}</Text>
                </Layout>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback>
                <Layout
                  style={{
                    width: pxToDp(142),
                    height: pxToDp(178),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    borderRadius: pxToDp(5),
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    source={require('../assets/images/cat.jpg')}
                    style={{ width: pxToDp(142), height: pxToDp(178), opacity: 0.5 }}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      top: pxToDp(90),
                      color: '#fff',
                    }}
                  >
                    {'它的故事'}
                  </Text>
                </Layout>
              </TouchableWithoutFeedback>
            </Layout>
          </>
        ) : (
          <></>
        )}
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  petList: {
    paddingTop: pxToDp(24),
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
    marginBottom: pxToDp(10),
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
    justifyContent: 'space-between',
  },
});
