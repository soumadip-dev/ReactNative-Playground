import { View, Text } from 'react-native';
import React from 'react';

const Details = ({ route }) => {
  const { itemId, otherParam } = route.params;
  return (
    <View>
      <Text>Details Screen</Text>
      <Text>itemId: {itemId}</Text>
      <Text>otherParam: {otherParam}</Text>
    </View>
  );
};

export default Details;
