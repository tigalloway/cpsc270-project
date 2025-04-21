import React from 'react';
import { Modal, View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';

interface CompleteHikeModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDifficultyRating: React.Dispatch<React.SetStateAction<number>>;
  difficultyRating: number;
  setExperienceRating: React.Dispatch<React.SetStateAction<number>>;
  experienceRating: number;
  userExperience: string;
  setUserExperience: React.Dispatch<React.SetStateAction<string>>;
  selectedHike: any;
  completeHike: (hike: any, difficulty: number, experience: number) => void;
  setSelectedHike: React.Dispatch<React.SetStateAction<any>>;
}

const CompleteHikeModal: React.FC<CompleteHikeModalProps> = ({
  modalVisible,
  setModalVisible,
  setDifficultyRating,
  difficultyRating,
  setExperienceRating,
  experienceRating,
  userExperience,
  setUserExperience,
  selectedHike,
  completeHike,
  setSelectedHike
}) => {

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modal}>
        <Text style={styles.modalTitle}>Rate Your Hike</Text>
        <Text style={styles.modalText}>Difficulty:</Text>
        <Rating
          showRating
          onFinishRating={setDifficultyRating}
          startingValue={difficultyRating}
          imageSize={30}
        />
        <Text style={styles.modalText}>Experience:</Text>
        <Rating
          showRating
          onFinishRating={setExperienceRating}
          startingValue={experienceRating}
          imageSize={30}
        />
        <Text style={styles.modalText}>Describe your experience:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Share your experience!"
          multiline={true}
          value={userExperience}
          onChangeText={setUserExperience}
        />
        <Button
          title="Save Rating"
          onPress={() => {
            if (selectedHike) {
              completeHike(selectedHike, difficultyRating, experienceRating);
              setModalVisible(false);
              setSelectedHike(null);
              setDifficultyRating(0);
              setExperienceRating(0);
              setUserExperience('');
            }
          }}
        />
        <Button title="Cancel" onPress={() => setModalVisible(false)} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  modalText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  textInput: {
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
  },
});

export default CompleteHikeModal;



