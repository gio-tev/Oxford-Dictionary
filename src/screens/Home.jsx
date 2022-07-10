import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import { colors } from '../utils/colors';
import Search from '../components/Search';
import Results from '../components/Results';

const Home = () => {
  return (
    <View style={styles.container}>
      <Search />
      <Results />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlack,
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});
