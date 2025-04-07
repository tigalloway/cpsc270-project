import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Linking } from 'react-native';
import hikes from '../../assets/hikes_data.json'; 

// Define a Hike class

class Hike {
  difficulty: string;
  id: number;
  name: string;
  image_url: string;
  distance: number;
  location_url: string;
  description: string;
  constructor(id: number, name: string, difficulty: string, image_url: string, distance: number, location_url: string, description: string) {
    this.id = id;
    this.name = name; 
    this.difficulty = difficulty;
    this.image_url = image_url;
    this.distance = distance;
    this.location_url = location_url;
    this.description = description;
  }
}

interface HikeListState {
  hikes: Hike[];
}

class HikeList extends Component<{}, HikeListState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      hikes: hikes.map((data) => new Hike(
      data.id,
      data.name, 
      data.difficulty, 
      data.image_url, 
      parseFloat(data.distance), 
      data.location_url, 
      data.description
      )),
    };
  }

  render() {
    const { hikes } = this.state;
    
    return (
      <ScrollView style={styles.container}>
        {hikes.map((hike) => (
          <View key={hike.id} style={styles.card}>
            <Text style={styles.title}>{hike.name}</Text>
            <Text style={styles.info}>Difficulty: {hike.difficulty}</Text>
            <Text style={styles.info}>Distance: {hike.distance} miles</Text>
            <Text style={styles.description}>{hike.description}</Text>
            <Image source={{ uri: hike.image_url }} style={styles.image} />
            <Text style={styles.link} onPress={() => Linking.openURL(hike.location_url)}>
              View on Google Maps
            </Text>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
  info: { fontSize: 16 },
  description: { fontSize: 14, marginTop: 10 },
  image: { width: 300, height: 200, borderRadius: 10, marginTop: 10 },
  link: { fontSize: 14, color: 'blue', marginTop: 5 },
});

export default HikeList;
