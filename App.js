import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';

//REACT NATIVE NAVIGATION
import { CommonActions } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { DrawerContent } from './components/layout-assets/DrawerCustom';

//FIREBASE
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//REACT NATIVE PAPER
import { DefaultTheme, Provider as PaperProvider, DarkTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//SCREEN COMPONENTS

//Dashboard
import HomeScreen from './components/screens/dashboard/HomeScreen';
import SettingsScreen from './components/screens/dashboard/SettingsScreen';
import QuestsScreen from './components/screens/dashboard/QuestsScreen';
import ArmoryScreen from './components/screens/dashboard/ArmoryScreen';
//Authorisation
import LoginScreen from './components/screens/auth/LoginScreen';
import SignUpScreen from './components/screens/auth/SignUpScreen';
import ForgotPassword from './components/screens/auth/ForgotPassword';

//Other Drawer screens
import AboutScreen from './components/screens/AboutScreen';
import CurrentQuests from './components/screens/CurrentQuests';

//OTHER ROOT SCREENS
import SplashScreen from './components/screens/SplashScreen';
import ProfileScreen from './components/screens/ProfileScreen';

import { darkTheme, lightTheme } from './components/screens/constants/theme';

/*..............................................................................................................................*/

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();
const DashboardTab = createMaterialBottomTabNavigator();
const ProfileStack = createStackNavigator();

var theme = darkTheme;;
const currentEmail = auth().currentUser.email.toString();
const userDocument = firestore().collection('witchers').doc(currentEmail).get().then((documentSnapshot) => {
	console.log('User exists: ', documentSnapshot.exists);

	if (documentSnapshot.exists) {
		if(!documentSnapshot.data().darkTheme)theme = lightTheme
	}
});

const signOut = () => {
	auth().signOut().then(() => console.log('User signed out!'));
};

const Dashboard = ({ navigation }) => {
	return (
		<DashboardTab.Navigator
			style={{ flex: 1, backgroundColor: '#121212' }}
			screenOptions={{ headerShown: false }}
			barStyle={{ backgroundColor: theme.colors.tabBarColor }}
			activeColor="white"
			theme={theme}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Home') {
						iconName = 'home';
					} else if (route.name === 'Settings') {
						iconName = 'settings';
					} else if (route.name === 'Armory') {
						iconName = 'sword';
					} else if (route.name === 'Quests') {
						iconName = 'map';
					}
					return <Icon name={iconName} size={20} color={color} />;
				}
			})}
		>
			<DashboardTab.Screen name="Home" theme={theme} component={HomeScreen} />
			<DashboardTab.Screen name="Quests" theme={theme} component={QuestsScreen} />
			<DashboardTab.Screen name="Armory" theme={theme} component={ArmoryScreen} />
			<DashboardTab.Screen name="Settings" theme={theme} component={SettingsScreen} />
		</DashboardTab.Navigator>
	);
};

const ProfileScreenStack = ({ navigation }) => {
	return (
		<ProfileStack.Navigator theme={theme} initialRouteName="Profile" screenOptions={{ headerShown: false }}>
			<ProfileStack.Screen name="Profile" component={ProfileScreen} />
		</ProfileStack.Navigator>
	);
};

const DrawerStackScreens = ({ navigation }) => {
	return (
		<DrawerStack.Navigator
			drawerContent={(props) => <DrawerContent {...props} />}
			drawerType="slide"
			initialRouteName="Dashboard"
			screenOptions={{ headerShown: false }}
			theme={theme}
		>
			<DrawerStack.Screen name="Dashboard" component={Dashboard} />
			<DrawerStack.Screen name="Current Quest" component={CurrentQuests} />
			<DrawerStack.Screen name="About" component={AboutScreen} />
		</DrawerStack.Navigator>
	);
};

const AuthStackScreens = () => {
	return (
		<AuthStack.Navigator theme={theme} screenOptions={{ headerShown: false }}>
			<AuthStack.Screen name="Login" component={LoginScreen} />
			<AuthStack.Screen name="Sign Up" component={SignUpScreen} />
			<AuthStack.Screen name="Forgot Password" component={ForgotPassword} />
		</AuthStack.Navigator>
	);
};

const App: () => React$Node = () => {

	return (
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
					<Stack.Screen name="Auth Section" component={AuthStackScreens} options={{ headerShown: false }} />
					<Stack.Screen name="DrawerSection" component={DrawerStackScreens} />
					<Stack.Screen name="ProfileScreenStack" component={ProfileScreenStack} />
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
};

const styles = StyleSheet.create({});

export default App;
