import axios from 'axios';
import tw from 'twrnc';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import styled from 'styled-components/native';
import React, { useState, useEffect, useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
} from 'react-native';
import Categories from '../components/Categories';

const Greeting = styled.Text`
  padding: 20px 0 5px;
  font-size: 20px;
  font-family: 'Comfortaa-Light';
  color: white;
`;

const Greeting2 = styled.Text`
  font-size: 16px;
  font-family: 'Comfortaa-Light';
  color: white;
`;

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState();

  const computedComments = useMemo(() => {
    return categories?.[0];
  }, [categories]);

  const fetchCategories = () => {
    axios
      .get(`https://food-backend-2024-f556bc1359f3.herokuapp.com/categories`)
      .then(({ data }) => {
        setCategories(data);
        if (data?.length) setActiveCategory(data[0]);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Ошибка при получении категорий');
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 justify-center px-4 bg-gray-900`}>
      <StatusBar style='light' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        style={tw`pt-5 mx-4`}
      >
        <View style={tw` flex-row justify-between items-center mb-2`}>
          <Image
            source={require('../../assets/img/avatar.jpg')}
            style={{
              height: hp(7),
              width: hp(7),
              borderRadius: 100,
            }}
          />
          <BellIcon size={hp(4)} color='white' />
        </View>
        <View style={tw`mb-2`}>
          <Greeting>Привет!</Greeting>
          <Greeting2>Самое время приготовить что-нибудь вкусное)</Greeting2>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            borderWidth: 0.5,
            borderColor: '#777',
            borderRadius: 20,
          }}
        >
          <TextInput
            placeholder='Введите название рецепта'
            placeholderTextColor={'#777'}
            style={{
              flex: 1,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 16,
              paddingRight: 30,
              color: 'white',
              fontFamily: '',
              fontSize: hp(1.7),
            }}
          />
          <View style={tw`rounded-full p-3`}>
            <MagnifyingGlassIcon size={hp(4)} color='#999' />
          </View>
        </View>
        <View>
          {categories?.length && <Categories categories={categories} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
