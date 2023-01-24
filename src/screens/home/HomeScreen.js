import React, {useState, useEffect, Fragment} from 'react';
import 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Images} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image'
import {
  View,
  SafeAreaView,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const categoriesData = [
  {
    id: '1',
    title: 'Business',
    image:
      'https://img.freepik.com/free-photo/business-people-shaking-hands-together_53876-30568.jpg?w=2000',
  },
  {
    id: '2',
    title: 'Entertainment',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
  },
  {
    id: '3',
    title: 'General',
    image:
      'https://chessdailynews.com/wp-content/uploads/2015/03/general_news1.jpg',
  },
  {
    id: '4',
    title: 'Health',
    image:
      'https://m.economictimes.com/thumb/msid-73074326,width-1200,height-900,resizemode-4,imgsize-80591/health-insurance-getty-imag.jpg',
  },
  {
    id: '5',
    title: 'Science',
    image:
      'https://thumbs.dreamstime.com/b/ai-machine-learning-hands-robot-human-touching-big-data-network-connection-background-science-artificial-intelligence-172987598.jpg',
  },
  {
    id: '6',
    title: 'Sports',
    image:
      'https://mybayutcdn.bayut.com/mybayut/wp-content/uploads/Dubai-Sports-World-cover.jpg',
  },
  {
    id: '7',
    title: 'Technology',
    image:
      'https://img.freepik.com/free-photo/medium-shot-man-wearing-vr-glasses_23-2149126949.jpg?w=2000',
  },
];

const Item = ({fullData}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.PRIMARY_TEXT_COLOR,
        width: 120,
        height: 80,
        borderRadius: 16,
        borderWidth: 5,
        borderColor: Colors.APP_PRIMARY_COLOR,
        marginRight: 16,
      }}>
      <Text>{fullData.title}</Text>
      <FastImage
        style={{ width: 200, height: 200 }}
        source={{
            uri: fullData.image,
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
    />
    </View>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const renderCategories = ({item}) => <Item fullData={item} />;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View
          style={{
            //backgroundColor: Colors.WHITE_COLOR,
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
            <TouchableOpacity>
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
            style={{marginTop: 20, backgroundColor: Colors.CLEAR}}
            horizontal
            showsHorizontalScrollIndicator={false}
            //contentContainerStyle={{paddingBottom: 100}}
            data={categoriesData}
            renderItem={renderCategories}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
export default HomeScreen;
