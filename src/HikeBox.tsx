import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';

interface Hike {
  id: number;
  name: string;
  difficulty: string;
  image_url: string;
  distance: string;
  location_url: string;
  description: string;
}

interface Props {
  hike: Hike;
  onSelect: (hike: Hike) => void;
  isSaved: boolean;
  isCompleted: boolean;
}

const HikeBox: React.FC<Props> = ({ hike, onSelect, isSaved, isCompleted }) => {
  return (
    <TouchableOpacity style={styles.hikeBox} onPress={() => onSelect(hike)}>
      <Image source={{ uri: hike.image_url }} style={styles.hikeImage} />
      <View style={styles.iconRow}>
        {isSaved && <Text style={styles.icon}>⭐</Text>}
        {isCompleted && <Text style={styles.icon}>✅</Text>}
      </View>
      <Text style={styles.hikeName}>{hike.name}</Text>
      <Text style={styles.hikeDistance}>Distance from RC: {hike.distance} miles</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    marginTop: 4,
  },
  icon: {
    fontSize: 18,
    marginLeft: 6,
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
});

export default HikeBox;

