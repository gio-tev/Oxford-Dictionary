import { View, Text, FlatList, StyleSheet } from 'react-native';

import ResultItem from './ResultItem';

const Results = ({ data, noResults }) => (
  <View style={styles.container}>
    {!noResults && data.length > 0 && (
      <FlatList
        data={data}
        renderItem={({ item }) => <ResultItem item={item} />}
        keyExtractor={item => item.word}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      />
    )}

    {noResults && <Text style={styles.text}>Nothing found</Text>}
  </View>
);

export default Results;

const styles = StyleSheet.create({
  container: {
    // borderTopColor: 'grey',
    // borderTopWidth: 0.3,
    // borderStyle: 'dotted',
    // backgroundColor: '#EBEEF2',
    borderRadius: 5,
    width: '90%',
    height: '90%',
    marginTop: 10,
    // marginBottom: 60,
    alignItems: 'center',
    // paddingHorizontal: 10,
  },
  text: {
    // color: colors.primaryCream,
  },
});
