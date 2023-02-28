import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { useState, useRef, useEffect, useContext } from 'react';
import { Toggle, Text, Layout, Button, Input, Icon, Spinner } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserCenterScreenProps } from '../types';
import { pxToDp } from '../constants/Layout';
import Colors from '../constants/Colors';
import storage from '../utils/storage';
import { useLinkTo } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';
import { CacheImage } from '../components/CacheImage';
import Modal from 'react-native-modal';
import { CustomModal, CustomModalStatus } from '../components/CustomModal';
import { CustomTopNavigation } from '../components/CustomTopNavigation';
import { updateUserInfo, upload, createPet, queryDetail, editPet, deletePet } from '../api';
import * as ImagePicker from 'expo-image-picker';
import { userQueryDetailAndSaveData } from '../utils/queryDetailAndSaveData';
const { themeColor } = Colors;
export default function AddPetStory({ navigation }: UserCenterScreenProps<'AddPetStory'>) {
  const insets = useSafeAreaInsets();
  const linkTo = useLinkTo();
  const [imgList, setImgList] = useState([]);
  const contentRef = useRef(null);
  const [name, setName] = useState('');
  const [checked, setChecked] = useState(false);

  const onCheckedChange = (isChecked: any) => {
    setChecked(isChecked);
  };
  const publish = async () => {};
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
      <CustomTopNavigation
        title={'发动态'}
        showLeftBack={true}
        leftAction={() => {
          navigation.navigate('Main');
        }}
        showRight={false}
      />
      <Layout>
        <>
          {imgList.length < 3 ? (
            <>
              <TouchableWithoutFeedback key={'addPetInfo'} onPress={() => {}}>
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
      </Layout>
      <Layout style={{ marginTop: pxToDp(24) }}>
        <Input
          multiline={true}
          textStyle={{ minHeight: pxToDp(100) }}
          placeholder="它在做什么呢？"
          label="宠物故事"
          size={'large'}
          ref={contentRef}
          textContentType={'none'}
          value={name}
          onChangeText={name => setName(name)}
        />
      </Layout>
      <Layout
        style={{
          marginTop: pxToDp(24),
          borderTopWidth: pxToDp(1),
          borderTopColor: themeColor.lightBrown,
          paddingTop: pxToDp(24),
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text>{'公开'}</Text>
        <Toggle checked={checked} onChange={onCheckedChange}></Toggle>
      </Layout>
      <Layout
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: pxToDp(24),
          paddingRight: pxToDp(24),
        }}
      >
        <Button style={{ width: '90%', marginTop: pxToDp(50) }} onPress={() => publish()}>
          {'发布'}
        </Button>
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
    width: pxToDp(100),
    height: pxToDp(100),
    backgroundColor: '#E8EAEC',
    marginRight: pxToDp(20),
  },
  petListItemSelected: {
    borderWidth: pxToDp(3),
    borderColor: themeColor.orange,
    backgroundColor: '#E8EAEC',
  },
});
