import { Image } from 'react-native';
import  hike from '../assets/hikes-icon.png'
import check from '../assets/circle-with-check-symbol.png'
import tree from '../assets/tree-icon.png'
import savedicon from '../assets/savedicon.png'
import { Home } from './screens/Home';
import { SavedHikes } from './screens/SavedHikes';
import { Hikes } from './screens/Hikes';
import { CompletedHikes } from './screens/CompletedHikes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';

const HomeTabs = createBottomTabNavigator({
  screenOptions:{
    tabBarPosition: "bottom",
    headerStyle:{  
      backgroundColor: 'rgb(13 48 6)'
    },
    headerTintColor: "orange",
    tabBarStyle: {
      backgroundColor: 'rgb(13 48 6)'
    },
    tabBarLabelPosition:'below-icon',
    tabBarActiveTintColor: 'orange'
  },
  screens: {
    
    Home: {
      screen: Home,
      options: {
        headerShown: false, 
        title: 'Home',
        tabBarIcon: ({ size }) => (
          <Image
            source={tree}
            tintColor= 'rgb(46 122 34)'
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Hikes: {
      screen: Hikes,
      options: {
        tabBarIcon: ({ size }) => (
          <Image
            source={hike}
            tintColor='rgb(46 122 34)'
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    CompletedHikes:{
      screen: CompletedHikes,
      options: {
        title: 'Completed Hikes',
        
        tabBarIcon: () =>(
          <Image
            source={check}
            tintColor='rgb(46 122 34)'
            style={{
              width: 20, 
              height: 20,
            }}
            />
        )
      }
    },
    SavedHikes:{
      screen: SavedHikes,
      options: {
        title: 'Saved Hikes',
        tabBarIcon: ({ size }) => (
          <Image
            source={savedicon}
            tintColor='rgb(46 122 34)'
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
  },
  options: {
    tabBarStyle: {display: 'none'}
  }
});

//need to edit root stack still
const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    // },
    // Profile: {
    //   screen: Profile,
    //   linking: {
    //     path: ':user(@[a-zA-Z0-9-_]+)',
    //     parse: {
    //       user: (value) => value.replace(/^@/, ''),
    //     },
    //     stringify: {
    //       user: (value) => `@${value}`,
    //     },
    //   },
    // },
    // //Hikes: {
    //   //screen: Hikes,
    // //},
    // Settings: {
    //   screen: Settings,
    //   options: ({ navigation }) => ({
    //     presentation: 'modal',
    //     headerRight: () => (
    //       <HeaderButton onPress={navigation.goBack}>
    //         <Text>Close</Text>
    //       </HeaderButton>
    //     ),
    //   }),
    }
  }
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
import { createNativeStackNavigator } from '@react-navigation/native-stack';

