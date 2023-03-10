import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
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
  LogBox,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchNews} from '../../redux/slice/news';
import uniqueId from 'lodash.uniqueid';
import moment from 'moment';

const CategoryNewsListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const selectedCategory = route.params.category;

  const state = useSelector(state => state);

  console.log('CategoryNewsListScreen State: ', state);

  useEffect(() => {
    dispatch(
      fetchNews({category: selectedCategory, isSearch: false, searchQuery: 'asd'}),
    );
  }, []);

  //ACTIONS
  const backButtonAction = () => {
    navigation.goBack();
  };
  const newsItemTouched = (newsDetails) => {
    navigation.navigate('NewsDetailsScreen', {newsDetails});
  }

  const renderHeadlines = ({item}) => <HeadlineItem fullData={item} />;

  const keyExtractor = (item, index) => {
    return item.id || `item-${uniqueId()}`;
  };

  const HeadlineItem = ({fullData}) => {
    return (
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

            <Text style={{color: Colors.PRIMARY_TEXT_COLOR, fontSize: 16, fontWeight: 'bold'}}>{selectedCategory || 'Category News'}</Text>

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

          <FlatList
            style={{marginTop: 8, backgroundColor: Colors.CLEAR}}
            data={state.news?.data?.articles?.slice(0, 15)?.map((item, index) => ({
              key: keyExtractor(item, index),
              ...item,
            }))}
            renderItem={renderHeadlines}
            keyExtractor={keyExtractor}
          />

        </View>
      </SafeAreaView>
    </>
  );
};
export default CategoryNewsListScreen;
