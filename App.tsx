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

import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';
import {
  HomeNavigatorParamList,
  AuthenNavigatorParamList,
  ManageNavigatorParamList,
  NotificationNavigatorParamList,
  ProfileNavigatorParamList,
  AdminHomeNavigatorParamList,
  AdminBillNavigatorParamList,
  AdminStatisticNavigatorParamList,
  AdminRequestNavigatorParamList,
} from 'types/navigator';
import { selectSigninStatus, selectUserRole } from './redux/selectors/userSelectors';
import { TERRA_COLOR } from './constants/theme';
import ProfileScreen from './screens/profile/ProfileScreen';
import AdminRequestScreen from './screens/request/RequestScreen';
import DetailScreen from './screens/detail/DetailScreen';
import { loadTypographies } from './constants/theme/typography';
import ChangePasswordScreen from './screens/changePassword/ChangePasswordScreen';
import NotiDetailScreen from './screens/notification/NotiDetailScreen';
import AdminHomeScreen from './screens/admin/home/AdminHomeScreen';
import AdminManageBillScreen from './screens/admin/manage-bill/AdminManageBillScreen';
import BillDetailScreen from './screens/bill-detail/BillDetailScreen';
import ElectricWaterScreen from './screens/admin/electric-water/ElectricWaterScreen';
import RequestDetailScreen from './screens/request-detail/RequestDetailScreen';

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

const AdminRequestStack = createNativeStackNavigator<AdminRequestNavigatorParamList>();

const AdminRequestStackScreen = () => {
  return (
    <AdminRequestStack.Navigator>
      <AdminRequestStack.Screen
        name="AllRequest"
        component={AdminRequestScreen}
        options={{ title: 'Yêu cầu' }}
      />
      <AdminRequestStack.Screen
        name="Detail"
        component={RequestDetailScreen}
        options={{ title: 'Chi tiết yêu cầu' }}
      />
    </AdminRequestStack.Navigator>
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

const AdminHomeStack = createNativeStackNavigator<AdminHomeNavigatorParamList>();

const AdminHomeStackScreen = () => {
  return (
    <AdminHomeStack.Navigator>
      <AdminHomeStack.Screen
        name="AdminHome"
        component={AdminHomeScreen}
        options={{ title: 'Trang chủ', headerShown: false }}
      />
      <AdminHomeStack.Screen
        name="ElectricWater"
        component={ElectricWaterScreen}
        options={{ title: 'Điện nước' }}
      />
    </AdminHomeStack.Navigator>
  );
};

const AdminBillStack = createNativeStackNavigator<AdminBillNavigatorParamList>();

const AdminBillStackScreen = () => {
  return (
    <AdminBillStack.Navigator>
      <AdminBillStack.Screen
        name="AdminBill"
        component={AdminManageBillScreen}
        options={{ title: 'Hóa đơn' }}
      />
      <AdminBillStack.Screen
        name="BillDetail"
        component={BillDetailScreen}
        options={{ title: 'Chi tiết' }}
      />
    </AdminBillStack.Navigator>
  );
};

const AdminStatisticStack = createNativeStackNavigator<AdminStatisticNavigatorParamList>();

const AdminStatisticStackScreen = () => {
  return (
    <AdminStatisticStack.Navigator>
      <AdminStatisticStack.Screen
        name="AdminStatistic"
        component={HomeScreen}
        options={{ title: 'Hóa đơn', headerShown: false }}
      />
    </AdminStatisticStack.Navigator>
  );
};

const GuestTab = createBottomTabNavigator();

const AdminTab = createBottomTabNavigator();

const AdminTabNavigator = () => {
  return (
    <AdminTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Bill') {
            iconName = focused ? 'ios-cash' : 'ios-cash-outline';
          } else if (route.name === 'Statistic') {
            iconName = focused ? 'ios-bar-chart' : 'ios-bar-chart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          } else if (route.name === 'Request' || 'AdminRequest') {
            iconName = focused ? 'ios-paper-plane' : 'ios-paper-plane-outline';
          }

          return <Ionicons name={iconName as string} size={size} color={color} />;
        },
        tabBarActiveTintColor: TERRA_COLOR.PRIMARY[3],
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <AdminTab.Screen
        name="AdminRequest"
        component={AdminRequestStackScreen}
        options={{ title: 'Yêu cầu' }}
      />
      <AdminTab.Screen
        name="Statistic"
        component={AdminStatisticStackScreen}
        options={{ title: 'Thống kê' }}
      />
      <AdminTab.Screen
        name="Home"
        component={AdminHomeStackScreen}
        options={{ title: 'Trang chủ' }}
      />
      <AdminTab.Screen
        name="Bill"
        component={AdminBillStackScreen}
        options={{ title: 'Hóa đơn' }}
      />
      <AdminTab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{ title: 'Profile' }}
      />
    </AdminTab.Navigator>
  );
};

const GuestTabNavigator = () => {
  return (
    <GuestTab.Navigator
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
      <GuestTab.Screen
        name="Request"
        component={AdminRequestStackScreen}
        options={{ title: 'Yêu cầu' }}
      />
      <GuestTab.Screen
        name="Notification"
        component={NotificationStackScreen}
        options={{ title: 'Thông báo' }}
      />
      <GuestTab.Screen name="Home" component={HomeStackScreen} options={{ title: 'Trang chủ' }} />
      <GuestTab.Screen name="Manage" component={ManageStackScreen} options={{ title: 'Quản lý' }} />
      <GuestTab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{ title: 'Tài khoản' }}
      />
    </GuestTab.Navigator>
  );
};

function AppComponents() {
  const isSignedIn = useSelector(selectSigninStatus);
  const isAdmin = useSelector(selectUserRole) === 'admin';

  const renderTabs = () => (!isAdmin ? <GuestTabNavigator /> : <AdminTabNavigator />);

  return (
    <NavigationContainer>{isSignedIn ? renderTabs() : <AuthenStackScreen />}</NavigationContainer>
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
