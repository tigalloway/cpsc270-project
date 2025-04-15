import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

interface Hike {
  id: number;
  name: string;
  difficulty: string;
  image_url: string;
  distance: string;
  location_url: string;
  description: string;
}

export function SavedHikes() {
  const [savedHikes, setSavedHikes] = useState<Hike[]>([]);

  const fetchSavedHikes = async () => {
    const saved = await AsyncStorage.getItem('savedHikes');
    const hikes = saved ? JSON.parse(saved) : [];
    setSavedHikes(hikes);
  };

  const deleteHike = async (id: number) => {
    const updatedHikes = savedHikes.filter((hike) => hike.id !== id);
    await AsyncStorage.setItem('savedHikes', JSON.stringify(updatedHikes));
    setSavedHikes(updatedHikes);
  };

  useFocusEffect(
    useCallback(() => {
      fetchSavedHikes();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Saved Hikes</Text>
      {savedHikes.length === 0 ? (
        <Text style={styles.empty}>You haven’t saved any hikes yet.</Text>
      ) : (
        savedHikes.map((hike) => (
          <View key={hike.id} style={styles.card}>
            <Image source={{ uri: hike.image_url }} style={styles.image} />
            <Text style={styles.name}>{hike.name}</Text>
            <Text style={styles.details}>Distance: {hike.distance} miles</Text>
            <Text style={styles.details}>Difficulty: {hike.difficulty}</Text>
            <Text style={styles.details}>Description: {hike.description}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteHike(hike.id)}
            >
              <Text style={styles.deleteButtonText}>🗑️ Remove</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  empty: {
    fontSize: 16,
    color: '#555',
    marginTop: 20,
  },
  card: {
    width: '100%',
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f1f1f1',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  locationButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 8,
    alignItems: 'center',
  },
  locationButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});



