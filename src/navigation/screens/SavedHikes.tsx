import { Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

export function SavedHikes(){
    return(
        <View style={styles.container}>
            <Text>Listed hikes that the user saves</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
  });