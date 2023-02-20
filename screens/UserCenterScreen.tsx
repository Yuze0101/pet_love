import { StyleSheet, View, Image } from 'react-native';
import { Text, Layout, Button, Input, Icon, Spinner } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootTabScreenProps } from '../types';
import { pxToDp } from '../constants/Layout';
import Colors from '../constants/Colors';
const { themeColor } = Colors;

export default function UserCenterScreen({ navigation }: RootTabScreenProps<'TabFour'>) {
  const insets = useSafeAreaInsets();
  return (
    <Layout
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View style={styles.topInfo}>
        <View style={styles.topInfoLeft}>
          {false ? (
            <>
              <Image style={styles.topInfoLeftImg} />
            </>
          ) : (
            <>
              <View style={styles.topInfoLeftImg}></View>
            </>
          )}
          <Text style={styles.topInfoLeftName}>{'主人名称'}</Text>
        </View>
        <View style={styles.topInfoRight}>
          <Button>{'新增宠物'}</Button>
          <Image source={require('../assets/images/setting.png')} style={styles.topInfoRightIcon} />
        </View>
      </View>
      <View style={styles.petList}>
        <Image style={true ? { ...styles.petListItemSelected, ...styles.petListItem } : { ...styles.petListItem }} />
        <Image style={false ? { ...styles.petListItemSelected, ...styles.petListItem } : { ...styles.petListItem }} />
      </View>
      <View style={styles.petInfo}>
        <View style={styles.petInfoLeft}>
          <Text style={styles.petName}>{'宠物名称'}</Text>
          <Text style={styles.petDesc}>{'爱好/食物'}</Text>
        </View>
        <Image source={require('../assets/images/edit.png')} />
      </View>
      <View style={styles.petInfo}>
        <View style={styles.petInfoItem}>
          <Text style={styles.petInfoItemTitle}>{'年龄'}</Text>
          <Text style={styles.petInfoItemDesc}>{'1'}</Text>
        </View>
        <View style={styles.petInfoItem}>
          <Text style={styles.petInfoItemTitle}>{'性别'}</Text>
          <Text style={styles.petInfoItemDesc}>{'公'}</Text>
        </View>
        <View style={styles.petInfoItem}>
          <Text style={styles.petInfoItemTitle}>{'体重(kg)'}</Text>
          <Text style={styles.petInfoItemDesc}>{'3.6'}</Text>
        </View>
      </View>
      <View style={styles.petData}>
        <View style={styles.petDataItem}>
          <Text style={styles.petDataItemTitle}>{'65'}</Text>
          <Text style={styles.petDataItemDesc}>{'动态'}</Text>
        </View>
        <View style={styles.petDataItem}>
          <Text style={styles.petDataItemTitle}>{'165'}</Text>
          <Text style={styles.petDataItemDesc}>{'关注'}</Text>
        </View>
        <View style={styles.petDataItem}>
          <Text style={styles.petDataItemTitle}>{'1K'}</Text>
          <Text style={styles.petDataItemDesc}>{'粉丝'}</Text>
        </View>
      </View>
      <Text style={styles.cardListTitle}>{'动态'}</Text>
      <View style={styles.cardList}>
        <View style={styles.cardListItem}></View>
      </View>
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
