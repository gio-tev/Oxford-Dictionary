import { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import Button from './UI/Button';
import { colors } from '../utils/colors';
import { getAudio } from '../utils/https';
import { showToast } from '../utils/toast';
import { getWordDetails } from '../utils/https';
import { dataActions } from '../store';

const ResultItem = ({ item }) => {
  const { darkMode } = useSelector(state => state.theme);
  const dispatch = useDispatch();

  const [audio, setAudio] = useState();
  const [audioPressed, setAudioPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  // console.log(item, '............////////...........');

  useEffect(() => {
    return audio
      ? () => {
          console.log('Unloading Sound');
          audio.unloadAsync();
        }
      : undefined;
  }, [audio]);

  const handleWordPress = async () => {
    setIsLoading(true);

    const data = await getWordDetails(item.word);

    if (!data.error) navigation.navigate('WordDetails', { data });

    setIsLoading(false);
  };

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

  const handleFavoritesPress = async () => {
    dispatch(dataActions.setFavIconPressed(item.word));

    // dispatch(dataActions.setFavorites(item.word));
    dispatch(dataActions.setFavorites(item));
  };

  const borderBottomColor = darkMode ? colors.darkGrey : colors.lightGrey;

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomColor: colors.primaryGrey,
    // borderBottomColor: '#E0E0E0',
    borderBottomWidth: 0.25,
    // borderStyle: 'dotted',
    paddingHorizontal: 5,
    marginVertical: 2.5,
    // marginBottom: 5,
  },
  btnIndicatorContainer: {
    flexDirection: 'row',
    width: '82%',
  },
  btn: {
    width: '86%',
    // borderWidth: 1,
  },
  text: {
    paddingVertical: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '18%',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
});
