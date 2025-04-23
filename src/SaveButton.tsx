import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Hike {
  id: number;
  name: string;
  difficulty: string;
  image_url: string;
  distance: string;
  location_url: string;
  description: string;
}

interface SaveButtonProps {
  hike: Hike;
  savedHikeIds: Set<number>;
  setSavedHikeIds: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const SaveButton: React.FC<SaveButtonProps> = ({ hike, savedHikeIds, setSavedHikeIds }) => {
  const handleSave = async () => {
    const saved = await AsyncStorage.getItem('savedHikes');
    const savedHikes = saved ? JSON.parse(saved) : [];
    const alreadySaved = savedHikes.find((h: Hike) => h.id === hike.id);
    if (!alreadySaved) {
      savedHikes.push(hike);
      await AsyncStorage.setItem('savedHikes', JSON.stringify(savedHikes));
      setSavedHikeIds((prev) => new Set(prev).add(hike.id));
    }
  };

  return (
    <TouchableOpacity
      onPress={handleSave}
      style={[styles.button, { backgroundColor: 'green' }]}
      disabled={savedHikeIds.has(hike.id)}
    >
      <Text style={styles.buttonText}>
        {savedHikeIds.has(hike.id) ? 'Saved' : 'Save to List'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SaveButton;
