import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Fonts, Images} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchNews} from '../../redux/slice/news';
import uniqueId from 'lodash.uniqueid';
import moment from 'moment';
import {categoriesData} from './categoryData/CategoryData';
import AsyncStore, {AsyncStoreKeyMap} from '../../utils/AsyncStore';
import * as Helpers from '../../helpers/Helpers';
import Globals from '../../helpers/Globals';

const HomeScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchNews({category: '', isSearch: false, searchQuery: 'asd'}));
  }, []);

  const renderCategories = ({item}) => <CategoryItem fullData={item} />;
  const renderHeadlines = ({item}) => <HeadlineItem fullData={item} />;

  const keyExtractor = (item, index) => {
    return item.id || `item-${uniqueId()}`;
  };

  const categoryItemTouched = category => {
    navigation.navigate('CategoryNewsListScreen', {category});
  };

  const userIconTouched = () => {
    if (Globals.IS_AUTH == true) {
      navigation.navigate('ProfileScreen');
    } else {
      navigation.navigate('LoginScreen');
    }
  };

  const CategoryItem = ({fullData}) => {
    return (
      <TouchableOpacity onPress={() => categoryItemTouched(fullData.title)}>
        <FastImage
          style={{
            width: 120,
            height: 90,
            borderRadius: 16,
            borderWidth: 4,
            borderColor: Colors.APP_PRIMARY_COLOR,
            marginLeft: 8,
            alignItems: 'center',
          }}
          source={{
            uri: fullData.image,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}>
          <View
            style={{
              width: '100%',
              height: '30%',
              position: 'absolute',
              bottom: 0,
              backgroundColor: Colors.SEMI_TRANSPARENT,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: Colors.WHITE_COLOR,
                fontFamily: Fonts.NANUM_BOLD,
                fontSize: 12,
                textAlign: 'center',
              }}
              numberOfLines={1}>
              {fullData.title}
            </Text>
          </View>
        </FastImage>
      </TouchableOpacity>
    );
  };

  const newsItemTouched = newsDetails => {
    navigation.navigate('NewsDetailsScreen', {newsDetails});
  };

  const HeadlineItem = ({fullData}) => {
    return state.news.isLoading === true ? (
      <Helpers.NewsLoader />
    ) : (
      <TouchableOpacity
        style={{marginLeft: 8, marginRight: 8, marginBottom: 16}}
        onPress={() => newsItemTouched(fullData)}>
        <FastImage
          style={{
            flex: 1,
            height: 250,
            borderRadius: 16,
            alignItems: 'center',
          }}
          source={{
            uri: fullData.urlToImage,
            priority: FastImage.priority.normal,
          }}
          defaultSource={Images.PLACEHOLDER_ICON}
          resizeMode={FastImage.resizeMode.cover}
        />

        <Text
          style={{
            marginTop: 8,
            marginLeft: 5,
            marginRight: 5,
            fontWeight: 'bold',
            fontSize: 10,
            color: Colors.PRIMARY_TEXT_COLOR,
          }}>
          {(fullData?.source?.name || 'News').toUpperCase()}
        </Text>

        <Text
          style={{
            color: Colors.BLACK_COLOR,
            fontWeight: 'bold',
            fontSize: 12,
            marginTop: 8,
            marginLeft: 5,
            marginRight: 5,
          }}
          numberOfLines={5}>
          {fullData.title || 'N/A'}
        </Text>

        <View style={{flexDirection: 'row', alignContent: 'center'}}>
          <Text
            style={{
              marginTop: 8,
              marginLeft: 5,
              marginRight: 5,
              fontWeight: 'bold',
              fontSize: 10,
              color: Colors.LIGHT_GREY,
            }}>
            {moment(fullData?.publishedAt).fromNow()}
          </Text>

          <Text style={{fontSize: 20, color: Colors.LIGHT_GREY}}>•</Text>

          <Text
            style={{
              marginTop: 8,
              marginLeft: 5,
              marginRight: 5,
              fontWeight: 'bold',
              fontSize: 10,
              color: Colors.LIGHT_GREY,
            }}>
            {fullData?.author || 'Self'}
          </Text>
        </View>

        <View
          style={{
            marginTop: 12,
            height: 0.4,
            backgroundColor: Colors.LIGHT_GREY,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{backgroundColor: Colors.WHITE_COLOR}}>
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
            <TouchableOpacity onPress={() => userIconTouched()}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  overflow: 'hidden',
                }}
                source={{
                  uri: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
                }}
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
          {/* Categories */}
          <FlatList
            style={{marginTop: 20, height: 125, backgroundColor: Colors.CLEAR}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categoriesData}
            renderItem={renderCategories}
            keyExtractor={item => item.id}
          />

          {/* Headlines */}
          <Text
            style={{
              marginTop: 8,
              marginLeft: 10,
              marginRight: 8,
              fontFamily: Fonts.NANUM_EXTRA_BOLD,
              fontSize: 14,
            }}>
            TOP HEADLINES
          </Text>

          <FlatList
            style={{marginTop: 8, backgroundColor: Colors.CLEAR}}
            data={
              state.news.isLoading === true
                ? Helpers.DUMMY_LOAD_DATA
                : state.news?.data?.articles
                    ?.slice(0, 15)
                    ?.map((item, index) => ({
                      key: keyExtractor(item, index),
                      ...item,
                    }))
            }
            renderItem={renderHeadlines}
            keyExtractor={keyExtractor}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
export default HomeScreen;
