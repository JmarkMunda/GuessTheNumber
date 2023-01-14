import { View, StyleSheet, Alert, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionText from "../components/ui/InstructionText";
import Card from "../components/ui/Card";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomNumber(min, max, exclude) {
  const randomNumber = Math.floor(Math.random() * (max - min) + min);

  if (randomNumber === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return randomNumber;
  }
}

let MIN_BOUNDARY = 1;
let MAX_BOUNDARY = 100;

const GameScreen = ({ userNumber, onGameOverScreen }) => {
  const initialGuess = generateRandomNumber(1, 100, userNumber);
  const [currentGuest, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuest === userNumber) {
      onGameOverScreen(guessRounds.length);
    }
  }, [currentGuest, userNumber, onGameOverScreen]);

  useEffect(() => {
    MIN_BOUNDARY = 1;
    MAX_BOUNDARY = 100;
  }, []);

  function nextGuessHandler(direction) {
    // direction => 'greater' or 'lower'
    if (
      (direction === "lower" && currentGuest < userNumber) ||
      (direction === "greater" && currentGuest > userNumber)
    ) {
      Alert.alert("Don't lie!", "'You know that this is wrong...'", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      MAX_BOUNDARY = currentGuest;
    } else {
      MIN_BOUNDARY = currentGuest + 1;
    }
    const newRndNumber = generateRandomNumber(
      MIN_BOUNDARY,
      MAX_BOUNDARY,
      currentGuest
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prev) => [newRndNumber, ...prev]);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuest}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={({ item, index }) => (
            <GuessLogItem roundNumber={guessRounds.length - index} guess={item}>
              {item}
            </GuessLogItem>
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
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
