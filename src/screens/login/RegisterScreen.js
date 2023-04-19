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
import auth from '@react-native-firebase/auth';
import * as Helpers from '../../helpers/Helpers';

const RegisterScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const [contentBottom, setContentBottom] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!name) {
      Helpers.showToast('Please enter your name', 'Name is required', 'info');
    } else if (!email) {
      Helpers.showToast('Please enter your email', 'Email is required', 'info');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      Helpers.showToast('Please enter valid email address', 'Invalid email', 'info');
    } else if (!password) {
      Helpers.showToast('Please enter password', 'Password is required', 'info');
    } else {
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);
      register(name, email, password);
    }
  };

  const backButtonAction = () => {
    navigation.goBack();
  };

  const register = (name, email, password) => {
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        setIsLoading(false);
        console.log('Registration Successful. Please Login to proceed');
        Helpers.showToast(
          'Registration Successful!! Please wait..',
          'Success',
          'success',
        );
        console.log('New user: ', user);
        if (user) {
          auth()
            .currentUser.updateProfile({
              displayName: name,
            })
            .then(() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'DashBoardTabs'}],
              });
            })
            .catch(error => {
              Helpers.showToast(error, 'Error', 'error');
              console.error(error);
            });
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          Helpers.showToast(
            'That email address is already in use!',
            'Error',
            'error',
          );
        } else {
          Helpers.showToast(error.message, 'Error', 'error');
        }
      });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {isLoading ? (
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
          onKeyboardWillShow={() => setContentBottom(200)}
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
                placeholder="Name"
                value={name}
                onChangeText={setName}
                keyboardType="default"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={{
                  marginTop: 16,
                  height: 50,
                  width: '50%',
                  backgroundColor: Colors.APP_PRIMARY_COLOR,
                  justifyContent: 'center',
                  borderRadius: 5,
                }}
                onPress={handleLogin}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: Colors.WHITE_COLOR,
                    alignSelf: 'center',
                  }}>
                  Register
                </Text>
              </TouchableOpacity>
              <View style={{marginTop: 12, flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 12,
                    color: Colors.BLACK_COLOR,
                  }}>
                  Already registerd?
                </Text>
                <TouchableOpacity
                  style={{marginLeft: 4}}
                  onPress={() => navigation.goBack()}>
                  <Text
                    style={{
                      color: Colors.APP_PRIMARY_COLOR,
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    Login now
                  </Text>
                </TouchableOpacity>
              </View>
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

export default RegisterScreen;
