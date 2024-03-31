import styled from 'styled-components/native';

const IngredientView = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px 5px;
  border-bottom-width: 1px;
  border-bottom-color: #777;
  border-bottom-style: solid;
`;

const IngredientDetails = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const IngredientTitle = styled.Text`
  font-size: 15px;
  color: white;
`;

const IngredientInfo = styled.View`
  flex-direction: row;
`;

const IngredientQuantity = styled.Text`
  padding-right: 3px;
  font-size: 13px;
  color: white;
`;

const IngredientMeasure = styled.Text`
  font-size: 12px;
  color: white;
`;

export const Ingredient = ({ ingredient, measures, ingredients }) => {
  const getIngredientTitle = (id) => {
    if (!id || !ingredients?.length) return '';

    const ingredientItem = ingredients.find((ingr) => ingr.id === id);

    if (ingredientItem) return ingredientItem.title;
  };

  const getIngredientMeasure = (id) => {
    if (!id || !measures?.length) return '';

    const measureItem = measures.find((measure) => measure.id === id);

    if (measureItem) return measureItem.title;
  };

  return (
    <IngredientView>
      <IngredientDetails>
        <IngredientTitle>
          {getIngredientTitle(ingredient.ingredientId)}
        </IngredientTitle>
        <IngredientInfo>
          <IngredientQuantity>{ingredient.amount}</IngredientQuantity>
          <IngredientMeasure>
            {getIngredientMeasure(ingredient.measureId)}
          </IngredientMeasure>
        </IngredientInfo>
      </IngredientDetails>
    </IngredientView>
  );
};
