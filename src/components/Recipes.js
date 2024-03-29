import tw from 'twrnc';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import MasonryList from '@react-native-seoul/masonry-list';
import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import Loading from './Loading';

export default function Recipes({ recipes }) {
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
          <MasonryList
            data={recipes}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
            // refreshing={isLoadingNext}
            // onRefresh={() => refetch({ first: ITEM_CNT })}
            onEndReachedThreshold={0.1}
            // onEndReached={() => loadNext(ITEM_CNT)}
          />
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index }) => {
  let isOdd = index % 2 === 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
      style={tw`pt-3`}
    >
      <Pressable
        style={{
          width: '100%',
          marginBottom: 4,
          justifyContent: 'center',
          paddingLeft: isOdd ? 0 : 8,
          paddingRight: isOdd ? 8 : 0,
        }}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={{
            width: '100%',
            height: index % 3 === 0 ? hp(25) : hp(35),
            borderRadius: 15,
            objectFit: 'cover',
          }}
        ></Image>
        <Text
          style={{
            marginTop: 6,
            marginLeft: 4,
            color: 'white',
            fontFamily: 'Comfortaa-Light',
            fontSize: hp(2),
          }}
        >
          {item.title.length > 15
            ? item.title.slice(0, 15) + '...'
            : item.title}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
