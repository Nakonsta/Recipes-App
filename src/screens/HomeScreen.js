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
import Recipes from '../components/Recipes';
import Loading from '../components/Loading';

const Greeting = styled.Text`
  padding: 0 5px;
  font-size: 24px;
  font-family: 'Comfortaa-Bold';
  line-height: 30px;
  color: white;
`;

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState();
  const [measures, setMeasures] = useState();
  const [isPopularShown, setIsPopularShown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const recipesOfActiveCategory = useMemo(() => {
    if (searchQuery) {
      setIsPopularShown(false);
      setActiveCategory(null);

      return recipes.filter((recipe) => recipe.title.includes(searchQuery));
    } else if (!isPopularShown && !activeCategory) {
      setIsPopularShown(true);
      return recipes.filter((recipe) => recipe.isPopular === 1);
    }

    if (isPopularShown) {
      return recipes.filter((recipe) => recipe.isPopular === 1);
    }

    const activeCategoryId = activeCategory?.id ? activeCategory.id : null;

    return recipes.filter((recipe) => recipe.categoryId === activeCategoryId);
  }, [recipes, activeCategory, searchQuery]);

  const fetchCategories = () => {
    axios
      .get(`https://food-backend-2024-f556bc1359f3.herokuapp.com/categories`)
      .then(({ data }) => {
        setCategories(data);
        setIsPopularShown(true);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Ошибка при получении категорий');
      });
  };

  const fetchRecipes = () => {
    setIsLoading(true);
    axios
      .get(`https://food-backend-2024-f556bc1359f3.herokuapp.com/recipes`)
      .then(({ data }) => {
        setRecipes(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Ошибка при получении рецептов');
      });
  };

  const fetchMeasures = () => {
    axios
      .get(`https://food-backend-2024-f556bc1359f3.herokuapp.com/measures`)
      .then(({ data }) => {
        setMeasures(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Ошибка при получении единиц измерения');
      });
  };

  const fetchIngredients = () => {
    axios
      .get(`https://food-backend-2024-f556bc1359f3.herokuapp.com/ingredients`)
      .then(({ data }) => {
        setIngredients(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Ошибка при получении ингредиентов');
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchRecipes();
    fetchMeasures();
    fetchIngredients();
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 justify-center px-4 pt-7 bg-gray-900`}>
      <StatusBar style='light' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
        style={tw`mx-4`}
      >
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <View style={tw` `}>
            <Greeting>Привет,</Greeting>
            <View style={tw`flex-row items-center`}>
              <Greeting>я Настя!</Greeting>
              <Image
                source={require('../../assets/img/hi.png')}
                style={{
                  height: hp(2.5),
                  width: hp(2.5),
                }}
              />
            </View>
          </View>
          <Image
            source={require('../../assets/img/avatar.jpg')}
            style={{
              height: hp(7),
              width: hp(7),
              borderRadius: 100,
            }}
          />
        </View>
        <Text>{searchQuery}</Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.5,
            borderColor: '#777',
            borderRadius: 20,
          }}
        >
          <TextInput
            value={searchQuery}
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
            onChangeText={setSearchQuery}
          />
          <View style={tw`rounded-full p-3`}>
            <MagnifyingGlassIcon size={hp(4)} color='#999' />
          </View>
        </View>
        <View>
          {categories?.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              isPopularShown={isPopularShown}
              setActiveCategory={(cat) => {
                setSearchQuery('');
                setActiveCategory(cat);
              }}
              setIsPopularShown={setIsPopularShown}
            />
          )}
        </View>
        <View>
          {isLoading ? (
            <Loading size='large' style={tw`pt-20`} />
          ) : (
            <Recipes
              recipes={recipesOfActiveCategory}
              ingredients={ingredients}
              measures={measures}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
