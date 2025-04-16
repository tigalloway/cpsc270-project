import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet, TouchableOpacity, ImageBackground, View } from 'react-native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type HomeTabsParamList = {
  Home: undefined;
  Hikes: undefined;
  CompletedHikes: undefined;
  SavedHikes: undefined;
};

const { width, height } = Dimensions.get("window");

export function Home() {
  const navigation = useNavigation<BottomTabNavigationProp<HomeTabsParamList>>();

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Find Your Next Outdoor Adventure</Text>
          <Text style={styles.subtitle}>
            Click 'Get Started' to explore beautiful hikes in the Roanoke Valley.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Hikes")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1, 
    justifyContent: 'center', 
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    padding: 20,
  },
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#FFFFFF', 
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40, 
    color: '#FFFFFF', 
  },
  button: {
    backgroundColor: '#228B22', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

