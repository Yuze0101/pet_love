import { Card, Text, Spinner, Layout, Button } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { pxToDp } from '../constants/Layout';

type CustomModalProps = {
  status: CustomModalStatus;
  isLoading?: boolean;
  text: string;
  showButtons?: boolean;
  cancelAction?: Function;
  confirmAction?: Function;
};
export type CustomModalStatus = 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control';

export const CustomModal = (props: CustomModalProps) => {
  const insets = useSafeAreaInsets();
  const footer = () => {
    return props.showButtons ? (
      <Layout
        style={{
          paddingLeft: pxToDp(24),
          paddingRight: pxToDp(24),
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        {props.cancelAction ? (
          <Button
            style={{
              width: pxToDp(120),
            }}
            status="primary"
            onPress={() => {
              if (props.cancelAction) props.cancelAction();
            }}
          >
            <Text>取消</Text>
          </Button>
        ) : null}
        {props.confirmAction ? (
          <Button
            style={{
              width: pxToDp(120),
            }}
            status="danger"
            onPress={() => {
              if (props.confirmAction) props.confirmAction();
            }}
          >
            <Text>确定</Text>
          </Button>
        ) : null}
      </Layout>
    ) : (
      <></>
    );
  };
  return (
    <Layout
      style={{
        width: '100%',
        position: 'absolute',
        bottom: 0,
        paddingBottom: insets.bottom,
      }}
    >
      <Card
        style={{
          width: '100%',
        }}
        status={props.status}
        footer={() => footer()}
      >
        {props.isLoading ? (
          <Layout style={{ alignItems: 'center' }}>
            <Spinner size="large" />
            <Text>Loadding...</Text>
          </Layout>
        ) : (
          <Text>{props.text}</Text>
        )}
      </Card>
    </Layout>
  );
};
