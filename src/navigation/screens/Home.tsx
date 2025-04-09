import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';


type HomeTabsParamList = {
  Home: undefined;
  Hikes: undefined;
  CompletedHikes: undefined;
  SavedHikes: undefined;
};


export function Home() {
  const navigation = useNavigation<BottomTabNavigationProp<HomeTabsParamList>>();
  
  return (
    <View>
      <Text style={styles.title}>Find Your Next Outdoor Adventure</Text>
      <Text style={styles.subtitle}>
        Click 'Get Started' to explore beautiful hikes in the Roanoke Valley.
      </Text>
      <TouchableOpacity style={styles.button} onPress = {()=>navigation.navigate("Hikes")}><Text>Get Started</Text></TouchableOpacity>
    </View>
  );
}

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 0,
   // backgroundColor: '#f0f8ff', // Light blue background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2E8B57', // Greenish color for nature theme
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  button: {
    backgroundColor: '#228B22', // Forest Green color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
      },
   backgroundVideo: {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 0
  },
});
