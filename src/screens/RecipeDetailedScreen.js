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
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { ScrollView, View, Text, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { Ingredient } from '../components/Ingredient';
import { Ingredients } from '../components/Ingredients';

const RecipeImage = styled.View`
  position: relative;
  flex-direction: row;
  justify-content: center;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px 0;
  padding: 18px 32px;
  border: 1px solid #595c61;
  border-radius: 20px;
`;

const InfoNumber = styled.Text`
  padding-bottom: 6px;
  font-size: 20px;
  font-family: 'Comfortaa-Bold';
  text-align: center;
  color: #ffe598;
`;

const InfoText = styled.Text`
  font-size: 13px;
  font-family: 'Comfortaa-Light';
  color: #9c9fa3;
`;

export default function RecipeDetailedScreen(props) {
  const navigation = useNavigation();
  const item = props.route.params?.item;
  const measures = props.route.params?.measures;
  const ingredients = props.route.params?.ingredients;
  const [isFullIngredientsListShown, setIsFullIngredientsListShown] =
    useState(false);
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
      style={{
        flex: 1,
        backgroundColor: '#12151e',
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style='light' hidden />
      <>
        <Animated.View
          entering={FadeIn.delay(200).duration(1000)}
          style={tw`w-full absolute z-3 flex-row justify-between items-center pt-18`}
        >
          <Pressable
            style={tw`p-2 rounded-full ml-5`}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={hp(3)} strokeWidth={1.2} color='white' />
          </Pressable>
        </Animated.View>
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
        {item && (
          <View style={tw`flex justify-between`}>
            <Animated.View
              entering={FadeInDown.duration(700).springify().damping(12)}
              style={tw``}
            >
              <Text
                style={{
                  width: '100%',
                  textAlign: 'center',
                  fontSize: hp(2),
                  color: 'white',
                  fontFamily: 'Comfortaa-Bold',
                }}
              ></Text>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(100).duration(700)}
              style={tw`flex-row justify-around pt-3 mx-4`}
            >
              <InfoContainer>
                <View>
                  <InfoNumber>{item.time}</InfoNumber>
                  <InfoText>минут</InfoText>
                </View>
                <View>
                  <InfoNumber>500</InfoNumber>
                  <InfoText>грамм</InfoText>
                </View>
                <View>
                  <InfoNumber>{item.portions}</InfoNumber>
                  <InfoText>порций</InfoText>
                </View>
              </InfoContainer>
            </Animated.View>
            <View
              style={{
                marginHorizontal: 10,
                marginTop: 10,
                paddingHorizontal: 10,
                borderRadius: 20,
                backgroundColor: '#171d2b',
              }}
            >
              <Animated.View
                entering={FadeInDown.delay(200)
                  .duration(700)
                  .springify()
                  .damping(12)}
                style={tw`pt-2`}
              >
                <Ingredients
                  recipeIngredients={item.RecipeIngredients}
                  measures={measures}
                  ingredients={ingredients}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(200)
                  .duration(700)
                  .springify()
                  .damping(12)}
                style={tw`pt-2 hidden`}
              >
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
                    display: 'none',
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
                      <View key={index} style={{}}>
                        <View
                          key={index}
                          style={{
                            position: 'relative',
                            marginLeft: 10,
                            paddingLeft: 30,
                            paddingBottom: 30,
                            borderLeftWidth: 1,
                            borderLeftColor:
                              index !== item.RecipeSteps.length - 1
                                ? '#d6fc51'
                                : '#171d2b',
                          }}
                        >
                          <View
                            key={index}
                            style={{
                              zIndex: 4,
                              position: 'absolute',
                              top: 0,
                              left: -15,
                              width: 30,
                              height: 30,
                              borderRadius: 100,
                              backgroundColor: '#d6fc51',
                              borderLeftWidth: 1,
                              borderLeftColor: '#d6fc51',
                            }}
                          ></View>
                          <Text
                            style={{
                              paddingBottom: 8,
                              fontSize: hp(2.1),
                              color: 'white',
                              fontFamily: 'Comfortaa-Bold',
                            }}
                          >
                            Шаг {step.stepNumber}
                          </Text>
                          <Text
                            style={{
                              fontSize: hp(1.9),
                              lineHeight: 22,
                              color: '#9c9fa3',
                              fontFamily: 'Comfortaa-Light',
                            }}
                          >
                            {step.stepText}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </Animated.View>
            </View>
          </View>
        )}
      </>
    </ScrollView>
  );
}
