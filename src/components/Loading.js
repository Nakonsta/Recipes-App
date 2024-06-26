import tw from 'twrnc';
import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';

export default function Loading(props) {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator {...props}></ActivityIndicator>
    </View>
  );
}
