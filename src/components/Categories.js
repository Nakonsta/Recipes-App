import tw from 'twrnc';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';

const CategoryItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
  padding: 3px 5px;
  border: 1px solid white;
  border-radius: 50%;
`;

const CategoryImg = styled.Image`
  width: 18px;
  height: 18px;
  margin-left: 2px;
`;

const CategoryText = styled.Text`
  padding: 3px 5px;
  color: white;
`;

export default function Categories({ categories }) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0, paddingTop: 10 }}
      >
        {categories?.length &&
          categories.map((category, index) => {
            return (
              <TouchableOpacity key={index} style={tw`flex items-center pt-2`}>
                <CategoryItem>
                  <CategoryImg source={{ uri: category.image }}></CategoryImg>
                  <CategoryText>{category.title}</CategoryText>
                </CategoryItem>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
