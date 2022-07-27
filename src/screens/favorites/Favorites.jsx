import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import Results from '../../components/results/Results';

const Favorites = () => {
  const { favorites } = useSelector(state => state.data);
  const { darkMode } = useSelector(state => state.theme);

  const color = darkMode ? 'white' : 'black';

  return (
    <View style={{ alignItems: 'center' }}>
      {favorites.length === 0 && <Text style={{ color, marginTop: 60 }}>Nothing found</Text>}
      {favorites.length > 0 && <Results data={favorites} />}
    </View>
  );
};

export default Favorites;
