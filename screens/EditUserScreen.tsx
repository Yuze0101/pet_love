import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, Layout, Button, Input, Icon, Spinner } from '@ui-kitten/components';
import { UserCenterScreenProps } from '../types';
export default function EditUserScreen({ navigation }: UserCenterScreenProps<'EditUser'>) {
  return (
    <Layout>
      <Text>EditUserScreen</Text>
    </Layout>
  );
}
