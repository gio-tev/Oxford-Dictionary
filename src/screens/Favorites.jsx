import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
// import { colors } from '../utils/colors';

const Favorites = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>Favorites</Text>
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.primaryBlack,
  },
  text: {
    // color: colors.primaryCream,
  },
});
