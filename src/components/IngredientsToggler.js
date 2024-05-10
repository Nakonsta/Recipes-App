import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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

export const IngredientsToggler = ({
  isFullIngredientsListShown,
  setIsFullIngredientsListShown,
}) => {
  return (
    <IngredientContainer>
      <Pressable
        style={{
          minWidth: 50,
          width: '100%',
        }}
        onPress={() => {
          setIsFullIngredientsListShown(!isFullIngredientsListShown);
        }}
      >
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            fontSize: hp(2),
            lineHeight: 17,
            color: '#c5fd52',
            fontFamily: 'Comfortaa-Bold',
          }}
        >
          {isFullIngredientsListShown ? 'Hide' : 'Show'}
        </Text>
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            fontSize: hp(2),
            lineHeight: 17,
            color: '#c5fd52',
            fontFamily: 'Comfortaa-Bold',
          }}
        >
          all
        </Text>
      </Pressable>
    </IngredientContainer>
  );
};
