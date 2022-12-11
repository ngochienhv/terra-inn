import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { Button, Card, Image, Text, View } from 'react-native-ui-lib';

import HomeScreen from './screens/home/HomeScreen';
import SigninScreen from './screens/signin/SigninScreen';
import SignupScreen from './screens/signup/SignupScreen';
import ManageScreen from './screens/manage/ManageScreen';
import NotificationScreen from './screens/notification/NotificationScreen';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';
import {
  HomeNavigatorParamList,
  AuthenNavigatorParamList,
  ManageNavigatorParamList,
  NotificationNavigatorParamList,
  ProfileNavigatorParamList,
  RequestNavigatorParamList,
} from 'types/navigator';
import { selectSigninStatus } from './redux/selectors/userSelectors';
import { TERRA_COLOR } from './constants/theme';
import ProfileScreen from './screens/profile/ProfileScreen';
import RequestScreen from './screens/request/RequestScreen';
import DetailScreen from './screens/detail/DetailScreen';
import { loadTypographies } from './constants/theme/typography';
import {InnHeader } from './components/Header/InnHeader';
import {BackButton} from './components/Header/BackButton';
import { getHeaderTitle } from '@react-navigation/elements';

loadTypographies();

const HomeStack = createNativeStackNavigator<HomeNavigatorParamList>();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Trang chủ', headerShown: false }}
      />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
    </HomeStack.Navigator>
  );
};

const ManageStack = createNativeStackNavigator<ManageNavigatorParamList>();

const ManageStackScreen = () => {
  return (
    <ManageStack.Navigator>
      <ManageStack.Screen name="Manage" component={ManageScreen}/>
    </ManageStack.Navigator>
  );
};

const NotificationStack = createNativeStackNavigator<NotificationNavigatorParamList>();

const NotificationStackScreen = () => {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen
        name="Notification"
        component={NotificationScreen}
      />
    </NotificationStack.Navigator>
  );
};

const ProfileStack = createNativeStackNavigator<ProfileNavigatorParamList>();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};

const RequestStack = createNativeStackNavigator<RequestNavigatorParamList>();




const RequestStackScreen = () => {
  return (
    <RequestStack.Navigator>
      <RequestStack.Screen
        name="Request"
        component={RequestScreen}
        options={{
          header: ({ navigation, route, options, back }) => {          
            return (
              <InnHeader
                title={getHeaderTitle(options, route.name)}
                leftButton={
                  !back ? <BackButton onPress={navigation.goBack} /> : undefined
                }
                style={options.headerStyle}
              />
            )
          },
        }}
      />
    </RequestStack.Navigator>
  );
};

const AuthenStack = createNativeStackNavigator<AuthenNavigatorParamList>();

const AuthenStackScreen = () => {
  return (
    <AuthenStack.Navigator >
    <AuthenStack.Screen
        name="Signin"
        component={SigninScreen}
      />
      <AuthenStack.Screen
        name="Signup"
        component={SignupScreen}
      />
    </AuthenStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();


function LogoTitle(route, options) {
  const title = getHeaderTitle(options, route.name);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{title}</Text>
    </View>
  );
}

function AppComponents() {
  const isSignedIn = useSelector(selectSigninStatus);

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route, back, options }) => ({
            // title: route.name,
            // headerStyle: {
            //   backgroundColor: '#fffffff',
            // },
            // headerTintColor: '#fff',
            // headerTitleStyle: {
            //   fontWeight: 'bold',
            // },
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'ios-home' : 'ios-home-outline';
              } else if (route.name === 'Manage') {
                iconName = focused ? 'ios-grid' : 'ios-grid-outline';
              } else if (route.name === 'Notification') {
                iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'ios-person' : 'ios-person-outline';
              } else if (route.name === 'Request') {
                iconName = focused ? 'ios-paper-plane' : 'ios-paper-plane-outline';
              }

              return <Ionicons name={iconName as string} size={size} color={color} />;
            },
            tabBarActiveTintColor: TERRA_COLOR.PRIMARY[3],
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen
            name="Request"
            component={RequestStackScreen}
            
          />
          <Tab.Screen
            name="Notification"
            component={NotificationStackScreen}
          />
          <Tab.Screen name="Home" component={HomeStackScreen}  />
          <Tab.Screen name="Manage" component={ManageStackScreen}/>
          <Tab.Screen
            name="Profile"
            component={ProfileStackScreen}
          />
        </Tab.Navigator>
      ) : (
        <AuthenStackScreen />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <AppComponents />
    </Provider>
  );
}
