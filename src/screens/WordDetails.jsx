import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../utils/colors';

const WordDetails = ({ navigation, route }) => {
  navigation.setOptions({ title: route.params.item.word });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{route.params.item.word}</Text>
    </View>
  );
};

export default WordDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlack,
  },
  text: {
    color: colors.primaryCream,
  },
});
