import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/home/HomeScreen';
import SigninScreen from './screens/signin/SigninScreen';
import SignupScreen from './screens/signup/SignupScreen';
import ManageScreen from './screens/manage/ManageScreen';
import NotificationScreen from './screens/notification/NotificationScreen';
import AdminRequestScreen from './screens/admin/request/AdminRequestScreen';
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
import ChangePasswordScreen from './screens/changePassword/ChangePasswordScreen';
import NotiDetailScreen from './screens/notification/NotiDetailScreen';

loadTypographies();

const HomeStack = createNativeStackNavigator<HomeNavigatorParamList>();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
<<<<<<< HEAD
        component={DetailScreen}
        options={{ title: 'Room detail', headerShown: true }}
=======
        component={HomeScreen}
        options={{ title: 'Trang chủ', headerShown: false }}
>>>>>>> bc9b1db82e52ef3f8a85a83eeb37fbf7d8061c21
      />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
    </HomeStack.Navigator>
  );
};

const ManageStack = createNativeStackNavigator<ManageNavigatorParamList>();

const ManageStackScreen = () => {
  return (
    <ManageStack.Navigator>
      <ManageStack.Screen name="Manage" component={ManageScreen} options={{ title: 'Quản lý' }} />
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
        options={{ title: 'Thống kê' }}
      />
      <NotificationStack.Screen
        name="NotificationDetail"
        component={NotiDetailScreen}
        options={{ title: 'Thông báo' }}
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
        options={{ title: 'Tài khoản' }}
      />
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ title: 'Đổi mật khẩu' }}
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
        options={{ title: 'Yêu cầu' }}
      />
    </RequestStack.Navigator>
  );
};

const AuthenStack = createNativeStackNavigator<AuthenNavigatorParamList>();

const AuthenStackScreen = () => {
  return (
    <AuthenStack.Navigator>
      <AuthenStack.Screen
        name="Signin"
        component={SigninScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthenStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
    </AuthenStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

function AppComponents() {
  const isSignedIn = useSelector(selectSigninStatus);

  return (
    <NavigationContainer>
      {/* {isSignedIn ? ( */}
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
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
        <Tab.Screen name="Request" component={RequestStackScreen} options={{ title: 'Yêu cầu' }} />
        <Tab.Screen
          name="Notification"
          component={NotificationStackScreen}
          options={{ title: 'Thông báo' }}
        />
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ title: 'Trang chủ' }} />
        <Tab.Screen name="Manage" component={ManageStackScreen} options={{ title: 'Quản lý' }} />
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{ title: 'Tài khoản' }}
        />
      </Tab.Navigator>
      {/* ) : (
        <AuthenStackScreen />
      )} */}
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
