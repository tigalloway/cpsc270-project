import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CompleteHikeButtonProps {
  onPress: () => void;
  isCompleted: boolean;
  disabled: boolean;
}

const CompleteHikeButton: React.FC<CompleteHikeButtonProps> = ({ onPress, isCompleted, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.completeButton, isCompleted ? styles.completedButton : null]}
      disabled={disabled}
    >
      <Text style={styles.completeButtonText}>
        {isCompleted ? 'Completed' : 'Mark as Complete'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  completeButton: {
    backgroundColor: '#28a745', 
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  completedButton: {
    backgroundColor: '#888', 
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CompleteHikeButton;
