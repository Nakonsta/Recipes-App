import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import tw from 'twrnc';
import styled from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TextsContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;

const TextInner = styled.Text`
  padding: 0 20px;
  font-size: 38px;
  font-family: 'SofiaSans-ExtraBold';
  color: white;
  text-align: center;
`;

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const firstRingPadding = useSharedValue(0);
  const secondRingPadding = useSharedValue(0);

  useEffect(() => {
    firstRingPadding.value = 0;
    secondRingPadding.value = 0;

    setTimeout(() => {
      secondRingPadding.value = withSpring(secondRingPadding.value + hp(1.5));
    }, 100);
    setTimeout(() => {
      firstRingPadding.value = withSpring(firstRingPadding.value + hp(2.5));
    }, 300);
    // setTimeout(() => {
    //   navigation.navigate('Home');
    // }, 2500);
    return () => {};
  }, []);

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-900`}></View>
  );
}
