import styled from 'styled-components/native';
import { View, ScrollView, Pressable, StyleSheet, Text } from 'react-native';

const IngredientContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  padding: 12px;
  border: 1px solid #595c61;
  border-radius: 15px;
`;

const IngredientImage = styled.Image`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;

export const Ingredients = ({ recipeIngredients, measures, ingredients }) => {
  const getIngredientImage = (id) => {
    const ingredientItem = ingredients.find((ingr) => ingr.id === id);

    if (ingredientItem) return ingredientItem.image;
  };

  const getIngredientMeasure = (id) => {
    if (!id || !measures?.length) return '';

    const measureItem = measures.find((measure) => measure.id === id);

    if (measureItem) return measureItem.title;
  };

  return (
    <ScrollView horizontal>
      {recipeIngredients?.length &&
        recipeIngredients.map((recipeIngr) => {
          return (
            <IngredientContainer key={recipeIngr.IngredientId}>
              <IngredientImage
                source={{ uri: getIngredientImage(recipeIngr.IngredientId) }}
              ></IngredientImage>
            </IngredientContainer>
          );
        })}
    </ScrollView>
  );
};
