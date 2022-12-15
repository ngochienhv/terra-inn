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
import { store, useAppDispatch } from './redux/store';
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
  AdminInnNavigatorParamList,
  RenterHomeNavigatorParamList,
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
import InnGroupScreen from './screens/admin/inn-group/InnGroupScreen';
import AdminInnDetailScreen from './screens/admin/inn-detail/InnDetailScreen';
import AdminRoomDetailScreen from './screens/admin/room-detail/AdminRoomDetailScreen';
import axios from 'axios';
axios.defaults.baseURL = 'https://terrainn-api.fly.dev/api';
import NotiFormScreen from './screens/admin/noti-form/NotiFormScreen';
import BillFormScreen from './screens/admin/bill-form/BillFormScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signIn } from './redux/slices/userSlice';
import Toast from 'react-native-toast-message';
import { getAllInns } from './redux/actions/innGroupActions';
import HomeRentScreen from './screens/home-rent/HomeRentScreen';
import GuestBillListScreen from './screens/guest-bill-list/GuestBillListScreen';
import { getUserProfile } from './redux/actions/userActions';
import { ROLES } from './constants/role';

loadTypographies();

const HomeStack = createNativeStackNavigator<HomeNavigatorParamList>();

const GuestHomeStackScreen = () => {
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

const RenterHomeStack = createNativeStackNavigator<RenterHomeNavigatorParamList>();

const RenterHomeStackScreen = () => {
  return (
    <RenterHomeStack.Navigator>
      <RenterHomeStack.Screen
        name="RenterHome"
        component={HomeRentScreen}
        options={{ title: 'Trang chủ', headerShown: false }}
      />
    </RenterHomeStack.Navigator>
  );
};

const ManageStack = createNativeStackNavigator<ManageNavigatorParamList>();

const ManageStackScreen = () => {
  return (
    <ManageStack.Navigator>
      <ManageStack.Screen name="Manage" component={ManageScreen} options={{ title: 'Quản lý' }} />
      <ManageStack.Screen
        name="BillList"
        component={GuestBillListScreen}
        options={{ title: 'Hóa đơn' }}
      />
      <ManageStack.Screen
        name="BillDetailGuest"
        component={BillDetailScreen}
        options={{ title: 'Hóa đơn' }}
      />
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

const AdminInnStack = createNativeStackNavigator<AdminInnNavigatorParamList>();

const AdminInnStackScreen = () => {
  return (
    <AdminInnStack.Navigator>
      <AdminInnStack.Screen
        name="InnGroup"
        component={InnGroupScreen}
        options={{ title: 'Quản lý khu trọ' }}
      />
      <AdminInnStack.Screen
        name="InnDetail"
        component={AdminInnDetailScreen}
        options={{ title: 'Chi tiết' }}
      />
      <AdminInnStack.Screen
        name="InnRoomDetail"
        component={AdminRoomDetailScreen}
        options={{ title: 'Phòng' }}
      />
      <AdminInnStack.Screen
        name="InnRoomDetailOccupied"
        component={ManageScreen}
        options={{ title: 'Phòng' }}
      />
    </AdminInnStack.Navigator>
  );
};

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
      <AdminHomeStack.Screen
        name="Inn"
        component={AdminInnStackScreen}
        options={{ title: 'Quản lý khu trọ', headerShown: false }}
      />
      <AdminHomeStack.Screen
        name="Notifications"
        component={NotiFormScreen}
        options={{ title: 'Tạo thông báo' }}
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
      <AdminBillStack.Screen
        name="BillForm"
        component={BillFormScreen}
        options={{ title: 'Tạo hóa đơn' }}
      />
    </AdminBillStack.Navigator>
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
          } else if (route.name === 'AdminInn') {
            iconName = focused ? 'ios-business' : 'ios-business-outline';
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
        name="AdminInn"
        component={AdminInnStackScreen}
        options={{ title: 'Khu trọ' }}
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
  const isRenter = useSelector(selectUserRole) === ROLES.RENTER;

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

          return (
            <Ionicons
              name={iconName as string}
              size={size}
              color={
                isRenter || route.name === 'Profile' || route.name === 'Home' || focused
                  ? color
                  : TERRA_COLOR.GRAY[2]
              }
            />
          );
        },
        tabBarActiveTintColor: TERRA_COLOR.PRIMARY[3],
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <GuestTab.Screen
        name="Request"
        component={AdminRequestStackScreen}
        options={{ title: 'Yêu cầu' }}
        listeners={{
          tabPress: (e) => {
            !isRenter && e.preventDefault();
          },
        }}
      />
      <GuestTab.Screen
        name="Notification"
        component={NotificationStackScreen}
        options={{ title: 'Thông báo' }}
        listeners={{
          tabPress: (e) => {
            !isRenter && e.preventDefault();
          },
        }}
      />
      <GuestTab.Screen
        name="Home"
        component={isRenter ? RenterHomeStackScreen : GuestHomeStackScreen}
        options={{ title: 'Trang chủ' }}
      />
      <GuestTab.Screen
        name="Manage"
        component={ManageStackScreen}
        options={{ title: 'Quản lý' }}
        listeners={{
          tabPress: (e) => {
            !isRenter && e.preventDefault();
          },
        }}
      />
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
  const isAdmin = useSelector(selectUserRole) === ROLES.ADMIN;
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const checkLoggedin = async () => {
      let token = await AsyncStorage.getItem('token');
      if (token) {
        let role = await AsyncStorage.getItem('role');
        dispatch(signIn(role));
        dispatch(getUserProfile(token));
      }
    };

    checkLoggedin();

    try {
      dispatch(getAllInns());
    } catch (err) {
      console.log(err);
    }
  }, []);

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
      <Toast />
    </Provider>
  );
}
