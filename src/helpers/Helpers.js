
import Toast from 'react-native-toast-message';

export function showToast(message, title='Alert', type= 'info') { //type = success, error, info
    Toast.show({
      type: type,
      text1: title,
      text2: message,
      position: 'bottom'
    });
  }