import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native';
import {
	Drawer,
	Avatar,
	Button,
	Card,
	Title,
	Paragraph,
	ActivityIndicator,
	Provider,
	DarkTheme,
	Divider
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//FIREBASE
import auth from '@react-native-firebase/auth';

export function DrawerContent(props) {
	const signOut = () => {
		auth().signOut().then(() => console.log('User signed out!'));
	};

	return (
		<View style={{ backgroundColor: '#202020', flex: 1 }}>
			<View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
				<Avatar.Image size={80} source={require('../screens/auth/assets/icons/logo-icon.png')} />
				<Text
					style={{
						color: 'white',
						marginLeft: 15,
						fontSize: 20,
						fontFamily: 'sans-serif-thin'
					}}
				>
					Witcher Companion
				</Text>
			</View>
			<DrawerContentScrollView {...props} style={{ backgroundColor: '#202020', flex: 8 }}>
				<DrawerItemList {...props} inactiveTintColor="white" activeTintColor="#FF7597" />
				<Divider/>

					<Drawer.Item
					icon={() => <Icon name="account" size={24} color="white" />}
					label="Profile"
					inactiveColor="white"
					theme={DarkTheme}
					onPress={() => {
						props.navigation.navigate('ProfileScreenStack')
					}}
				/>
			</DrawerContentScrollView>

			<View style={{ flex: 0.1 }}>
				<Drawer.Item
					icon={() => <Icon name="logout" size={24} color="white" />}
					label="Logout"
					inactiveColor="white"
					theme={DarkTheme}
					onPress={() => {
						signOut();
						props.navigation.dispatch(
							CommonActions.reset({
								index: 0,
								routes: [
									{
										name: 'Auth Section'
									}
								]
							})
						);
					}}
				/>
			</View>
		</View>
	);
}
