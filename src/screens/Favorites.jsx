import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import Results from '../components/Results';

const Favorites = () => {
  const { favorites } = useSelector(state => state.data);
  const { darkMode } = useSelector(state => state.theme);

  const color = darkMode ? 'white' : 'black';

  return (
    <View style={styles.container}>
      {favorites.length === 0 && <Text style={[styles.noFavs, { color }]}>Nothing found</Text>}
      {favorites.length > 0 && <Results data={favorites} />}
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  noFavs: {
    marginTop: 60,
  },
});
