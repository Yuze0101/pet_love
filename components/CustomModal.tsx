import { Card, Text, Spinner, Layout, Button } from '@ui-kitten/components';
type CustomModalProps = {
  status: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control';
  isLoading?: boolean;
  text: string;
  showButtons?: boolean;
  cancelAction?: Function;
  confirmAction?: Function;
};

export const CustomModal = (props: CustomModalProps) => {
  const footer = () => {
    return props.showButtons ? (
      <Layout>
        {props.cancelAction ? (
          <Button status="primary">
            <Text>取消</Text>
          </Button>
        ) : null}
        {props.confirmAction ? (
          <Button status="danger">
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
