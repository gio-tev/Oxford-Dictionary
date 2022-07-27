import { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { dataActions } from '../../store';
import Button from '../../components/UI/Button';
import { wordVariables } from '../../utils/variables';
import { colors } from '../../utils/colors';
import { showToast } from '../../utils/toast';
import { insertFavorite, deleteFavorite } from '../../utils/database';
import getStyles from './styles';

const WordDetails = ({ route }) => {
  const styles = getStyles();

  const { darkMode } = useSelector(state => state.theme);
  const { searchData } = useSelector(state => state.data);
  const { favorites } = useSelector(state => state.data);
  const dispatch = useDispatch();

  const [audio, setAudio] = useState();
  const [audioPressed, setAudioPressed] = useState(false);

  const { data, item } = route.params;

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
          audio.unloadAsync();
        }
      : undefined;
  }, [audio]);

  const handleAudioPress = async () => {
    setAudioPressed(true);

    if (!audioUri || audioUri.error) {
      showToast('No audio');
      setAudioPressed(false);
      return;
    }

    if (audioUri) {
      const { sound } = await Audio.Sound.createAsync({
        uri: audioUri,
      });

      setAudio(sound);

      await sound.playAsync();
    }
    setAudioPressed(false);
  };

  const handleFavoritesPress = () => {
    dispatch(dataActions.setFavIconPressed(item.word));

    if (!item.favIconPressed) {
      insertFavorite({
        word: item.word,
        favIconPressed: true,
      });
    } else {
      deleteFavorite(item.word);
    }

    dispatch(dataActions.setFavorites(item));
  };

  const color = darkMode ? 'white' : 'black';
  const legendBg = darkMode ? colors.primaryBlack : 'white';
  const synonymsBg = darkMode ? colors.lightBlack : colors.inputLightBg;
  const borderWidth = darkMode ? 0.25 : 0.4;

  const currentSearchDataState = searchData.filter(el => el.word === item.word);
  const currentFavoritesState = favorites.filter(el => el.word === item.word);

  const starIcon = (
    <FontAwesome
      name={
        currentSearchDataState[0] && currentSearchDataState[0].favIconPressed
          ? 'star'
          : currentFavoritesState[0] && currentFavoritesState[0].favIconPressed
          ? 'star'
          : 'star-o'
      }
      size={22}
      color={colors.primaryGrey}
    />
  );
  const audioIcon = (
    <AntDesign name="sound" size={20} color={audioPressed ? 'grey' : colors.primarySky} />
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={{ color }}>{dialect}</Text>
        <Button pressable={styles.btn} icon={starIcon} onPress={handleFavoritesPress} />
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
              <View style={[styles.synonym, { backgroundColor: synonymsBg }]} key={syn}>
                <Text style={{ color }}>{syn}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default WordDetails;
