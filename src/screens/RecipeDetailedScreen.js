import axios from 'axios';
import tw from 'twrnc';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import {
  ChevronLeftIcon,
  ClockIcon,
  UsersIcon,
  FireIcon,
  Square3Stack3DIcon,
} from 'react-native-heroicons/outline';
import { ScrollView, View, Text, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { Ingredient } from '../components/Ingredient';

const RecipeImage = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export default function RecipeDetailedScreen(props) {
  const navigation = useNavigation();
  const item = props.route.params?.item;
  const measures = props.route.params?.measures;
  const ingredients = props.route.params?.ingredients;
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);

  const fetchRecipe = () => {
    setIsLoading(true);

    axios
      .get(
        `https://food-backend-2024-f556bc1359f3.herokuapp.com/recipes/${item.id}`
      )
      .then(({ data }) => {
        setRecipe(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Ошибка при получении рецепта');
      });
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <ScrollView
      style={tw`flex-1 bg-gray-900`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style='light' />
      <>
        <RecipeImage>
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: '100%',
              height: hp(45),
              objectFit: 'cover',
            }}
          ></Image>
        </RecipeImage>
        <Animated.View
          entering={FadeIn.delay(200).duration(1000)}
          style={tw`w-full absolute flex-row justify-between items-center pt-40`}
        >
          <Pressable
            style={tw`p-2 rounded-full ml-5 bg-white bg-opacity-75`}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={hp(2.5)} strokeWidth={3} color='#444' />
          </Pressable>
        </Animated.View>
        {item && (
          <View style={tw`flex justify-between pt-8 mx-4`}>
            <Animated.View
              entering={FadeInDown.duration(700).springify().damping(12)}
              style={tw``}
            >
              <Text
                style={{
                  fontSize: hp(3),
                  color: 'white',
                  fontFamily: 'Comfortaa-Light',
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: hp(2),
                  color: 'white',
                  fontFamily: 'Comfortaa-Light',
                }}
              >
                {item.description}
              </Text>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(100).duration(700)}
              style={tw`flex-row justify-around pt-3`}
            >
              <View style={tw`flex rounded-full bg-amber-300 p-2`}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: hp(6.5),
                    width: hp(6.5),
                    backgroundColor: 'white',
                    borderRadius: 100,
                  }}
                >
                  <ClockIcon size={hp(4)} strokeWidth={2.5} color='#525252' />
                </View>
                <View style={tw`flex items-center py-2`}>
                  <Text
                    style={{
                      fontSize: hp(1.5),
                      color: '#525252',
                      fontFamily: 'Comfortaa-Light',
                    }}
                  >
                    35
                  </Text>
                  <Text
                    style={{
                      fontSize: hp(1.5),
                      color: '#525252',
                      fontFamily: 'Comfortaa-Light',
                    }}
                  >
                    мин
                  </Text>
                </View>
              </View>
              <View style={tw`flex rounded-full bg-amber-300 p-2`}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: hp(6.5),
                    width: hp(6.5),
                    backgroundColor: 'white',
                    borderRadius: 100,
                  }}
                >
                  <UsersIcon size={hp(4)} strokeWidth={2.5} color='#525252' />
                </View>
                <View style={tw`flex items-center py-2`}>
                  <Text
                    style={{
                      fontSize: hp(1.5),
                      color: '#525252',
                      fontFamily: 'Comfortaa-Light',
                    }}
                  >
                    3
                  </Text>
                  <Text
                    style={{
                      fontSize: hp(1.5),
                      color: '#525252',
                      fontFamily: 'Comfortaa-Light',
                    }}
                  >
                    лайка
                  </Text>
                </View>
              </View>
              <View style={tw`flex rounded-full bg-amber-300 p-2`}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: hp(6.5),
                    width: hp(6.5),
                    backgroundColor: 'white',
                    borderRadius: 100,
                  }}
                >
                  <FireIcon size={hp(4)} strokeWidth={2.5} color='#525252' />
                </View>
                <View style={tw`flex items-center py-2`}>
                  <Text
                    style={{
                      fontSize: hp(1.5),
                      color: '#525252',
                      fontFamily: 'Comfortaa-Light',
                    }}
                  >
                    420
                  </Text>
                  <Text
                    style={{
                      fontSize: hp(1.5),
                      color: '#525252',
                      fontFamily: 'Comfortaa-Light',
                    }}
                  >
                    ккал
                  </Text>
                </View>
              </View>
              <View style={tw`flex rounded-full bg-amber-300 p-2`}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: hp(6.5),
                    width: hp(6.5),
                    backgroundColor: 'white',
                    borderRadius: 100,
                  }}
                >
                  <Square3Stack3DIcon
                    size={hp(4)}
                    strokeWidth={2.5}
                    color='#525252'
                  />
                </View>
                <View style={tw`flex items-center py-2`}>
                  <Text
                    style={{
                      fontSize: hp(1.5),
                      color: '#525252',
                      fontFamily: 'Comfortaa-Light',
                    }}
                  >
                    Very
                  </Text>
                  <Text
                    style={{
                      fontSize: hp(1.5),
                      color: '#525252',
                      fontFamily: 'Comfortaa-Light',
                    }}
                  >
                    easy
                  </Text>
                </View>
              </View>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(200)
                .duration(700)
                .springify()
                .damping(12)}
              style={tw`pt-6`}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: hp(2),
                  color: 'white',
                  fontFamily: 'Comfortaa-Light',
                }}
              >
                Ингредиенты
              </Text>
              <View style={tw`ml-1`}>
                {item.RecipeIngredients.map((ingr, index) => {
                  return (
                    <View key={index}>
                      <Ingredient
                        measures={measures}
                        ingredients={ingredients}
                        ingredient={ingr}
                      />
                    </View>
                  );
                })}
              </View>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(200)
                .duration(700)
                .springify()
                .damping(12)}
              style={tw`pt-6`}
            >
              <Text
                style={{
                  flex: 1,
                  paddingBottom: 16,
                  fontSize: hp(2),
                  color: 'white',
                  fontFamily: 'Comfortaa-Light',
                }}
              >
                Этапы приготовления
              </Text>
              <View style={tw`ml-1`}>
                {item.RecipeSteps.map((step, index) => {
                  return (
                    <View key={index} style={tw`flex-row pb-3`}>
                      <Text
                        style={{
                          width: 20,
                          fontSize: hp(2),
                          color: 'white',
                          fontFamily: 'Comfortaa-Light',
                        }}
                      >
                        {step.stepNumber}.
                      </Text>
                      <Text
                        style={{
                          fontSize: hp(2),
                          color: 'white',
                          fontFamily: 'Comfortaa-Light',
                        }}
                      >
                        {step.stepText}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </Animated.View>
          </View>
        )}
      </>
    </ScrollView>
  );
}
