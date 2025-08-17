import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';

import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/PrimaryButton.js';
import GuessLog from '../components/game/GuessLog.js';

// Utility function to help generate a random number
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

// Global veriable for the boundries
let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  // State for users initial guess
  const initialGuess = generateRandomBetween(1, 100, userNumber);

  // Set up state for current guess
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  // State for logging attempts to screen
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  // check if the current number is equal to the current user guess
  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRoundLength.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert(
        'LIAR!!!',
        'Why you lying?, Why you always lying?, Stop freaking lying.',
        [{ text: 'Sorry!', style: 'cancel' }]
      );
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRandomNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRandomNumber);
    setGuessRounds((prevGuessRounds) => [newRandomNumber, ...prevGuessRounds]);
  };

  // GuessRound list length
  const guessRoundLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Opponents's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>

      <View>
        <Text>Higher or Lower?</Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
            +
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
            -
          </PrimaryButton>
        </View>
      </View>
      <View style={styles.listContainer}>
        {/* {guessRounds.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text>
        ))} */}

        {/* Render the amount of rounds the using a flat list */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLog
              roundNumber={guessRoundLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
  },
  guessRoundContainer: {
    borderColor: 'yellow',
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    flexDirection: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
