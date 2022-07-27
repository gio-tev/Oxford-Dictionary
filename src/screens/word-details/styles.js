import { StyleSheet } from 'react-native';

const getStyles = () => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingTop: 10,
    },
    innerContainer: {
      flexDirection: 'row',
      width: '85%',
      marginVertical: 8,
    },
    word: {
      fontSize: 35,
      marginRight: 15,
    },
    btn: {
      marginLeft: 15,
      transform: [{ translateY: -10 }],
    },
    fieldSet: {
      width: '90%',
      borderColor: 'grey',
      padding: 20,
      marginTop: 40,
      marginBottom: 30,
      borderRadius: 20,
    },
    legend: {
      position: 'absolute',
      top: -12,
      left: 10,
      fontWeight: '500',
      fontSize: 16,
      paddingHorizontal: 15,
    },
    synonymsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    synonym: {
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 5,
      margin: 5,
    },
  });
};

export default getStyles;
