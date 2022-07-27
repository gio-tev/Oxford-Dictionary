import { StyleSheet } from 'react-native';

const getStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 0.25,
      paddingHorizontal: 5,
      marginVertical: 2,
    },
    btnIndicatorContainer: {
      flexDirection: 'row',
      width: '82%',
    },
    btn: {
      width: '86%',
    },
    text: {
      paddingVertical: 10,
    },
    iconsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '18%',
    },
    pressed: {
      transform: [{ scale: 0.98 }],
    },
  });
};

export default getStyles;
