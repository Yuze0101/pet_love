import { Text, ViewStyle, TextStyle, Pressable, PressableProps } from 'react-native';
interface Props extends PressableProps {
  title?: string;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
}
export default function Button(props: Props) {
  const { onPress, title, viewStyle, textStyle } = props;
  return (
    <Pressable onPress={onPress} style={viewStyle}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
}
