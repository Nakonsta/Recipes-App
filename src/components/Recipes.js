import tw from 'twrnc';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import RecipeCard from './RecipeCard';

export default function Recipes({ recipes, ingredients, measures }) {
  const navigation = useNavigation();

  return (
    <View style={tw`pt-6`}>
      <Text
        style={{
          fontSize: hp(2.7),
          color: 'white',
          fontFamily: 'Comfortaa-Light',
        }}
      >
        Рецепты
      </Text>
      <View>
        {recipes.length === 0 ? (
          <Text
            style={{
              paddingTop: 16,
              fontSize: hp(1.5),
              color: 'white',
              fontFamily: 'Comfortaa-Light',
            }}
          >
            В данной категории рецептов нет
          </Text>
        ) : (
          recipes.map((item) => {
            return (
              <RecipeCard
                key={item.id}
                item={item}
                navigation={navigation}
                ingredients={ingredients}
                measures={measures}
              />
            );
          })
        )}
      </View>
    </View>
  );
}
