import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Button from './UI/Button';
import { colors } from '../utils/colors';
import { DefaultTheme } from '../utils/colors';

const ResultItem = ({ item }) => {
  const navigation = useNavigation();

  const handleWordPress = () => {
    navigation.navigate('WordDetails', { item });
  };

  const star = <FontAwesome name="star" size={20} color={'grey'} />;
  const audio = <AntDesign name="sound" size={20} color={DefaultTheme.colors.primary} />;

  return (
    <View style={styles.container}>
      <Button pressable={styles.btn} text={styles.text} onPress={handleWordPress}>
        {item}
      </Button>

      <View style={styles.iconsContainer}>
        <Button icon={audio} />
        <Button icon={star} />
      </View>
    </View>
  );
};

export default ResultItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
    borderStyle: 'dotted',
    paddingHorizontal: 5,
    marginVertical: 2.5,
  },
  btn: {
    width: '82%',
  },
  text: {
    paddingVertical: 10,
    color: 'grey',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '18%',
  },
});
