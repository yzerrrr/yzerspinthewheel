import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, TextInput, StyleSheet, Alert } from 'react-native';

const initialRewards = [""];

export default function App() {
  const [rewards, setRewards] = useState(initialRewards); // Rewards array state
  const [result, setResult] = useState('');
  const [newReward, setNewReward] = useState(''); // New reward input state
  const spinAnim = useRef(new Animated.Value(0)).current;

  // Function to spin the wheel
  const spinWheel = () => {
    const randomIndex = Math.floor(Math.random() * rewards.length);
    const angle = 3600 + randomIndex * (360 / rewards.length);

    Animated.timing(spinAnim, {
      toValue: angle,
      duration: 4000,
      useNativeDriver: true,
    }).start(() => {
      setResult(`You got: ${rewards[randomIndex]}`);
    });
  };

  // Function to add a new reward to the wheel
  const addReward = () => {
    if (newReward.trim() !== '') {
      setRewards([...rewards, newReward]);
      setNewReward(''); // Clear the input after adding
    }
  };

  // Function to remove a specific reward from the list
  const removeReward = (rewardToRemove: string) => {
    Alert.alert(
      "Remove Reward",
      `Are you sure you want to remove "${rewardToRemove}"?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            const updatedRewards = rewards.filter(reward => reward !== rewardToRemove);
            setRewards(updatedRewards);
          }
        }
      ]
    );
  };

  // Interpolating the spin animation
  const spin = spinAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.wheel, { transform: [{ rotate: spin }] }]}>
        <Text style={styles.wheelText}>🎡</Text>
      </Animated.View>

      <TouchableOpacity style={styles.button} onPress={spinWheel}>
        <Text style={styles.buttonText}>Spin</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={newReward}
        onChangeText={setNewReward}
        placeholder="Enter a new reward"
      />
      <TouchableOpacity style={styles.addButton} onPress={addReward}>
        <Text style={styles.addButtonText}>Add Reward</Text>
      </TouchableOpacity>

      <Text style={styles.resultText}>{result}</Text>

      {/* Display the current rewards */}
      <View style={styles.rewardsContainer}>
        <Text style={styles.rewardsHeader}>Rewards:</Text>
        {rewards.map((reward, index) => (
          <View key={index} style={styles.rewardItemContainer}>
            <Text style={styles.rewardItem}>{reward}</Text>
            <TouchableOpacity 
              style={styles.removeButton} 
              onPress={() => removeReward(reward)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  wheel: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  wheelText: {
    fontSize: 60,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    paddingLeft: 10,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  resultText: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
  rewardsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  rewardsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rewardItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  rewardItem: {
    fontSize: 16,
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
