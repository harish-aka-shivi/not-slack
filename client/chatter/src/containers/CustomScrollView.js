import React from 'react';
import { View, ScrollView } from 'react-native';
import { IS_WEB } from '../config';

const CustomScrollView = ({ ...props }) => (
  IS_WEB ? <ScrollView {...props} /> : <View {...props} />
);

export default CustomScrollView;
