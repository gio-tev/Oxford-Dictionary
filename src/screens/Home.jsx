import { View, StyleSheet } from 'react-native';

import Search from '../components/Search';
import Results from '../components/Results';
import { useSelector } from 'react-redux';

const Home = () => {
  const { searchData } = useSelector(state => state.data);
  const { noResults } = useSelector(state => state.data);

  return (
    <View style={styles.container}>
      <Search />
      <Results data={searchData} noResults={noResults} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
