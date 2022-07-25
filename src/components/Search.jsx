import { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useDebounce } from 'use-debounce';

import { colors } from '../utils/colors';
import { searchWords } from '../utils/https';
import { dataActions } from '../store';

const Search = () => {
  const darkMode = useSelector(state => state.theme.darkMode);
  const noResults = useSelector(state => state.data.noResults);
  const searchData = useSelector(state => state.data.searchData);
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [value] = useDebounce(text, 500);

  const handleInput = input => {
    if (input.length === 0) dispatch(dataActions.setSearchData([]));

    if (noResults) dispatch(dataActions.setNoResults(false));

    setText(input.trim());
  };

  useEffect(() => {
    const fetchWords = async () => {
      const data = await searchWords(value);

      if (!data.error) {
        if (data.results.length === 0) {
          dispatch(dataActions.setSearchData(data.results));
          return dispatch(dataActions.setNoResults(true));
        }

        const searchResults = data.results
          .map(el => el.word)
          .filter(el => el.length < 15)
          .sort((a, b) => (a === value && -1) || (b === value && 1) || 0)
          .map(el => {
            return {
              word: el,
              favIconPressed: false,
            };
          });

        // console.log(searchResults);

        dispatch(dataActions.setSearchData(searchResults));
      }
    };
    fetchWords();
  }, [value]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? colors.primaryGrey : colors.inputLightBg },
      ]}
    >
      <Ionicons style={styles.searchIcon} name="search" size={24} color={colors.primarySky} />
      <TextInput
        style={[styles.input, { color: darkMode ? 'white' : 'black' }]}
        onChangeText={handleInput}
        placeholder="Search..."
        placeholderTextColor={darkMode ? 'white' : 'black'}
        selectionColor={darkMode ? 'white' : 'black'}
        autoCapitalize="none"
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#EBEEF2',
    // backgroundColor: 'white',
    width: '90%',
    borderRadius: 5,
    // paddingVertical: 5,
    // marginBottom: 50,
  },
  searchIcon: {
    paddingLeft: 15,
    width: '15%',
  },
  input: {
    borderRadius: 5,
    height: 45,
    width: '85%',
  },
});
