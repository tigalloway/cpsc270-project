import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';
import { SafeAreaView, StatusBar } from "react-native";
import Hikes from "./navigation/screens/Hikes"

<StatusBar hidden />



Asset.loadAsync([
  ...NavigationAssets,
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <Navigation 
      linking={{
        enabled: 'auto',
        prefixes: [

        ],
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
      />
  );
}
