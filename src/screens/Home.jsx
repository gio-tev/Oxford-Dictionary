import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { colors } from '../utils/colors';
import Search from '../components/Search';
import Results from '../components/Results';

const Home = () => {
  const [testData, setTestData] = useState([]);

  const getData = data => {
    setTestData([...data]);
  };

  return (
    <View style={styles.container}>
      <Search getData={getData} />

      <Results data={testData} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.primaryBlack,
    alignItems: 'center',
  },
  text: {
    // color: 'white',
  },
});
