import tw from 'twrnc';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';

const CardInner = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default function RecipeCard({
  item,
  index,
  navigation,
  ingredients,
  measures,
}) {
  const paramsInfo = {
    item,
    ingredients,
    measures,
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
      style={tw`pt-3`}
    >
      <Pressable
        style={{
          justifyContent: 'center',
          width: '100%',
          paddingVertical: hp(2),
          paddingHorizontal: hp(2),
          borderRadius: 16,
          backgroundColor: '#171d2b',
        }}
        onPress={() => navigation.navigate('RecipeDetailed', { ...paramsInfo })}
      >
        <CardInner>
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: hp(14),
              height: hp(14),
              borderColor: '#444',
              borderWidth: 1,
              borderRadius: 500,
              objectFit: 'cover',
            }}
          ></Image>
          <View
            style={{
              width: '60%',
              marginLeft: 20,
            }}
          >
            <View style={tw`flex-row pb-3`}>
              <Text
                style={{
                  paddingRight: 20,
                  fontFamily: 'Comfortaa-Light',
                  fontSize: hp(1.6),
                  color: '#f0db92',
                }}
              >
                {item.time} мин
              </Text>
              <Text
                style={{
                  fontFamily: 'Comfortaa-Light',
                  fontSize: hp(1.6),
                  color: '#f0db92',
                }}
              >
                6 порций
              </Text>
            </View>
            <Text
              style={{
                paddingBottom: 10,
                fontFamily: 'Comfortaa-Light',
                fontSize: hp(2),
                color: 'white',
              }}
            >
              {item.title.length > 15
                ? item.title.slice(0, 15) + '...'
                : item.title}
            </Text>
            <Text
              style={{
                fontFamily: 'Comfortaa-Light',
                fontSize: hp(1.7),
                color: 'white',
              }}
            >
              {item.description.length > 60
                ? item.description.slice(0, 60) + '...'
                : item.description}
            </Text>
          </View>
        </CardInner>
      </Pressable>
    </Animated.View>
  );
}
