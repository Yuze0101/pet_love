import { useState, useRef, useEffect, useContext } from 'react';
import {
  Input,
  Button,
  Card,
  Text,
  Icon,
  Datepicker,
  NativeDateService,
  Radio,
  RadioGroup,
  I18nConfig,
  Layout,
  Modal,
} from '@ui-kitten/components';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import storage from '../utils/storage';

import { pxToDp } from '../constants/Layout';
import Colors from '../constants/Colors';
import { UserCenterScreenProps, Pet } from '../types';
import CatIcon from '../components/CatIcon';
import DogIcon from '../components/DogIcon';
import { upload, createPet, queryDetail, editPet, deletePet } from '../api';
import { CustomTopNavigation } from '../components/CustomTopNavigation';
import { CacheImage } from '../components/CacheImage';
import { CustomModal, CustomModalStatus } from '../components/CustomModal';
import { PetContext } from '../contexts/PetContext';
import { UserContext } from '../contexts/UserContext';
import { userQueryDetailAndSaveData } from '../utils/queryDetailAndSaveData';

const { themeColor } = Colors;

const workAround = (props: any) => {
  const newObj = Object.assign({}, props);
  newObj.fill = newObj['style']['tintColor'];
  delete newObj.style.tintColor;
  return newObj;
};

const CalendarIcon = (props: any) => <Icon {...workAround(props)} name="calendar" />;

