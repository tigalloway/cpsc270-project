import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import HikeList from './HikeList';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HikeList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
