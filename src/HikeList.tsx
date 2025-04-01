import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';

import hikesData from './assets/hikes_data.json'; 

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

  return (
    <ScrollView style={styles.container}>
      {!selectedHike ? (
        <>
          <Text style={styles.title}>Local Hikes</Text>
          <View style={styles.hikeGrid}>
            {hikesData.map((hike: Hike) => (
              <TouchableOpacity key={hike.id} style={styles.hikeBox} onPress={() => setSelectedHike(hike)}>
                <Image source={{ uri: hike.image_url }} style={styles.hikeImage} />
                <Text style={styles.hikeName}>{hike.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <View style={styles.hikeDetails}>
          <TouchableOpacity onPress={() => setSelectedHike(null)}>
            <Text style={styles.backButton}>Back to List</Text>
          </TouchableOpacity>
          <Text style={styles.hikeTitle}>{selectedHike.name}</Text>
          <Image source={{ uri: selectedHike.image_url }} style={styles.hikeDetailImage} />
          <Text style={styles.hikeDescription}>{selectedHike.description}</Text>
          <Text><Text style={styles.label}>Distance:</Text> {selectedHike.distance}</Text>
          <Text><Text style={styles.label}>Difficulty:</Text> {selectedHike.difficulty}</Text>

          {}
          <TouchableOpacity onPress={() => Linking.openURL(selectedHike.location_url)}>
            <Text style={styles.locationLink}>View on Map</Text>
          </TouchableOpacity>
        </View>
      )}
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
    width: '48%',
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
  hikeDetails: {
    marginTop: 16,
  },
  backButton: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 12,
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
    color: '#007BFF',
    marginTop: 12,
    textDecorationLine: 'underline',
  },
});

export default HikeList;
