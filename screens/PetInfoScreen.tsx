import { useState, useRef } from 'react';
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
} from '@ui-kitten/components';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

import { pxToDp } from '../constants/Layout';
import Colors from '../constants/Colors';
import { UserCenterScreenProps } from '../types';
import CatIcon from '../components/CatIcon';
import DogIcon from '../components/DogIcon';
import { upload, createPet } from '../api';
import { CustomTopNavigation } from '../components/CustomTopNavigation';
import { CacheImage } from '../components/CacheImage';

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
  age: number;
  birthday: Date;
  gender: 'MALE' | 'FEMALE';
  type: 'CAT' | 'DOG' | 'OTHER';
  weight: string;
  desc: string;
};
export default function AnimalInfoScreen({ navigation }: UserCenterScreenProps<'PetInfo'>) {
  const insets = useSafeAreaInsets();

  const [date, setDate] = useState(new Date());
  const [multilineInputText, setMultilineInputText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageUri, setImageUri] = useState('');

  const nameRef = useRef(null);
  const weightRef = useRef(null);
  const descRef = useRef(null);

  const createPetParam: any = {};

  const userCreatePet = async () => {
    try {
      const res = await createPet(createPetParam);
      console.log(JSON.stringify(res));
    } catch (error) {
      console.error('Err : ' + error);
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
          setImageUri(res.data);
        }
      } catch (error) {
        console.error('Err : ' + error);
      }
    } else {
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
        <CustomTopNavigation title="宠物信息" action={() => navigation.goBack()} />
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
              {imageUri ? (
                <CacheImage
                  source={{ uri: imageUri }}
                  style={{ flex: 1 }}
                ></CacheImage>
              ) : null}
            </Layout>
          </TouchableWithoutFeedback>
          <Input
            // @ts-ignore
            //   caption={}
            label="名称"
            size={'large'}
            ref={nameRef}
            textContentType={'name'}
            onChangeText={name => (createPetParam.name = name)}
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
              createPetParam.birthday = nextDate;
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
              textContentType={'name'}
              onChangeText={number => (createPetParam.weight = String(number) + 'kg')}
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
                selectedIndex={selectedIndex}
                onChange={index => {
                  setSelectedIndex(index);
                  createPetParam.gender = index == 0 ? 'MALE' : 'FEMALE';
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
                {multilineInputText.length}/30字
              </Text>
            )}
            textStyle={{ overflow: 'scroll' }}
            textContentType={'name'}
            value={multilineInputText}
            onChangeText={text => {
              if (text.length <= 30) {
                setMultilineInputText(text);
                createPetParam.desc = text;
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
          <Button style={{ width: '90%', marginTop: pxToDp(25) }} onPress={() => userCreatePet()}>
            完成
          </Button>
        </Layout>

        <StatusBar style={'auto'} />
      </Layout>
    </TouchableWithoutFeedback>
  );
}

type CardType = {
  type: string;
  fill: string;
};
const RenderCardList = (props: any) => {
  const [choosedIndex, setChoosedIndex] = useState(0);
  return props.list.map((item: CardType, index: number) => {
    return (
      <Card
        status={choosedIndex == index ? 'primary' : 'basic'}
        onPress={() => setChoosedIndex(index)}
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
