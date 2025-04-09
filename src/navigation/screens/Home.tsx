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
    flex: 1, // Ensures the image fills the screen
    justifyContent: 'center', // Centers content vertically in the background
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center', // Center content vertically in the overlay
    alignItems: 'center', // Center content horizontally in the overlay
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay (black with 40% opacity)
    padding: 20,
  },
  container: {
    flex: 1, // Takes up all available space
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#FFFFFF', // White text for contrast against the overlay
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40, // Adjusted space for button
    color: '#FFFFFF', // White text for contrast against the overlay
  },
  button: {
    backgroundColor: '#228B22', // Forest Green color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff', // White text inside button
    fontSize: 18,
    fontWeight: 'bold',
  },
});

