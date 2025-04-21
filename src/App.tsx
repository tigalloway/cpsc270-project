import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';
import { SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 

<StatusBar hidden />;

Asset.loadAsync([
  ...NavigationAssets,
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation
        linking={{
          enabled: 'auto',
          prefixes: [
            // Change the scheme to match your app's scheme defined in app.json
            'helloworld://',
          ],
        }}
        onReady={() => {
          SplashScreen.hideAsync();
        }}
      />
    </GestureHandlerRootView>
  );
}
