import { ScrollView, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import getStyles from './styles';
import Button from '../../components/UI/Button';
import { wordVariables } from '../../utils/variables';
import { colors } from '../../utils/colors';
import withSharedState from '../../HOCs/withSharedState';

const WordDetails = ({ route, audioPressed, handleAudioPress, handleFavoritePress }) => {
  const styles = getStyles();

  const { darkMode } = useSelector(state => state.theme);
  const { searchedData } = useSelector(state => state.data);
  const { favorites } = useSelector(state => state.data);

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

  const color = darkMode ? 'white' : 'black';
  const legendBg = darkMode ? colors.primaryBlack : 'white';
  const synonymsBg = darkMode ? colors.lightBlack : colors.inputLightBg;
  const borderWidth = darkMode ? 0.25 : 0.4;

  const currentSearchedItemState = searchedData.filter(el => el.word === item.word)[0];
  const currentFavoriteItemState = favorites.filter(el => el.word === item.word)[0];

  const currentItemState = currentSearchedItemState
    ? currentSearchedItemState
    : currentFavoriteItemState;

  const itemOnFavoritePress = currentItemState
    ? currentItemState
    : { word: item.word, favIconPressed: false };

  const starIcon = (
    <FontAwesome
      name={currentItemState?.favIconPressed ? 'star' : 'star-o'}
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
        <Button
          pressable={styles.btn}
          icon={starIcon}
          onPress={() => handleFavoritePress(itemOnFavoritePress)}
        />
      </View>

      <View style={styles.innerContainer}>
        <Text style={[styles.word, { color }]}>{word}</Text>
        <Text style={{ color }}>{phoneticSpelling}</Text>
      </View>

      <View style={styles.innerContainer}>
        <Text style={{ color }}> {lexicalCategory}</Text>
        <Button
          pressable={styles.btn}
          icon={audioIcon}
          onPress={() => handleAudioPress(null, audioUri)}
        />
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

export default withSharedState(WordDetails);
