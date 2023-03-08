import { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useDebounce } from 'use-debounce';

import { colors } from '../../utils/colors';
import { searchWords } from '../../utils/https';
import { dataActions } from '../../store';
import getStyles from './styles';

const Search = () => {
  const styles = getStyles();

  const { darkMode } = useSelector(state => state.theme);
  const { noResults } = useSelector(state => state.data);
  const { favorites } = useSelector(state => state.data);

  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [value] = useDebounce(text, 500);

  useEffect(() => {
    const getWords = async inputValue => {
      const data = await searchWords(inputValue);

      if (!data.error) {
        if (data.results.length === 0) {
          dispatch(dataActions.setSearchedData(data.results));

          return dispatch(dataActions.setNoResults(true));
        }

        const searchResults = data.results
          .filter(el => el.word.length < 15)
          .map(el => {
            return { word: el.word, favIconPressed: false };
          })
          .reduce((acc, curr) => {
            const sameItem = favorites.find(fav => fav.word === curr.word);

            if (sameItem) acc.push(sameItem);
            else acc.push(curr);
            return acc;
          }, []);

        dispatch(dataActions.setSearchedData(searchResults));
      }
    };
    getWords(value);
  }, [value]);

  const handleInput = input => {
    if (input.length === 0) dispatch(dataActions.setSearchedData([]));
    if (noResults) dispatch(dataActions.setNoResults(false));
    setText(input.trim());
  };

  const backgroundColor = darkMode ? colors.primaryGrey : colors.inputLightBg;
  const color = darkMode ? 'white' : 'black';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Ionicons style={styles.searchIcon} name="search" size={24} color={colors.primarySky} />

      <TextInput
        style={[styles.input, { color }]}
        onChangeText={handleInput}
        placeholder="Search..."
        placeholderTextColor={color}
        selectionColor={color}
        autoCapitalize="none"
      />
    </View>
  );
};

export default Search;
