import React, {useState, useEffect, Fragment} from 'react';
import 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Images} from '../../constants';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {Platform} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import Globals from '../../helpers/Globals';
import AsyncStore, { AsyncStoreKeyMap } from '../../utils/AsyncStore';

const SplashScreen = () => {
  const navigation = useNavigation();
  if (Platform.OS === 'ios') {
    KeyboardManager.setToolbarPreviousNextButtonEnable(true);
    KeyboardManager.setToolbarTintColor(Colors.APP_PRIMARY_COLOR); 
  }
  useEffect(() => {

    //Load auth, userInfo from local DB to Globals
    AsyncStore.getObjectValue(AsyncStoreKeyMap.isAuthorizerd).then(
      isAuthorized => {
        console.log('Splash isAuthorized: ', isAuthorized);
        if (isAuthorized == true) {
          Globals.IS_AUTH = true
          //Reading userInfo
          AsyncStore.getObjectValue(AsyncStoreKeyMap.userInfo).then(
            userInfo => {
              console.log('Splash userInfo: ', userInfo);
              Globals.USER_INFO = userInfo;
            },
          );
        } else {
          Globals.IS_AUTH = false
        }
      },
    );

    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'DashBoardTabs'}],
      });
    }, 4000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.APP_BACKGROUND_COLOR,
        flexDirection: 'row',
      }}>
      <Image
        style={{width: 300, height: 150}}
        resizeMode={'contain'}
        source={Images.SPLASH_BACKGROUND_IMAGE}
      />

      <Text
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          textAlign: 'center',
          fontFamily: Fonts.NANUM_EXTRA_BOLD,
          fontSize: 10,
          color: Colors.WHITE_COLOR,
        }}>
        V1.0.0
      </Text>
    </View>
  );
};
export default SplashScreen;
