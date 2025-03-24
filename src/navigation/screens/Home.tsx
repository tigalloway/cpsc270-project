import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.title}>Find Your Next Outdoor Adventure</Text>
      <Text style={styles.subtitle}>
        Click 'Get Started' to explore beautiful hikes in the Roanoke Valley.
      </Text>
      <TouchableOpacity style={styles.button} onPress = {()=>navigation.navigate("Hikes")}><Text>Get Started</Text></TouchableOpacity>
       <Video
        source={{uri: 'https://videos.pexels.com/video-files/3121327/3121327-uhd_2560_1440_24fps.mp4'}}
        style={{...styles.backgroundVideo, width, height}}
        muted={true}
        resizeMode="cover"
        repeat
        videoRef.current.seek(0.034);
        playInBackground={true} 
        playWhenInactive={true}  
        rate={1.0}
      />
    </View>
  );
}

      const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    padding: 20,
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
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
  }

});
