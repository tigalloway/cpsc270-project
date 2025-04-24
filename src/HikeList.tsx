import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Linking, Modal, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import HikeFilter from './assets/dropDown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hikesData from './assets/hikes_data.json';
import CompleteHikeModal from './navigation/screens/CompleteHikeModal';
import CompleteHikeButton from './navigation/screens/CompleteHikeButton';
import HikeInfo from './navigation/screens/HikeInfo';
import { TextInput } from 'react-native-gesture-handler';
import SaveButton from './SaveButton';
import HikeBox from './HikeBox';

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
  const [hikeDifficulty, setHikeDifficulty] = useState<number | null>(0);
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
          <Text style={{color: "orange"}}>*Hikes are sorted by distance from Roanoke College</Text>
          <Text> </Text>
          <Text>Show hikes by difficulty:</Text>
          <HikeFilter 
            selected={hikeDifficulty}
            onChange={(val) => setHikeDifficulty(val)}></HikeFilter>
          <View>
            

          </View>
          <View style={styles.hikeGrid}>
            {[...hikesData].filter((hike) => {
              if (hikeDifficulty === 0) return true;
              const difficultyMap: { [key: string]: number } = {
                Beginner: 1,
                Intermediate: 2,
                Advanced: 3,
              };
              return difficultyMap[hike.difficulty] === hikeDifficulty;
            }).sort((first, last) => Number(first.distance) - Number(last.distance))
            .map((hike: Hike) => (<HikeBox
                key={hike.id}
                hike={hike}
                onSelect={setSelectedHike}
                isSaved={savedHikeIds.has(hike.id)}
                isCompleted={completedHikes.has(hike.id)}
              />
                ))}
          </View>
        </>
      ) : (
        <View style={styles.hikeDetails}>
          <HikeInfo
            selectedHike={selectedHike}
            setSelectedHike={setSelectedHike}
            distance={selectedHike.distance}
            difficulty={selectedHike.difficulty}
            locationUrl={selectedHike.location_url}
          />
          <CompleteHikeButton
              onPress={() => markAsComplete(selectedHike)}
              isCompleted={completedHikes.has(selectedHike.id)}
              disabled={completedHikes.has(selectedHike.id)}
            />
          <SaveButton hike={selectedHike} savedHikeIds={savedHikeIds} setSavedHikeIds={setSavedHikeIds} />

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