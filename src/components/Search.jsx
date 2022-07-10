import { View, StyleSheet, TextInput } from 'react-native';
// import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

const Search = () => {
  return (
    <View style={styles.container}>
      <Ionicons
        style={styles.searchIcon}
        name="search"
        size={24}
        color={colors.primaryGreenDark}
      />
      <TextInput style={styles.input} placeholder="Search..." selectionColor={'grey'} />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryCream,
    width: '90%',
    marginTop: 10,
    borderRadius: 5,
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
