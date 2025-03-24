import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Video from "react-native-video";

export function Home() {
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Video
        source={{uri: 'https://videos.pexels.com/video-files/3121327/3121327-uhd_2560_1440_24fps.mp4'}}
        style={{...styles.backgroundVideo, width, height}}
        muted={true}
        resizeMode="cover"
        repeat 
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
  },
  backgroundVideo: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
  }
});
