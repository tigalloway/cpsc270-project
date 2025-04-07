import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {Video} from 'react-native-video'

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
    <View style={styles.container}>
      <Video style={styles.backgroundVideo}
        source={{uri: 'https://rr2---sn-gjo-qj5l.googlevideo.com/videoplayback?expire=1742852320&ei=gHzhZ6fsHNWEkucPwb66sAU&ip=72.25.249.7&id=o-AALm4Iop2CbGq_hBXr7P0G3OFfW6yutYthBAeWqY5BdM&itag=313&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C271%2C278%2C313&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1742830720%2C&mh=C9&mm=31%2C29&mn=sn-gjo-qj5l%2Csn-p5qddn7z&ms=au%2Crdu&mv=m&mvi=2&pl=21&rms=au%2Cau&initcwndbps=86250&bui=AccgBcMSJm1HQu7VEHqzVMyKDps5loxsX0_oaCFZgGDA6kMrJDwy2JRbYfdC64erZtIQeAgdEonQtqDy&spc=_S3wKp19V_BrmQQ2kgYSP_5ws4lI7js0WrULkv2ehNMlO8iWj74Tka0Ro0tsYJcSvvI&vprv=1&svpuc=1&mime=video%2Fwebm&ns=jMOD7jgoBc-a2-M0LNYhoTYQ&rqh=1&gir=yes&clen=84753528729&dur=42899.123&lmt=1729912022334900&mt=1742830172&fvip=1&keepalive=yes&fexp=51355912&c=WEB&sefc=1&txp=730F224&n=k2aqNaXkTM8ViA&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AFVRHeAwRgIhAOMAM7KFChataPj5xvskrVUYcfUs_ADDZsDBdy_MV1kzAiEAgVnL0cQ7KLAZ3x0rvMfPC9a940_C5GMQVkWb7qCZ0h0%3D&sig=AJfQdSswRAIgNpeiFNy0q8Z5OAmFxWN7rNezFDEr3n4eOFmCt9lnluUCIDvoF72nnqyWq3p6c6FgudhK41weoNQRSA8mD4yM-YCv&pot=MnRTxlZkDkw7hVP-0Ypro8ELDR448OPxn7KmQt-xj3NJSZCjYtw69R1L2wZdxrdGc8-hcTKPnwvzC3wJkJCSaCeLCiawwTUzRLwTUvaybuMPynWwMD3eOtxpPjidCSLcVFNa8o01AJR5Pc9E0DLSx7qIdR8xcg%3D%3D&range=0-&title=Appalachian%20Mountains%204K%20Ultra%20HD%20%E2%80%A2%20Enchanting%20Autumn,%20Scenic%20Relaxation%20Film%20with%20Calming%20Music.'}}
        muted={true}
        resizeMode= "stretch"
        repeat
        playInBackground={true} 
        playWhenInactive={true}  
        rate={1}
      />
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
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
      }
});
