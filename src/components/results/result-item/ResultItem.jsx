import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import getStyles from './styles';
import Button from '../../UI/Button';
import { colors } from '../../../utils/colors';
import { getWordDetails } from '../../../utils/https';
import withSharedState from '../../../HOCs/withSharedState';

const ResultItem = ({ item, audioPressed, handleAudioPress, handleFavoritePress }) => {
  const styles = getStyles();

  const { darkMode } = useSelector(state => state.theme);

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleWordPress = async () => {
    setIsLoading(true);

    const data = await getWordDetails(item.word);

    if (!data.error) navigation.navigate('WordDetails', { data, item });

    setIsLoading(false);
  };

  const borderBottomColor = darkMode ? colors.mediumGrey : colors.lightGrey;

  const starIcon = (
    <FontAwesome name={item.favIconPressed ? 'star' : 'star-o'} size={20} color="grey" />
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
        <Button icon={audioIcon} onPress={() => handleAudioPress(item.word)} />
        <Button icon={starIcon} onPress={() => handleFavoritePress(item)} />
      </View>
    </View>
  );
};

export default withSharedState(ResultItem);
