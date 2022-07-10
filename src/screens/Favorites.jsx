import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../utils/colors';

const Favorites = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favorites</Text>
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlack,
  },
  text: {
    color: 'white',
  },
});
