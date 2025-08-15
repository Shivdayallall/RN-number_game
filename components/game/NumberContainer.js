import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const NumberContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
};

export default NumberContainer;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: '#ddbf5e',
    padding: 24,
    margin: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: '#ddbf5e',
    fontSize: 36,
    fontWeight: 'bold',
  },
});
