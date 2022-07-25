import { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { wordVariables } from '../utils/variables';
import Button from '../components/UI/Button';
import { colors } from '../utils/colors';

const WordDetails = ({ route }) => {
  const { darkMode } = useSelector(state => state.theme);

  const [audio, setAudio] = useState();
  const [audioPressed, setAudioPressed] = useState(false);

  const { data } = route.params;

  const {
    word,
    definition,
    lexicalCategory,
    etymology,
    audioUri,
    dialect,
    example,
    phoneticSpelling,
    synonyms,
  } = wordVariables(data);

  useEffect(() => {
    return audio
      ? () => {
          console.log('Unloading Sound');
          audio.unloadAsync();
        }
      : undefined;
  }, [audio]);

  const handleAudioPress = async () => {
    setAudioPressed(true);

    const { sound } = await Audio.Sound.createAsync({
      uri: audioUri,
    });

    setAudio(sound);

    await sound.playAsync();
    setAudioPressed(false);
  };

  const color = darkMode ? 'white' : 'black';
  const legendBg = darkMode ? colors.primaryBlack : 'white';
  const synonymsBg = darkMode ? colors.lightBlack : colors.inputLightBg;
  const borderWidth = darkMode ? 0.25 : 0.4;

  const starIcon = <FontAwesome name="star-o" size={22} color={colors.primaryGrey} />;
  const audioIcon = (
    <AntDesign name="sound" size={20} color={audioPressed ? 'grey' : colors.primarySky} />
  );

  return (
    // <View style={{ flex: 1, alignItems: 'center' }}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={{ color }}>{dialect}</Text>
        <Button pressable={styles.btn} icon={starIcon} />
      </View>

      <View style={styles.innerContainer}>
        <Text style={[styles.word, { color }]}>{word}</Text>
        <Text style={{ color }}>{phoneticSpelling}</Text>
      </View>

      <View style={styles.innerContainer}>
        <Text style={{ color }}> {lexicalCategory}</Text>
        <Button pressable={styles.btn} icon={audioIcon} onPress={handleAudioPress} />
      </View>

      {definition && (
        <View style={styles.innerContainer}>
          <Text style={{ color }}>- {definition}</Text>
        </View>
      )}

      {example && (
        <View style={styles.innerContainer}>
          <Text style={{ color }}>- {example}</Text>
        </View>
      )}

      {etymology && (
        <View style={styles.innerContainer}>
          {etymology && <Text style={{ color }}>- {etymology}</Text>}
        </View>
      )}

      {synonyms && (
        <View style={[styles.fieldSet, { borderWidth }]}>
          <Text style={[styles.legend, { backgroundColor: legendBg, color }]}>Synonyms</Text>

          <View style={styles.synonymsContainer}>
            {synonyms.map(syn => (
              <View
                style={[styles.synonym, { backgroundColor: synonymsBg }]}
                key={Date.now() * Math.random()}
              >
                <Text style={{ color }}>{syn}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
    // {/* </View> */}
  );
};

export default WordDetails;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '85%',
    marginVertical: 8,
  },
  word: {
    fontSize: 35,
    marginRight: 10,
  },
  btn: {
    marginLeft: 10,
  },
  fieldSet: {
    marginTop: 40,
    width: '90%',
    // paddingTop: 20,
    // paddingHorizontal: 20,
    padding: 20,
    // paddingTop: 20,
    // paddingBottom: 30,
    borderColor: colors.primarySky,
    marginBottom: 30,
    borderRadius: 20,
  },
  legend: {
    position: 'absolute',
    top: -12,
    left: 10,
    fontWeight: '500',
    fontSize: 16,
    paddingHorizontal: 15,
    // paddingBottom: 15,
    // padding: 10,
  },
  synonymsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  synonym: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    margin: 5,
  },
});
