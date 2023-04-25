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
import {signOut} from '../../services/authServices';
import Globals from '../../helpers/Globals';
import moment from 'moment';

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const [contentBottom, setContentBottom] = useState(0);

  const dispatch = useDispatch();
  const state = useSelector(state => state.auth);

  const backButtonAction = () => {
    navigation.goBack();
  };

  const userIconAction = newsDetails => {};

  const logoutButtonAction = () => {
    Alert.alert(
      '',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            console.log('Logout Pressed');
            handleSignOut();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleSignOut = () => {
    dispatch(signOut())
      .then(resState => {
        console.log('resState: ', resState);
        if (resState?.isSuccess === true) {
          console.log('User logout success');
          //Clear local db and globals
          Globals.IS_AUTH = false;
          Globals.USER_INFO = {};
          AsyncStore.multiRemoveData([
            AsyncStoreKeyMap.isAuthorizerd,
            AsyncStoreKeyMap.userInfo,
          ]);
          navigation.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}],
          });
        } else if (resState?.error) {
          Helpers.showToast(resState.error.message, 'Error', 'error');
        } else {
          Helpers.showToast('User logout failed!', 'Error', 'error');
          console.log('User logout failed!');
        }
      })
      .catch(error => {
        Helpers.showToast(error, 'Error', 'error');
        console.log('Sign in failed:', error);
      });
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
              <TouchableOpacity onPress={() => userIconAction()}>
                <Image
                  style={{
                    marginTop: 50,
                    width: 130,
                    height: 130,
                    borderRadius: 130 / 2,
                    overflow: 'hidden',
                  }}
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
                  }}
                />
              </TouchableOpacity>

              <Text
                style={{
                  marginTop: 12,
                  marginLeft: 10,
                  marginRight: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Colors.BLACK_COLOR,
                }}>
                {Globals.USER_INFO?.displayName || 'User'}
              </Text>

              <Text
                style={{
                  marginTop: 5,
                  marginLeft: 10,
                  marginRight: 10,
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: Colors.BLACK_COLOR,
                }}>
                {Globals.USER_INFO?.email || 'NA'}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 40,
                  width: '90%',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}>
                <Text
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    fontSize: 10,
                    fontWeight: '200',
                    color: Colors.BLACK_COLOR,
                  }}>
                  Account created :
                </Text>

                <Text
                  style={{
                    marginLeft: 5,
                    marginRight: 10,
                    fontSize: 10,
                    fontWeight: '200',
                    color: Colors.BLACK_COLOR,
                  }}>
                  {moment(Globals.USER_INFO?.metadata?.creationTime).fromNow()}(
                  {moment(Globals.USER_INFO?.metadata?.creationTime).format(
                    'DD-MMM-yyyy, hh:mm:ss A',
                  )}
                  )
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 12,
                  width: '90%',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}>
                <Text
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    fontSize: 10,
                    fontWeight: '200',
                    color: Colors.BLACK_COLOR,
                  }}>
                  Last logged in :
                </Text>

                <Text
                  style={{
                    marginLeft: 5,
                    marginRight: 10,
                    fontSize: 10,
                    fontWeight: '200',
                    color: Colors.BLACK_COLOR,
                  }}>
                  {moment(
                    Globals.USER_INFO?.metadata?.lastSignInTime,
                  ).fromNow()}
                  (
                  {moment(Globals.USER_INFO?.metadata?.lastSignInTime).format(
                    'DD-MMM-yyyy, hh:mm:ss A',
                  )}
                  )
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  marginTop: 50,
                  height: 50,
                  width: '50%',
                  backgroundColor: Colors.APP_PRIMARY_COLOR,
                  justifyContent: 'center',
                  borderRadius: 5,
                }}
                onPress={() => logoutButtonAction()}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: Colors.WHITE_COLOR,
                    alignSelf: 'center',
                  }}>
                  Logout
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

export default ProfileScreen;
