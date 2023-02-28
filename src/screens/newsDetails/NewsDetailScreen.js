import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Fonts, Images} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {WebView} from 'react-native-webview';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  LogBox,
} from 'react-native';

import moment from 'moment';

const HomeDetailsScreen = () => {

  LogBox.ignoreAllLogs()

  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const newsDetails = route.params.newsDetails;

  const backButtonAction = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View
          style={{
            height: '100%',
          }}>
          {/* TOP BAR */}
          <View
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              height: 50,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: Colors.APP_BACKGROUND_COLOR,
              borderBottomWidth: 0.2,
            }}>
            <TouchableOpacity onPress={() => backButtonAction()}>
              <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                resizeMode={'contain'}
                source={Images.BACK_ICON}
              />
            </TouchableOpacity>

            <Image
              style={{width: 100, height: 50}}
              resizeMode={'contain'}
              source={Images.SPLASH_BACKGROUND_IMAGE}
            />

            <TouchableOpacity>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                }}
                source={Images.SEARCH_ICON}
              />
            </TouchableOpacity>
          </View>
          <WebView
            source={{uri: newsDetails.url}}
            mediaPlaybackRequiresUserAction={true}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
export default HomeDetailsScreen;
