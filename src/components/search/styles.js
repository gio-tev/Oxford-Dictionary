import { StyleSheet } from 'react-native';

const getStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      borderRadius: 5,
    },
    searchIcon: {
      paddingLeft: 15,
      width: '15%',
    },
    input: {
      borderRadius: 5,
      height: 45,
      width: '85%',
    },
  });
};

export default getStyles;
