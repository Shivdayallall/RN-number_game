import { StyleSheet, TextInput, View, Alert, Text } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

import { useState } from 'react';

const StartGameScreen = ({ onPickedNumber }) => {
  // Declare the state for textinput field
  const [enteredNumber, setEnteredNumber] = useState('');

  // Update the textinput field to display the value the user enters
  const numberInputHandler = (enteredText) => {
    // update the state with the numbered entered
    setEnteredNumber(enteredText);
  };

  // Reset the textinput field for invalid number, when the alert pops up.
  const resetInvalidInputHandler = () => {
    setEnteredNumber('');
  };

  // Validate the number enter is greater than 0
  const confirmInputHandler = () => {
    const userChosenNumber = parseInt(enteredNumber);

    if (
      isNaN(userChosenNumber) ||
      userChosenNumber <= 0 ||
      userChosenNumber > 99
    ) {
      Alert.alert('Invalid number!', 'Number must be between 1 and 99.', [
        {
          text: 'Okay',
          style: 'destructive',
          onPress: resetInvalidInputHandler,
        },
      ]);
      return;
    }

    onPickedNumber(userChosenNumber);
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Opponents's Guess</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.placeholderText}>Enter a number</Text>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType='number-pad'
          value={enteredNumber}
          onChangeText={numberInputHandler}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInvalidInputHandler}>
              Reset
            </PrimaryButton>
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: '#72063c',
    borderRadius: 8,

    // this is how we apply shadow to android elements
    elevation: 4,

    // below is how we set shadow for IOS elements
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: '#ddb52f',
    borderBottomWidth: 2,
    color: '#ddb52f',
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
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
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  placeholderText: {
    color: '#ddb52f',
    fontSize: 24,
  },
});
