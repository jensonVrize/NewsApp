import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {NEWS_SOURCES_COUNTRIES} from '../../data/NewsSources';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../constants';
import {SvgUri} from 'react-native-svg';
import Globals from '../../helpers/Globals';

const NewsSourcePopup = props => {
  const selectedCountry =
    props.selectedCountryInfo || Globals.NEWS_SOURCE_COUNTRY;
  const [selectedCode, setSelectedCode] = useState(
    selectedCountry?.code || 'in',
  );

  const onSelectItem = item => {
    props.onSelectCountry(item);
    setSelectedCode(item.code);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{flex: 1, margin: 5, alignItems: 'center'}}
      onPress={() => onSelectItem(item)}>
      <View
        style={{
          width: 100,
          height: 115,
          borderRadius: 16,
          borderWidth: item?.code === selectedCode ? 4 : 0,
          borderColor: Colors.APP_PRIMARY_COLOR,
          margin: 5,
          alignItems: 'center',
        }}>
        <SvgUri
          style={{marginTop: 5}}
          uri={item.imageURL}
          height={80}
          width={80}
        />
        <Text
          style={{marginTop: 5, fontSize: 10, fontWeight: '500'}}
          numberOfLines={1}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const keyExtractor = item => item.id.toString();

  return (
    <View>
      <Text
        style={{
          marginLeft: 25,
          fontSize: 12,
          fontWeight: '800',
        }}>
        Select country
      </Text>
      <FlatList
        style={{marginTop: 8, marginBottom: 12}}
        data={NEWS_SOURCES_COUNTRIES}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={3}
        horizontal={false}
      />
    </View>
  );
};

export default NewsSourcePopup;
