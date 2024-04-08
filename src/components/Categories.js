import tw from 'twrnc';
import styled from 'styled-components/native';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import React, { useState } from 'react';
import { View, ScrollView, Pressable, StyleSheet, Text } from 'react-native';

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

export default function Categories({
  categories,
  activeCategory,
  setActiveCategory,
  isPopularShown,
  setIsPopularShown,
}) {
  return (
    <Animated.View entering={FadeInDown.duration(800).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0, paddingTop: 5 }}
      >
        <Pressable
          style={tw`flex items-center pt-2`}
          onPress={() => {
            setActiveCategory(null);
            setIsPopularShown(true);
          }}
        >
          <CategoryItem
            style={{
              borderColor: isPopularShown ? 'orange' : 'white',
            }}
          >
            <CategoryImg
              source={require('../../assets/img/fire.png')}
            ></CategoryImg>
            <CategoryText
              style={{
                color: isPopularShown ? 'orange' : 'white',
              }}
            >
              Популярное
            </CategoryText>
          </CategoryItem>
        </Pressable>
        {categories?.length > 0 &&
          categories.map((category, index) => {
            const isActive = category?.id === activeCategory?.id;

            return (
              <Pressable
                key={index}
                style={tw`flex items-center pt-2`}
                onPress={() => {
                  setIsPopularShown(false);
                  setActiveCategory(category);
                }}
              >
                <CategoryItem
                  style={{
                    borderColor: isActive ? 'orange' : 'white',
                  }}
                >
                  <CategoryImg source={{ uri: category.image }}></CategoryImg>
                  <CategoryText
                    style={{
                      color: isActive ? 'orange' : 'white',
                    }}
                  >
                    {category.title}
                  </CategoryText>
                </CategoryItem>
              </Pressable>
            );
          })}
      </ScrollView>
    </Animated.View>
  );
}
