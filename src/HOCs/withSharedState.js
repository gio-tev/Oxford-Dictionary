import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Audio } from 'expo-av';

import { dataActions } from '../store';
import { getAudio } from '../utils/https';
import { showToast } from '../utils/toast';
import { insertFavorite, deleteFavorite } from '../utils/database';

const withSharedState = WrappedComponent => {
  return props => {
    const dispatch = useDispatch();

    const [audio, setAudio] = useState();
    const [audioPressed, setAudioPressed] = useState(false);

    useEffect(() => {
      return audio ? () => audio.unloadAsync() : undefined;
    }, [audio]);

    const handleAudioPress = async (word, uri) => {
      setAudioPressed(true);

      const audioUri = word ? await getAudio(word) : uri;

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

    const handleFavoritesPress = item => {
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

    return (
      <WrappedComponent
        {...props}
        audioPressed={audioPressed}
        handleAudioPress={handleAudioPress}
        handleFavoritesPress={handleFavoritesPress}
      />
    );
  };
};

export default withSharedState;
