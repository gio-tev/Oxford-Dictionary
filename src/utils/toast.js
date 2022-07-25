import Toast from 'react-native-root-toast';

export const showToast = text => {
  Toast.show(text, {
    duration: 1000,
    position: 0,
    shadow: false,
    animation: false,
  });
};