const i18n: I18nConfig = {
  dayNames: {
    short: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    long: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  monthNames: {
    short: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    long: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  },
};
const localeDateService = new NativeDateService('cn', { i18n, startDayOfWeek: 1 });

type CreatePetParam = {
  name: string;
  portraitUrl: string;
  birthday: Date;
  gender: 'MALE' | 'FEMALE';
  type: 'CAT' | 'DOG' | 'OTHER';
  weight: string;
  desc: string;
};
export default function AnimalInfoScreen({ navigation, route }: UserCenterScreenProps<'PetInfo'>) {
  const insets = useSafeAreaInsets();
  const [petState, _dispatch] = useContext(PetContext);
  const [userState, _dispatch2] = useContext(UserContext);

  const [imageUri, setImageUri] = useState();
  const [showModal, setShowModal] = useState(false);

  const nameRef = useRef(null);
  const weightRef = useRef(null);
  const descRef = useRef(null);

  // 表单
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState(0);
  const [desc, setDesc] = useState('');
  const [choosedIndex, setChoosedIndex] = useState(0);
  const [id, setId] = useState(-1);
  const [isEdit, setIsEdit] = useState(false);
  const [fileUri, setFileUri] = useState('');

  // Modal
  const [modalState, setModalState] = useState('primary');
  const [isLoading, setIsLoading] = useState(true);
  const [modalTitle, setModalTitle] = useState('确定要删除吗？');

  useEffect(() => {
    if (Number.isInteger(route.params.id)) {
      // console.log('PetInfoScreen + ' + JSON.stringify(petState) + 'route.params.id :' + route.params.id);
      console.log('userState is ' + JSON.stringify(userState));
      petState.forEach((item: Pet) => {
        if (item.id == route.params.id) {
          setId(item.id);
          setName(item.name);
          setDate(new Date(item.birthday));
          setWeight(item.weight);
          setGender(item.gender == 'MALE' ? 0 : 1);
          setDesc(item.desc);
          console.log('PetInfoScheen  : ' + item.portraitUrl);
          // @ts-ignore
          setImageUri(item.portraitUrl);
          setIsEdit(true);
        }
      });
    }
  }, []);
  type CardType = {
    type: string;
    fill: string;
  };
  const RenderCardList = (props: any) => {
    return props.list.map((item: CardType, index: number) => {
      return (
        <Card
          status={choosedIndex == index ? 'primary' : 'basic'}
          onPress={() => {
            setChoosedIndex(index);
          }}
          key={index}
          style={{ width: pxToDp(100), height: pxToDp(70) }}
        >
          <Layout
            style={{
              height: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: pxToDp(5),
            }}
          >
            {item.type != 'other' ? (
              item.type == 'cat' ? (
                <CatIcon fill={choosedIndex == index ? themeColor.orange : ''} />
              ) : (
                <DogIcon fill={choosedIndex == index ? themeColor.orange : ''} />
              )
            ) : null}
            <Text style={{ marginLeft: pxToDp(5) }}>
              {item.type != 'other' ? (item.type == 'cat' ? '猫' : '狗') : '其他'}
            </Text>
          </Layout>
        </Card>
      );
    });
  };

  const userCreatePet = async () => {
    const createPetParam = {
      name: name,
      birthday: date,
      gender: gender == 0 ? 'MALE' : 'FEMALE',
      type: choosedIndex == 0 ? 'CAT' : choosedIndex == 1 ? 'DOG' : 'OTHER',
      weight: weight,
      desc: desc,
      portraitUrl: fileUri,
    };

    // @ts-ignore
    // const canCreate = Object.keys(createPetParam).some(key => createPetParam[key] == '');
    // if (canCreate) {
    //   console.log('miss props');
    //   return;
    // }
    // console.log(`canCreate ${canCreate} , createParam : ${JSON.stringify(createPetParam)}`);
    try {
      console.log('userCreatePet : ' + JSON.stringify(createPetParam));
      const res = (await createPet(createPetParam)) as any;
      console.log(JSON.stringify(res));
      if (res.success) {
        await userQueryDetailAndSaveData()
        navigation.navigate('Main');
      }
    } catch (error) {
      console.error('createPet Err : ' + error);
    }
  };
  const userEditPet = async () => {
    const createPetParam = {
      id,
      name: name,
      birthday: date,
      gender: gender == 0 ? 'MALE' : 'FEMALE',
      type: choosedIndex == 0 ? 'CAT' : choosedIndex == 1 ? 'DOG' : 'OTHER',
      weight: weight,
      desc: desc,
      portraitUrl: fileUri,
    };

    // @ts-ignore
    // const canCreate = Object.keys(createPetParam).some(key => createPetParam[key] == '');
    // if (canCreate) {
    //   console.log('miss props');
    //   return;
    // }
    // console.log(`canCreate ${canCreate} , createParam : ${JSON.stringify(createPetParam)}`);
    try {
      console.log('userEditPet : ' + JSON.stringify(createPetParam));
      const res = (await editPet(createPetParam)) as any;
      console.log(JSON.stringify('userEditPet res: ' + JSON.stringify(res)));
      if (res.success) {
        await userQueryDetailAndSaveData()
        navigation.navigate('Main');
      }
    } catch (error) {
      console.error('createPet Err : ' + error);
    }
  };
  const modalUserDeletePet = () => {
    setModalState('danger');
    setIsLoading(false);
    setShowModal(true);
  };
  const userDeletePet = async () => {
    console.log('userDeletePet id is ' + id);
    setShowModal(true);
    try {
      const res = await deletePet({ id });
      console.log('userDeletePet res : ' + JSON.stringify(res));
      await userQueryDetailAndSaveData()
      navigation.navigate('Main');
      setShowModal(false);
    } catch (error) {
      setShowModal(false);
      console.log('userDeletePet Err : ' + error);
    }
  };

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
        }
      } catch (error) {
        console.error('upload Err : ' + error);
      }
    } else {
    }
  };

  const clickOk = () => {
    if (isEdit) {
      userEditPet();
    } else {
      userCreatePet();
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <CustomTopNavigation
          title="宠物信息"
          showLeftBack={true}
          leftAction={() => navigation.goBack()}
          showRight={isEdit}
          rightIconName={isEdit ? 'trash-2-outline' : ''}
          rightAction={() => modalUserDeletePet()}
        />
        <Layout
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
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
            label="名称"
            size={'large'}
            ref={nameRef}
            textContentType={'name'}
            value={name}
            onChangeText={name => setName(name)}
          />
          <Datepicker
            style={{ width: '100%' }}
            dateService={localeDateService}
            min={new Date(1980, 1, 1)}
            max={new Date()}
            size={'large'}
            label="生日"
            date={date}
            onFocus={() => {
              // @ts-ignore
              nameRef.current.blur();
              // @ts-ignore
              weightRef.current.blur();
              // @ts-ignore
              descRef.current.blur();
            }}
            onSelect={nextDate => {
              setDate(nextDate);
            }}
            accessoryRight={CalendarIcon}
          />
          <Layout style={{ width: '100%', flexDirection: 'row' }}>
            <Input
              // @ts-ignore
              //   caption={}
              label="体重kg"
              size={'large'}
              keyboardType={'numeric'}
              ref={weightRef}
              style={{ flex: 1, marginRight: pxToDp(20) }}
              value={weight}
              editable={false}
              textContentType={'name'}
              onChangeText={string => setWeight(string)}
            />
            <Layout style={{ flex: 1 }}>
              <Text category="label" appearance="hint">
                性别
              </Text>
              <RadioGroup
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}
                selectedIndex={gender}
                onChange={index => {
                  setGender(index);
                }}
              >
                <Radio style={{ flex: 1 }}>公</Radio>
                <Radio style={{ flex: 1 }}>母</Radio>
              </RadioGroup>
            </Layout>
          </Layout>
          <Input
            // @ts-ignore
            //   caption={}
            multiline={true}
            label="爱好/食物"
            ref={descRef}
            size={'large'}
            style={{ flex: 1, minHeight: pxToDp(64), maxHeight: pxToDp(64) }}
            caption={props => (
              <Text category="label" appearance="hint">
                {desc ? desc.length : 0}/30字
              </Text>
            )}
            textStyle={{ overflow: 'scroll' }}
            textContentType={'name'}
            value={desc}
            onChangeText={text => {
              if (text.length <= 30) {
                setDesc(text);
              }
            }}
          />
          <Layout
            style={{
              marginTop: pxToDp(20),
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* TODO 替换渲染 */}
            <RenderCardList list={[{ type: 'cat', fill: '' }, { type: 'dog', fill: '' }, { type: 'other' }]} />
          </Layout>
          <Button style={{ width: '90%', marginTop: pxToDp(25) }} onPress={() => clickOk()}>
            完成
          </Button>
        </Layout>
        <Modal backdropStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }} visible={showModal}>
          <CustomModal
            status={modalState as CustomModalStatus}
            isLoading={isLoading}
            text={modalTitle}
            showButtons={!isLoading}
            cancelAction={() => setShowModal(false)}
            confirmAction={() => {
              userDeletePet();
              setIsLoading(true);
            }}
          ></CustomModal>
        </Modal>
        <StatusBar style={'auto'} />
      </Layout>
    </TouchableWithoutFeedback>
  );
}
