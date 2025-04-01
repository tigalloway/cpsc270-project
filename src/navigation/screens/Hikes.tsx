import React from 'react';
import { StyleSheet, View } from 'react-native';
import HikeList from '../../HikeList';

export function Hikes() {
    return (
        <View style={styles.container}>
            <HikeList />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
});

export default Hikes;
