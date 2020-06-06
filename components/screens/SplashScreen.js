import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('witchers');

const SplashScreen = ({ navigation }) => {
	const [ initializing, setInitializing ] = useState(true);
	const [ user, setUser ] = useState();
	const [ isLoading, setLoading ] = useState(false);
	var welcomeString = ' ';

	// Handle user state changes{styles.logoContainer}
	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
		setLoading(false);
	}
	const navigateWithReset = (nameOfScreen) => {
		setLoading(true);
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [
					{
						name: nameOfScreen
					}
				]
			})
		);
	};

	useEffect(() => {
		setLoading(true);
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	if (initializing) return null;

	if (user) welcomeString = 'Welcome back !';

	return (
		<View style={{ backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
			<TouchableOpacity
				onPress={() => {
					if (!user) {
						navigateWithReset('Auth Section');
					} else {
						navigateWithReset('DrawerSection');
					}
				}}
			>
				<Avatar.Image
					size={128}
					style={{ alignSelf: 'center' }}
					source={require('./auth/assets/icons/logo-icon.png')}
				/>
				<Text style={styles.logoText}>Witcher Companion</Text>
			</TouchableOpacity>
			<Text style={{ marginVertical: 15, color: 'white' }}>{welcomeString}</Text>
			<Text style={{ color: 'gray', fontSize: 10, justifyContent: 'space-between' }}>
				Touch the logo to start
			</Text>
			<ActivityIndicator animating={isLoading} color="red" size="large" />
		</View>
	);
};

const styles = StyleSheet.create({
	logoText: {
		fontFamily: 'sans-serif-thin',
		marginTop: 10,
		color: 'white',
		fontSize: 30,
		marginLeft: 10,
		fontWeight: 'bold'
	}
});

export default SplashScreen;
