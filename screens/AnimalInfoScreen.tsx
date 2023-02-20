import { useState } from 'react';
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
} from '@ui-kitten/components';
import { View, Image, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

import { pxToDp } from '../constants/Layout';
import Colors from '../constants/Colors';
import { RootStackScreenProps } from '../types';
import CatIcon from '../components/CatIcon';
import DogIcon from '../components/DogIcon';

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

export default function AnimalInfoScreen({ navigation }: RootStackScreenProps<'Animal'>) {
  const insets = useSafeAreaInsets();

  const [date, setDate] = useState(new Date());
  const [multilineInputText, setMultilineInputText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const pickImage = async () => {
    console.log('clicked pickImage');
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('pickImage picked Result : ' + JSON.stringify(result));

    if (!result.canceled) {
      //   setImage(result.assets[0].uri);
      console.log('pickImage canceled Result : ' + JSON.stringify(result));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'red',
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: pxToDp(24),
          paddingRight: pxToDp(24),
        }}
      >
        <View style={{ height: pxToDp(45), width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
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
          <Button appearance="ghost">完成</Button>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            borderColor: 'red',
            borderWidth: 1,
          }}
        >
          <TouchableWithoutFeedback onPress={() => pickImage()}>
            <View
              style={{
                width: pxToDp(80),
                height: pxToDp(80),
                backgroundColor: '#cccccc',
                borderRadius: pxToDp(80),
                marginBottom: pxToDp(30),
              }}
            >
              <Image></Image>
            </View>
          </TouchableWithoutFeedback>
          <Input
            // @ts-ignore
            //   caption={}
            label="名称"
            size={'large'}
            textContentType={'name'}
            onChangeText={number => {}}
          />
          <Datepicker
            style={{ width: '100%' }}
            dateService={localeDateService}
            min={new Date(1980, 1, 1)}
            max={new Date()}
            size={'large'}
            label="生日"
            date={date}
            onSelect={nextDate => setDate(nextDate)}
            accessoryRight={CalendarIcon}
          />
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <Input
              // @ts-ignore
              //   caption={}
              label="体重kg"
              size={'large'}
              style={{ flex: 1, marginRight: pxToDp(20) }}
              textContentType={'name'}
              onChangeText={number => {}}
            />
            <View style={{ flex: 1 }}>
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
                onChange={index => setSelectedIndex(index)}
              >
                <Radio style={{ flex: 1 }}>公</Radio>
                <Radio style={{ flex: 1 }}>母</Radio>
              </RadioGroup>
            </View>
          </View>
          <Input
            // @ts-ignore
            //   caption={}
            multiline={true}
            label="爱好/食物"
            size={'large'}
            style={{ flex: 1, minHeight: pxToDp(64), maxHeight: pxToDp(64) }}
            caption={props => (
              <Text category="label" appearance="hint">
                {multilineInputText.length}/200字
              </Text>
            )}
            textStyle={{ overflow: 'scroll' }}
            textContentType={'name'}
            value={multilineInputText}
            onChangeText={text => {
              if (text.length <= 200) {
                setMultilineInputText(text);
              }
            }}
          />
          <View
            style={{
              marginTop: pxToDp(20),
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* FIXME 替换渲染 */}
            <RenderCardList list={[{ type: 'cat', fill: '' }, { type: 'dog', fill: '' }, { type: 'other' }]} />
          </View>
        </View>

        <StatusBar style={'auto'} />
      </View>
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
      <Card status={choosedIndex == index ? 'primary' : 'basic'} onPress={() => setChoosedIndex(index)} key={index} style={{ width: pxToDp(100), height: pxToDp(70) }}>
        <View
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
          ) : (
            <></>
          )}
          <Text style={{ marginLeft: pxToDp(5) }}>
            {item.type != 'other' ? (item.type == 'cat' ? '猫' : '狗') : '其他'}
          </Text>
        </View>
      </Card>
    );
  });
};