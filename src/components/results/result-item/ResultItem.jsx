import { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import getStyles from './styles';
import { dataActions } from '../../../store';
import Button from '../../UI/Button';
import { colors } from '../../../utils/colors';
import { getAudio } from '../../../utils/https';
import { showToast } from '../../../utils/toast';
import { getWordDetails } from '../../../utils/https';
import { deleteFavorite, insertFavorite } from '../../../utils/database';

const ResultItem = ({ item }) => {
  const styles = getStyles();

  const { darkMode } = useSelector(state => state.theme);
  const dispatch = useDispatch();

  const [audio, setAudio] = useState();
  const [audioPressed, setAudioPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    return audio
      ? () => {
          audio.unloadAsync();
        }
      : undefined;
  }, [audio]);

  const handleAudioPress = async () => {
    setAudioPressed(true);
    const audioUri = await getAudio(item.word);

    if (!audioUri || audioUri.error) {
      showToast('No audio');
      setAudioPressed(false);
      return;
    }

    const { sound } = await Audio.Sound.createAsync({
      uri: audioUri,
    });

    setAudio(sound);

    await sound.playAsync();
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

  const handleWordPress = async () => {
    setIsLoading(true);

    const data = await getWordDetails(item.word);

    if (!data.error) navigation.navigate('WordDetails', { data, item });

    setIsLoading(false);
  };

  const borderBottomColor = darkMode ? colors.mediumGrey : colors.lightGrey;

  const starIcon = (
    <FontAwesome
      name={item.favIconPressed ? 'star' : 'star-o'}
      size={20}
      color={colors.primaryGrey}
    />
  );
  const audioIcon = (
    <AntDesign name="sound" size={20} color={audioPressed ? 'grey' : colors.primarySky} />
  );

  return (
    <View style={[styles.container, { borderBottomColor }]}>
      <View style={styles.btnIndicatorContainer}>
        <Button
          pressable={({ pressed }) => [styles.btn, pressed && styles.pressed]}
          text={[styles.text, { color: darkMode ? 'white' : colors.primaryBlack }]}
          onPress={handleWordPress}
        >
          {item.word}
        </Button>
        {isLoading && <ActivityIndicator size="small" color="grey" />}
      </View>

      <View style={styles.iconsContainer}>
        <Button icon={audioIcon} onPress={handleAudioPress} />
        <Button icon={starIcon} onPress={handleFavoritesPress} />
      </View>
    </View>
  );
};

export default ResultItem;
