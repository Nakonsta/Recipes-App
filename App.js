import { useFonts } from 'expo-font';
import AppNavigation from './src/navigation';

export default function App() {
  let [fontsLoaded] = useFonts({
    'Quicksand-Bold': require('./assets/fonts/Quicksand/Quicksand-Bold.ttf'),
    'Comfortaa-Light': require('./assets/fonts/Comfortaa/Comfortaa-Light.ttf'),
    'Comfortaa-Bold': require('./assets/fonts/Comfortaa/Comfortaa-Bold.ttf'),
    'SofiaSans-Bold': require('./assets/fonts/SofiaSans/SofiaSans-Bold.ttf'),
    'SofiaSans-ExtraBold': require('./assets/fonts/SofiaSans/SofiaSans-ExtraBold.ttf'),
  });

  if (fontsLoaded) {
    return <AppNavigation />;
  }
}
