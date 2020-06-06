import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Button, Text, Appbar, Avatar, TextInput, FAB } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const logIn = () => {
		auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				console.log('User account created & signed in!');
			})
			.catch((error) => {
				if (error.code === 'auth/email-already-in-use') {
					console.log('That email address is already in use!');
				}

				if (error.code === 'auth/invalid-email') {
					console.log('That email address is invalid!');
				}

				console.error(error);
			});
	};

	return (
		<View style={styles.mainContainer}>
			<View style={styles.logoContainer}>
				<Avatar.Image size={128} source={require('./assets/icons/logo-icon.png')} />
				<Text style={styles.logoText}>Witcher Companion</Text>
			</View>
			<View style={styles.loginArea}>
				<Text style={styles.loginText}>LOGIN</Text>
				<TextInput
					onChangeText={(input) => setEmail(input)}
					label="Email"
					mode="outlined"
					style={{ marginTop: 40, width: 300 }}
					theme={{
						colors: {
							placeholder: '#FF7597',
							text: 'white',
							primary: '#FF7597',
							underlineColor: '#FF7597'
						}
					}}
				/>
				<TextInput
					onChangeText={(input) => setPassword(input)}
					secureTextEntry={true}
					label="Password"
					mode="outlined"
					style={{ marginTop: 40, width: 300 }}
					theme={{
						colors: {
							placeholder: '#FF7597',
							text: 'white',
							primary: '#FF7597',
							underlineColor: '#FF7597'
						}
					}}
				/>
			</View>
			<View>
				<Button
					style={{ marginTop: 70 }}
					mode="outlined"
					onPress={() => {
						logIn();
						navigation.navigate('DrawerSection');
					}}
				>
					Log in ->
				</Button>
			</View>
			<View style={styles.buttonContainer}>
				<Button style={{ marginRight: 10 }} onPress={() => navigation.navigate('Sign Up')}>
					New ? Sign up here !
				</Button>
				<Button style={{ marginLeft: 10 }} onPress={() => navigation.navigate('Forgot Password')}>
					Forgot Password ?
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		paddingVertical: 30,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		backgroundColor: '#121212'
	},

	logoContainer: {
		paddingVertical: 10,
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row'
	},

	logoText: {
		fontFamily: 'sans-serif-thin',
		marginTop: 10,
		color: 'white',
		fontSize: 30,
		marginLeft: 10,
		fontWeight: 'bold'
	},

	loginText: {
		fontFamily: 'sans-serif-thin',
		marginTop: 10,
		color: 'white',
		fontSize: 35
	},

	loginArea: {
		alignItems: 'center',
		flex: 2
	},

	topActionBar: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0
	},

	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		flex: 0.8,
		marginTop: 20
	},

	fab: {
		backgroundColor: 'green',
		marginTop: 20
	}
});

export default LoginScreen;
