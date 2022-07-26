import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import ResultItem from './ResultItem';

const Results = ({ data, noResults }) => {
  const { darkMode } = useSelector(state => state.theme);

  const color = darkMode ? 'white' : 'black';

  return (
    <View style={styles.container}>
      {!noResults && data.length > 0 && (
        <FlatList
          data={data}
          renderItem={({ item }) => <ResultItem item={item} />}
          keyExtractor={item => item.word}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        />
      )}

      {noResults && <Text style={[styles.text, { color, marginTop: 40 }]}>Nothing found</Text>}
    </View>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '90%',
    height: '90%',
    marginTop: 10,
    borderRadius: 5,
  },
});
