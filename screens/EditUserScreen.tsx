import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { useState, useRef, useEffect, useContext } from 'react';
import { Text, Layout, Button, Input, Icon, Spinner } from '@ui-kitten/components';
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
import { updateUserInfo,upload, createPet, queryDetail, editPet, deletePet } from '../api';
import * as ImagePicker from 'expo-image-picker';
import { userQueryDetailAndSaveData } from '../utils/queryDetailAndSaveData';
export default function EditUserScreen({ navigation }: UserCenterScreenProps<'EditUser'>) {
  const insets = useSafeAreaInsets();
  const linkTo = useLinkTo();
  const [userState, _dispatch2] = useContext(UserContext);
  const [imageUri, setImageUri] = useState();
  const [showModal, setShowModal] = useState(false);
  const [fileUri, setFileUri] = useState('');
  const nameRef = useRef(null);
  const [name, setName] = useState('');
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
          setFileUri(res.data);
          // @ts-ignore
          setImageUri(localUri);
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
  const userEdit = async () => {
    const editUserParam = {
      username: name,
      portraitUrl: fileUri,
    };
    try {
      console.log('userEdit : ' + JSON.stringify(editUserParam));
      const res = (await updateUserInfo(editUserParam)) as any;
      console.log(JSON.stringify('userEdit res: ' + JSON.stringify(res)));
      if (res.success) {
        await userQueryDetailAndSaveData();
        navigation.navigate('Setting');
      }
    } catch (error) {
      console.error('createPet Err : ' + error);
    }
  };
  useEffect(() => {
    console.log('userState is ' + JSON.stringify(userState));
    setName(userState.username);
    setImageUri(userState.portraitUrl);
  },[]);
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
        title={'编辑'}
        showLeftBack={true}
        leftAction={() => {
          navigation.navigate('Setting');
        }}
        showRight={false}
      />
      <Layout
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: pxToDp(24),
          paddingRight: pxToDp(24),
        }}
      >
        <TouchableWithoutFeedback onPress={() => pickImage()}>
          <Layout
            style={{
              width: pxToDp(80),
              height: pxToDp(80),
              backgroundColor: '#cccccc',
              borderRadius: pxToDp(80),
              marginBottom: pxToDp(30),
              overflow: 'hidden',
            }}
          >
            {imageUri ? <CacheImage source={{ uri: imageUri }} style={{ flex: 1 }}></CacheImage> : null}
          </Layout>
        </TouchableWithoutFeedback>
        <Input
          // @ts-ignore
          //   caption={}
          label="用户名"
          size={'large'}
          ref={nameRef}
          textContentType={'name'}
          value={name}
          onChangeText={name => setName(name)}
        />
        <Button style={{ width: '90%', marginTop: pxToDp(50) }} onPress={() => userEdit()}>
          保存
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
