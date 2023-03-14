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
} from 'react-native';
import Lottie from 'lottie-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Fonts, Images} from '../../constants';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';

const RegisterScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const [contentBottom, setContentBottom] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!name) {
      Alert.alert('Name is required');
    } else if (!email) {
      Alert.alert('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Invalid email');
    } else if (!password) {
      Alert.alert('Password is required');
    } else {
      // Handle login logic here, such as validating email and password against a database or API
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
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log('Registration Successful. Please Login to proceed');
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
              Alert.alert(error);
              console.error(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        } else {
          Alert.alert(error.message);
        }
      });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
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
});

export default RegisterScreen;
