import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Linking, Modal, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hikesData from './assets/hikes_data.json';
import { TextInput } from 'react-native-gesture-handler';
import CompleteHikeModal from './navigation/screens/CompleteHikeModal';

interface Hike {
  id: number;
  name: string;
  difficulty: string;
  image_url: string;
  distance: string;
  location_url: string;
  description: string;
}

const HikeList: React.FC = () => {
  const [selectedHike, setSelectedHike] = useState<Hike | null>(null);
  const [completedHikes, setCompletedHikes] = useState<Set<number>>(new Set());
  const [savedHikeIds, setSavedHikeIds] = useState<Set<number>>(new Set());
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [difficultyRating, setDifficultyRating] = useState(0);
  const [experienceRating, setExperienceRating] = useState(0);
  const [userExperience, setUserExperience] = useState('');

  const completeHike = async (hike: Hike, difficulty: number, experience: number) => {
    const completedHike = {
      ...hike,
      difficultyRating: difficulty,
      experienceRating: experience,
      userExperience: userExperience,
    };

    const completedHikes = JSON.parse(await AsyncStorage.getItem('completedHikes') || '[]');
    completedHikes.push(completedHike);
    await AsyncStorage.setItem('completedHikes', JSON.stringify(completedHikes));

    setCompletedHikes((prevState) => new Set([...prevState, hike.id]));
  };

  const markAsComplete = (hike: Hike) => {
    if (!completedHikes.has(hike.id)) {
      setSelectedHike(hike);
      setModalVisible(true);
    }
  };


  useEffect(() => {
    const fetchCompletedHikes = async () => {
      const completedHikesData = await AsyncStorage.getItem('completedHikes');
      if (completedHikesData) {
        const completedHikes = JSON.parse(completedHikesData);
        const completedIds: Set<number> = new Set(completedHikes.map((hike: any) => hike.id));
        setCompletedHikes(completedIds);
      }
    };
    fetchCompletedHikes();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchSavedHikes = async () => {
        const saved = await AsyncStorage.getItem('savedHikes');
        if (saved) {
          const savedHikes = JSON.parse(saved);
          const ids: Set<number> = new Set<number>(savedHikes.map((hike: Hike) => hike.id));
          setSavedHikeIds(ids);
        } else {
          setSavedHikeIds(new Set());
        }
      };
      fetchSavedHikes();
    }, [])
  );  

  
  
    
  return (
    <ScrollView style={styles.container}>
      {!selectedHike ? (
        <>
          <Text style={styles.title}>Local Hikes</Text>
          <View style={styles.hikeGrid}>
            {hikesData.map((hike: Hike) => (
              <TouchableOpacity
                key={hike.id}
                style={styles.hikeBox}
                onPress={() => setSelectedHike(hike)} 
              >
                <Image source={{ uri: hike.image_url }} style={styles.hikeImage} />
                <Text style={styles.hikeName}>{hike.name}</Text>
                <Text style={styles.hikeDistance}>Distance: {hike.distance} miles</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <View style={styles.hikeDetails}>
          <TouchableOpacity onPress={() => setSelectedHike(null)} style={styles.backButtonContainer}>
            <Text style={styles.backButton}>Back to List</Text>
          </TouchableOpacity>

          <Text style={styles.hikeTitle}>{selectedHike.name}</Text>
          <Image source={{ uri: selectedHike.image_url }} style={styles.hikeDetailImage} />
          <Text style={styles.hikeDescription}>{selectedHike.description}</Text>
          <Text>
            <Text style={styles.label}>Distance:</Text> {selectedHike.distance}
          </Text>
          <Text>
            <Text style={styles.label}>Difficulty:</Text> {selectedHike.difficulty}
          </Text>

          <TouchableOpacity onPress={() => Linking.openURL(selectedHike.location_url)}>
            <Text style={styles.locationLink}>View on Map</Text>
          </TouchableOpacity>

      
          <TouchableOpacity
            onPress={() => markAsComplete(selectedHike)}
            style={[styles.completeButton, completedHikes.has(selectedHike.id) ? styles.completedButton : null]}
            disabled={completedHikes.has(selectedHike.id)}
          >
            <Text style={styles.completeButtonText}>
              {completedHikes.has(selectedHike.id) ? 'Completed' : 'Mark as Complete'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={async () => {
          const saved = await AsyncStorage.getItem('savedHikes');
          const savedHikes = saved ? JSON.parse(saved) : [];
          const alreadySaved = savedHikes.find((h: Hike) => h.id === selectedHike.id);
           if (!alreadySaved) {
            savedHikes.push(selectedHike);
            await AsyncStorage.setItem('savedHikes', JSON.stringify(savedHikes));
            setSavedHikeIds((prev) => new Set(prev).add(selectedHike.id));
           }
          }}
          style={[styles.completeButton, { backgroundColor: 'green' }]}>
          <Text style={styles.completeButtonText}>
           {savedHikeIds.has(selectedHike.id) ? 'Saved' : 'Save to List'}
         </Text>
         </TouchableOpacity>

        </View>
      )}
        <CompleteHikeModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setDifficultyRating={setDifficultyRating}
        difficultyRating={difficultyRating}
        setExperienceRating={setExperienceRating}
        experienceRating={experienceRating}
        userExperience={userExperience}
        setUserExperience={setUserExperience}
        selectedHike={selectedHike}
        completeHike={completeHike}
        setSelectedHike={setSelectedHike}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  hikeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  hikeBox: {
    width: '45%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    elevation: 3,
  },
  hikeImage: {
    width: '100%',
    height: 150,
  },
  hikeName: {
    fontSize: 18,
    fontWeight: '600',
    padding: 8,
  },
  hikeDistance: {
    fontSize: 14,
    color: '#555',
    paddingLeft: 8,
  },
  hikeDetails: {
    marginTop: 16,
  },
  backButtonContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  backButton: {
    fontSize: 16,
    color: 'orange',
  },
  completeButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  completedButton: {
    backgroundColor: '#888', 
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  hikeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  hikeDetailImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  hikeDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
  },
  locationLink: {
    fontSize: 16,
    color: 'orange',
    marginTop: 12,
    textDecorationLine: 'underline',
  },
});

export default HikeList;
