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
import { upload, queryDetail, addCard as addPetStory } from '../api';
import * as ImagePicker from 'expo-image-picker';
import { userQueryDetailAndSaveData } from '../utils/queryDetailAndSaveData';
const { themeColor } = Colors;
export default function AddPetStory({ navigation, route }: UserCenterScreenProps<'AddPetStory'>) {
  const insets = useSafeAreaInsets();
  const linkTo = useLinkTo();
  const [imgList, setImgList] = useState([] as any);
  const contentRef = useRef(null);
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [modalState, setModalState] = useState('primary');
  const [isLoading, setIsLoading] = useState(true);
  const [modalTitle, setModalTitle] = useState('确定要删除吗？');
  const pickImage = async () => {
    console.log('clicked pickImage');
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.2,
    });
    if (!result.canceled) {
      // ImagePicker saves the taken photo to disk and returns a local URI to it
      console.log(JSON.stringify(result));
      setShowModal(true);
      const localUri = result.assets[0].uri;
      const filename = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename as string);
      const type = match ? `image/${match[1]}` : `image`;
      const formData = new FormData();
      // @ts-ignore
      formData.append('file', { uri: localUri, name: filename, type });
      console.log(`{localUri : ${localUri} , filename : ${filename} , type : ${type}}`);
      try {
        const res = (await upload(formData)) as any;
        console.log('upload res : ' + JSON.stringify(res));
        if (res.success) {
          console.log(res.data);
          let newImgList = imgList;
          newImgList.push(res.data);
          // @ts-ignore
          setImgList(newImgList);
          setShowModal(false);
        } else {
          setModalState('danger');
          setModalTitle('上传失败');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('upload Err : ' + error);
      }
    } else {
    }
  };
  const DelImg = (index: number) => {
    console.log('clicked DelImg',index);
    let newImgList = imgList;
    newImgList.splice(index, 1);
    console.log('newImgList : ' + JSON.stringify(newImgList));
    // @ts-ignore
    setImgList([...newImgList]);
  };
  const onCheckedChange = (isChecked: any) => {
    setChecked(isChecked);
  };
  const publish = async () => {
    setIsLoading(true);
    setShowModal(true);
    console.log('clicked publish');
    console.log('imgList : ' + JSON.stringify(imgList));
    console.log('content : ' + content);
    console.log('checked : ' + checked);
    const publishParam = {
      id: route.params.id,
      picList: JSON.stringify(imgList),
      content: content,
    };
    console.log('publishParam : ' + JSON.stringify(publishParam));
    try {
      const res = (await addPetStory(publishParam)) as any;
      console.log('publish res : ' + JSON.stringify(res));
      if (res.success) {
        console.log(res.data);
        setModalState('success');
        setModalTitle('发布成功');
        setIsLoading(false);
        setShowModal(true);
        userQueryDetailAndSaveData();
        setTimeout(() => {
          navigation.navigate('Main');
        }, 1000);
      } else {
        setModalState('danger');
        setModalTitle('发布失败');
        setIsLoading(false);
        setShowModal(false);
      }
    } catch (error) {
      console.error('publish Err : ' + error);
    }
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
      <CustomTopNavigation
        title={'发动态'}
        showLeftBack={true}
        leftAction={() => {
          navigation.navigate('Main');
        }}
        showRight={false}
      />
      <Layout style={styles.petList}>
        {imgList.length > 0 ? (
          <>
            {imgList.map((item: any, index: number) => {

              return (
                <Layout
                  style={{
                    ...styles.petListItem,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                  key={'petListPic' + index}
                >
                  <CacheImage source={{ uri: item }} style={{ flex: 1 }}></CacheImage>
                  <TouchableWithoutFeedback 
                  onPress={() => {
                    DelImg(index);
                  }}
                  >
                    <Layout
                      style={{
                        position: 'absolute',
                        top: pxToDp(0),
                        right: pxToDp(0),
                        width: pxToDp(30),
                        height: pxToDp(30),
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255,255,255,0.5)',
                      }}
                    >
                      <Icon
                        fill={themeColor.darkBrown}
                        style={{ width: pxToDp(20), height: pxToDp(20) }}
                        name="close-outline"
                      />
                    </Layout>
                  </TouchableWithoutFeedback>
                </Layout>
              );
            })}
          </>
        ) : (
          <></>
        )}
        <>
          {imgList.length < 3 ? (
            <>
              <TouchableWithoutFeedback
                key={'addPetInfo'}
                onPress={() => {
                  pickImage();
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
          value={content}
          onChangeText={name => setContent(name)}
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
        <Modal style={{ margin: 0 }} isVisible={showModal}>
          <CustomModal
            status={modalState as CustomModalStatus}
            isLoading={isLoading}
            text={modalTitle}
            showButtons={!isLoading}
            cancelAction={() => setShowModal(false)}
            confirmAction={() => {
              setIsLoading(true);
            }}
          ></CustomModal>
        </Modal>
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
    marginRight: pxToDp(12),
  },
  petListItemSelected: {
    borderWidth: pxToDp(3),
    borderColor: themeColor.orange,
    backgroundColor: '#E8EAEC',
  },
});
