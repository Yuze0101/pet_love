import { Card, Text, Spinner, Layout, Button } from '@ui-kitten/components';
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
  const footer = () => {
    return props.showButtons ? (
      <Layout>
        {props.cancelAction ? (
          <Button
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
    <Card status={props.status} footer={() => footer()}>
      {props.isLoading ? (
        <Layout style={{ alignItems: 'center' }}>
          <Spinner size="large" />
          <Text>Loadding...</Text>
        </Layout>
      ) : (
        <Text>{props.text}</Text>
      )}
    </Card>
  );
};
