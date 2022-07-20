import { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Pressable, Text } from 'react-native';
import { useDebounce } from 'use-debounce';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import { colors } from '../utils/colors';
import Button from './UI/Button';
import { DefaultTheme } from '../utils/colors';

const Search = ({ getData }) => {
  const [text, setText] = useState('');
  // const [value] = useDebounce(text, 500);

  const [audios, setAudios] = useState();
  const [words, setWords] = useState([]);

  const handleInput = input => {
    if (!input.trim()) getData([]);
    setText(input.trim());
  };

  useEffect(() => {
    const fetchWords = async () => {
      if (text.length > 1) {
        const res = await fetch(
          // `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${value}?strictMatch=false`,
          `https://od-api.oxforddictionaries.com/api/v2/search/en-gb?q=${text}&prefix=true&limit=20
          `,
          {
            headers: {
              Accept: 'application/json',
              app_id: '038c6702',
              app_key: 'c722d5e7ebdbd5befe45a94f73033baa',
            },
          }
        );
        const data = await res.json();
        // const word = data.word;
        // const id = data.id;
        // const etymologies = data.results[0].lexicalEntries[0].entries[0].etymologies[0];
        // const audio =
        //   data.results[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile;
        // const dialects =
        //   data.results[0].lexicalEntries[0].entries[0].pronunciations[0].dialects[0];
        // const phoneticSpelling =
        //   data.results[0].lexicalEntries[0].entries[0].pronunciations[0].phoneticSpelling;
        // const definitions =
        //   data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
        // const inSentence =
        //   data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text;
        // const shortDefinitions =
        //   data.results[0].lexicalEntries[0].entries[0].senses[0].shortDefinitions[0];
        // const lexicalCategory = data.results[0].lexicalEntries[0].lexicalCategory.text;
        // const synonyms =
        //   data.results[0].lexicalEntries[0].entries[0].senses[0].synonyms?.map(
        //     el => el.text
        //   );

        if (!data.error) {
          const serachResults = data.results
            .filter(el => el.region === 'gb')
            .map(result => result.word);

          getData(serachResults);
          // console.log(serachResults);
        }
      }
    };
    fetchWords();
  }, [text]);

  // const test = async () => {
  //   const au = 'https://audio.oxforddictionaries.com/en/mp3/learning__gb_1.mp3';

  //   const { sound } = await Audio.Sound.createAsync({ uri: au });
  //   setAudios(sound);

  //   await sound.playAsync();
  // };

  // useEffect(() => {
  //   return audios
  //     ? () => {
  //         console.log('Unloading Sound');
  //         audios.unloadAsync();
  //       }
  //     : undefined;
  // }, [audios]);

  return (
    <View style={styles.container}>
      <Ionicons
        style={styles.searchIcon}
        name="search"
        size={24}
        color={DefaultTheme.colors.primary}
      />
      <TextInput
        style={styles.input}
        onChangeText={handleInput}
        placeholder="Search..."
        selectionColor={'grey'}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DEE8F2',
    backgroundColor: '#EBEEF2',
    // backgroundColor: 'white',
    width: '90%',
    // paddingVertical: 5,
    borderRadius: 5,
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
