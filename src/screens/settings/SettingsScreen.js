import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {APIs, Colors, Fonts, Images} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import NewsSourcePopup from './NewsSourcePopup';
import Globals from '../../helpers/Globals';
import AsyncStore, {AsyncStoreKeyMap} from '../../utils/AsyncStore';
import {useDispatch} from 'react-redux';
import {fetchNews} from '../../redux/slice/news';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState(Globals.NEWS_SOURCE_COUNTRY);

  const backButtonAction = () => {
    navigation.goBack();
  };

  const userIconTouched = () => {
    if (Globals.IS_AUTH == true) {
      navigation.navigate('ProfileScreen');
    } else {
      navigation.navigate('LoginScreen');
    }
  };

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['40%', '80%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const handleSelectCountry = useCallback((countryInfo) => {
    console.log('onSelectCountry countryInfo:', countryInfo);
    setSelectedCountry(countryInfo);
    Globals.NEWS_SOURCE_COUNTRY = countryInfo;
    dispatch(fetchNews({category: '', isSearch: false, searchQuery: ''}));
    AsyncStore.storeData(AsyncStoreKeyMap.newsSourceCountryInfo, countryInfo);
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const NewsSourceBottomSheet = () => {
    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}>
        <NewsSourcePopup selectedCountryInfo={Globals.NEWS_SOURCE_COUNTRY} onSelectCountry={handleSelectCountry}/>
      </BottomSheetModal>
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

            <Text
              style={{
                color: Colors.PRIMARY_TEXT_COLOR,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              SETTINGS
            </Text>

            <View />
          </View>

          <NewsSourceBottomSheet />

          {/* BODY */}
          <ScrollView>
            <View
              style={{
                backgroundColor: Colors.WHITE_COLOR,
                marginTop: 30,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 16,
                shadowColor: '#413c41',
                shadowOpacity: 0.2,
                shadowRadius: 8,
                shadowOffset: {
                  height: 3,
                  width: 3,
                },
              }}>
              <Text
                style={{
                  marginLeft: 16,
                  marginTop: 16,
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: Colors.BLACK_COLOR,
                }}>
                Content Settings
              </Text>

              <View
                style={{
                  marginTop: 16,
                  marginLeft: 16,
                  marginRight: 16,
                  backgroundColor: Colors.LIGHT_GREY,
                  height: 0.2,
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    marginLeft: 16,
                    marginTop: 16,
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: Colors.LIGHT_GREY,
                  }}>
                  News Source Country:
                </Text>

                <TouchableOpacity onPress={handlePresentModalPress}>
                  <View
                    style={{
                      marginTop: 16,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        marginRight: 8,
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: Colors.APP_PRIMARY_COLOR,
                      }}>
                     {selectedCountry.emoji} {selectedCountry.name}
                    </Text>
                    <Ionicons
                      style={{marginRight: 16}}
                      name="play"
                      color={Colors.APP_PRIMARY_COLOR}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    marginLeft: 16,
                    marginTop: 16,
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: Colors.LIGHT_GREY,
                  }}>
                  Source Language:
                </Text>

                <TouchableOpacity>
                  <View
                    style={{
                      marginTop: 16,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        marginRight: 8,
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: Colors.APP_PRIMARY_COLOR,
                      }}>
                      English
                    </Text>
                    <Ionicons
                      style={{marginRight: 16}}
                      name="play"
                      color={Colors.APP_PRIMARY_COLOR}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    marginLeft: 16,
                    marginTop: 16,
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: Colors.LIGHT_GREY,
                  }}>
                  API Version:
                </Text>

                <TouchableOpacity disabled>
                  <View
                    style={{
                      marginTop: 16,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        marginRight: 8,
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: Colors.LIGHT_GREY,
                      }}>
                      Version 2.0
                    </Text>
                    <Ionicons
                      style={{marginRight: 16}}
                      name="play"
                      color={Colors.LIGHT_GREY}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <Text
                  style={{
                    marginLeft: 16,
                    marginTop: 16,
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: Colors.LIGHT_GREY,
                  }}>
                  API Key:
                </Text>

                <TouchableOpacity>
                  <View
                    style={{
                      marginTop: 16,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        marginRight: 8,
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: Colors.APP_PRIMARY_COLOR,
                      }}
                      numberOfLines={1}>
                      {APIs.API_KEY.substring(0, 15)}...
                    </Text>
                    <Ionicons
                      style={{marginRight: 16}}
                      name="play"
                      color={Colors.APP_PRIMARY_COLOR}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                backgroundColor: Colors.WHITE_COLOR,
                marginTop: 30,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 16,
                shadowColor: '#413c41',
                shadowOpacity: 0.2,
                shadowRadius: 8,
                shadowOffset: {
                  height: 3,
                  width: 3,
                },
              }}>
              <Text
                style={{
                  marginLeft: 16,
                  marginTop: 16,
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: Colors.LIGHT_GREY,
                }}>
                Support
              </Text>

              <View
                style={{
                  marginTop: 16,
                  marginLeft: 16,
                  marginRight: 16,
                  backgroundColor: Colors.LIGHT_GREY,
                  height: 0.3,
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    marginLeft: 16,
                    marginTop: 16,
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: Colors.LIGHT_GREY,
                  }}>
                  Help
                </Text>

                <TouchableOpacity>
                  <View
                    style={{
                      marginTop: 16,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons
                      style={{marginRight: 16}}
                      name="play"
                      color={Colors.APP_PRIMARY_COLOR}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <Text
                  style={{
                    marginLeft: 16,
                    marginTop: 16,
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: Colors.LIGHT_GREY,
                  }}>
                  Contact us
                </Text>

                <TouchableOpacity>
                  <View
                    style={{
                      marginTop: 16,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons
                      style={{marginRight: 16}}
                      name="play"
                      color={Colors.APP_PRIMARY_COLOR}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};
export default SettingsScreen;
