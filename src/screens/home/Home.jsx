import { View } from 'react-native';

import Search from '../../components/search/Search';
import Results from '../../components/results/Results';
import { useSelector } from 'react-redux';

const Home = () => {
  const { searchedData } = useSelector(state => state.data);
  const { noResults } = useSelector(state => state.data);

  return (
    <View style={{ alignItems: 'center' }}>
      <Search />
      <Results data={searchedData} noResults={noResults} />
    </View>
  );
};

export default Home;
