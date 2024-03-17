import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <TouchableOpacity style={tw`bg-indigo-500 p-3 rounded-lg shadow-md`}>
        <Text style={tw`text-white text-3xl font-bold`}>Hello, World!</Text>
      </TouchableOpacity>
      <StatusBar style='light' />
    </View>
  );
}
