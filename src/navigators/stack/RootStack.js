import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {navigationRef} from './RootNavigator';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SplashScreen,
  HomeScreen,
  NewsDetailsScreen,
  CategoryNewsListScreen,
  LoginScreen,
  RegisterScreen,
  ProfileScreen,
} from '../../screens';
import DashBoardTabs from '../tabNavigatior/DashboardTabs';

//import DrawerNavigatorScreen from '../drawerNavigator/DrawerNavigatorScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#0000',
          },
        }}
        initialRouteName={{SplashScreen}}
        options={{gestureEnabled: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="DashBoardTabs" component={DashBoardTabs} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="NewsDetailsScreen" component={NewsDetailsScreen} />
        <Stack.Screen
          name="CategoryNewsListScreen"
          component={CategoryNewsListScreen}
        />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
