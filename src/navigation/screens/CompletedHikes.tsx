import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; 
import ProgressBar from 'react-native-progress/Bar';
import Confetti from 'react-confetti';

interface CompletedHike {
  id: number;
  name: string;
  difficultyRating: number;
  experienceRating: number;
  distance: string;
  description: string;
  image_url: string;
  userExperience: string,
}

export function CompletedHikes() {
  const [completedHikes, setCompletedHikes] = useState<CompletedHike[]>([]);

  
  const fetchCompletedHikes = async () => {
    const completedHikesData = await AsyncStorage.getItem('completedHikes');
    if (completedHikesData) {
      const hikes = JSON.parse(completedHikesData);
      setCompletedHikes(hikes);
    }
    
  };

  

  const clearCompletedHikes = async () => {
    await AsyncStorage.removeItem('completedHikes');
    setCompletedHikes([]);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCompletedHikes();
    }, [])
  );

  
  const renderHike = ({ item }: { item: CompletedHike }) => (
    <View style={styles.hikeCard}>
      <Image source={{ uri: item.image_url }} style={styles.hikeImage} />
      <Text style={styles.hikeTitle}>{item.name}</Text>
      <Text style={styles.hikeInfo}>
        Difficulty: {item.difficultyRating} | Experience: {item.experienceRating}
      </Text>
      <Text style={styles.hikeDescription}>{item.userExperience}</Text>
      <Text style={styles.hikeDistance}>Distance: {item.distance} miles</Text>
    </View>
  );

  const progress = completedHikes.length/14; 
  const {width, height} = Dimensions.get("window");
  
  return (
    <View style={styles.container}>
      
      <Text style={styles.header}>Completed Hikes</Text>
      <Text style={styles.progressText}>You have completed {Math.round(progress*100)}% of the hikes!</Text>
    
     <ProgressBar width={null} progress={progress} color="green" unfilledColor='rgb(222, 189, 179)'/>
     <Text style={styles.underBar}>{completedHikes.length} out of 14</Text>
     
    
      {completedHikes.length === 0 ? (
        <Text style={styles.noHikes}>You have no completed hikes yet!</Text>
      ) : (
          <FlatList
              data={completedHikes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderHike} />
      )}
      <Confetti
        run={completedHikes.length === 14}
        width={width}
        height={height}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  underBar: {
    textAlign: 'center', 
    fontSize: 13,
    margin: 10,
  },
  progressText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  progress: {
     display: 'flex',
     padding: 10,
  },
  progcontainer:{
    display: 'flex',
    margin: 10,
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  hikeCard: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  hikeImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  hikeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  hikeInfo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  hikeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  hikeDistance: {
    fontSize: 16,
    color: '#333',
  },
  noHikes: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  progressBar: {
    justifyContent:"center",
    alignItems:"center",
  },
});
