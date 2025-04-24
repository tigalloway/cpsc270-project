import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
} from "react-native";

interface HikeInfoProps {
  selectedHike: any;
  setSelectedHike: React.Dispatch<React.SetStateAction<any>>;
  distance: string;
  difficulty: string;
  locationUrl: string;
}

const HikeInfo: React.FC<HikeInfoProps> = ({ selectedHike, setSelectedHike }) => {
  return (
    <View style={{ marginTop: 16 }}>
      <TouchableOpacity
        onPress={() => setSelectedHike(null)}
        style={styles.backButtonContainer}
      >
        <Text style={styles.backButton}>Back to List</Text>
      </TouchableOpacity>

      <Text style={styles.hikeTitle}>{selectedHike.name}</Text>
      <Image
        source={{ uri: selectedHike.image_url }}
        style={styles.hikeDetailImage}
      />

      <Text style={styles.hikeDescription}>{selectedHike.description}</Text>
      <Text>
        <Text style={styles.label}>Distance from RC: </Text>
        {selectedHike.distance}
      </Text>
      <Text>
        <Text style={styles.label}>Difficulty: </Text>
        {selectedHike.difficulty}
      </Text>

      <TouchableOpacity
        onPress={() => Linking.openURL(selectedHike.location_url)}
      >
        <Text style={styles.locationLink}>View on Map</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    flex: 1,
    alignItems: "flex-start",
    marginBottom: 16,
  },
  backButton: {
    fontSize: 16,
    color: "orange",
  },
  hikeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  hikeDetailImage: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  hikeDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
  },
  locationLink: {
    fontSize: 16,
    color: "orange",
    marginTop: 12,
    textDecorationLine: "underline",
  },
});

export default HikeInfo;
