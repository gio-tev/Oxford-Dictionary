import { View, FlatList, StyleSheet } from 'react-native';

import ResultItem from './ResultItem';

const DATA = [
  { word: 'Word 1' },
  { word: 'Word 2' },
  { word: 'Word 3' },
  { word: 'Word 4' },
  { word: 'Word 5' },
  { word: 'Word 6' },
  { word: 'Word 7' },
  { word: 'Word 8' },
  { word: 'Word 9' },
  { word: 'Word 10' },
  { word: 'Word 11' },
  { word: 'Word 22' },
  { word: 'Word 33' },
  { word: 'Word 44' },
  { word: 'Word 55' },
  { word: 'Word 66' },
  { word: 'Word 77' },
  { word: 'Word 88' },
  { word: 'Word 99' },
  { word: 'Word 100' },
];

const Results = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <ResultItem item={item} />}
        keyExtractor={item => item.word}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      />
    </View>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    // borderColor: 'red',
    // borderWidth: 1,
    width: '90%',
    marginTop: 10,
    marginBottom: 60,
  },
});
