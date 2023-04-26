import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from 'react-native';
import Lottie from 'lottie-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Fonts, Images} from '../../constants';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Helpers from '../../helpers/Helpers';
import AsyncStore, {AsyncStoreKeyMap} from '../../utils/AsyncStore';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPassword} from '../../services/authServices';
import Globals from '../../helpers/Globals';

const ForgotPasswordScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const [contentBottom, setContentBottom] = useState(0);
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const state = useSelector(state => state.auth);

  const handleForgotPassword = () => {
    if (!email) {
      Helpers.showToast('Please enter your email', 'Email is required', 'info');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      Helpers.showToast(
        'Please enter valid email address',
        'Invalid email',
        'info',
      );
    } else {
      console.log('Email:', email);

      dispatch(forgotPassword({email}))
        .then(resState => {
          console.log('resState: ', resState);
          if (resState?.isSuccess === true) {
            console.log('Forgot password successss!!: user: ');
            Helpers.showToast(
              'Please check your email for reset link',
              'Reset link send to email',
              'info',
            );

            Alert.alert(
              'Reset link send successfully!',
              'Please check your email and follow the instructions.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    console.log('OK Pressed');
                    navigation.goBack();
                  },
                },
              ],
              {cancelable: false},
            );
          } else if (resState?.error) {
            if (resState.error.code === 'auth/user-not-found') {
              Helpers.showToast(
                'No account found on this email address',
                '❌ No account found',
                'error',
              );
            } else if (resState.error.code === 'auth/too-many-requests') {
              Helpers.showToast(
                'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.',
                'Account disabled temporarily',
                'info',
              );
            } else if (resState.error.code === 'auth/user-disabled') {
              Helpers.showToast(
                'The user account has been disabled by an administrator.',
                '❌ Account disabled',
                'error',
              );
            } else {
              Helpers.showToast(resState.error.message, 'Error', 'error');
            }
          } else {
            Helpers.showToast('User login failed!', 'Error', 'error');
            console.log('User login failed!');
          }
        })
        .catch(error => {
          Helpers.showToast(error, 'Error', 'error');
          console.log('Sign in failed:', error);
        });
    }
  };

  const backButtonAction = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'DashBoardTabs'}],
      });
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {state.loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.WHITE_COLOR} />
        </View>
      ) : null}
      <SafeAreaView>
        <View
          style={{
            width: '100%',
            height: 30,
            marginTop: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => backButtonAction()}>
            <Image
              style={{
                marginLeft: 16,
                width: 24,
                height: 24,
              }}
              resizeMode={'contain'}
              source={Images.BACK_ICON}
            />
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView
          bounces={false}
          keyboardOpeningTime={0}
          extraScrollHeight={50}
          enableResetScrollToCoords
          onKeyboardWillHide={() => setContentBottom(0)}
          onKeyboardWillShow={() => setContentBottom(100)}
          contentInset={{bottom: contentBottom}}>
          <ScrollView bounces={false}>
            <View style={styles.container}>
              <Image
                style={{width: 100, height: 50}}
                resizeMode={'contain'}
                source={Images.SPLASH_BACKGROUND_IMAGE}
              />
              <Lottie
                style={{height: 200}}
                resizeMode="cover"
                source={Images.ANIM_MAN_STAND_READING}
                autoPlay
                loop
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={{
                  marginTop: 25,
                  height: 50,
                  width: '50%',
                  backgroundColor: Colors.APP_PRIMARY_COLOR,
                  justifyContent: 'center',
                  borderRadius: 5,
                }}
                onPress={() => handleForgotPassword()}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: Colors.WHITE_COLOR,
                    alignSelf: 'center',
                  }}>
                  Get Reset Link
                </Text>
              </TouchableOpacity>

              <View style={{flex: 1}} />
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginVertical: 5,
    width: '80%',
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    backgroundColor: '#00000080',
  },
});

export default ForgotPasswordScreen;
