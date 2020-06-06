import React, { useState } from 'react';

import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { TextInput, Appbar, Avatar, Text, FAB, Button } from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = ({ navigation }) => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');

	const usersCollection = firestore().collection('witchers');

	const verifyInputs = () => {
		return true;
	};

	const createUserAccount = (witcherName , witcherMail , witcherPassword) => {
		auth()
			.createUserWithEmailAndPassword(witcherMail, witcherPassword)
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

		firestore()
			.collection('witchers')
			.doc(witcherMail)
			.set({
				name: witcherName,
				password: witcherPassword,
			})
			.then(() => {
				console.log('User added!');
			});
	};

	return (
		<SafeAreaView style={styles.mainContainer}>
			<ScrollView contentContainerStyle={styles.mainContainer}>
				<View style={styles.logoContainer}>
					<Avatar.Image size={128} source={require('./assets/icons/logo-icon.png')} />
					<Text style={styles.logoText}>Witcher Companion</Text>
				</View>
				<Text style={styles.loginText}>Join a network of 15k+ witchers</Text>

				<TextInput
					onChangeText = {input =>setName(input)}
					label="Name"
					mode="outlined"
					style={{ marginTop: 20, width: 300 }}
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
					onChangeText={input => setEmail(input)}
					label="Email"
					mode="outlined"
					style={{ marginTop: 20, width: 300 }}
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
					onChangeText={input => setPassword(input)}
					label="Password"
					secureTextEntry={true}
					mode="outlined"
					style={{ marginTop: 20, width: 300 }}
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
					onChangeText={input => setConfirmPassword(input)}
					label="Confirm Password"
					mode="outlined"
					secureTextEntry={true}
					style={{ marginTop: 20, width: 300 }}
					theme={{
						colors: {
							placeholder: '#FF7597',
							text: 'white',
							primary: '#FF7597',
							underlineColor: '#FF7597'
						}
					}}
				/>

				

				<FAB
					style={styles.fab}
					icon="arrow-right"
					onPress={() => {
						console.log(name + ' ' + email + ' ' + password);
						if (verifyInputs()) createUserAccount(name , email , password);
						navigation.goBack();
					}}
				/>
				<Button style={{ marginTop: 10 }} onPress={() => navigation.goBack()}>
					Already have an account ?
				</Button>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		backgroundColor: '#121212'
	},

	logoContainer: {
		alignItems: 'center',
		flexDirection: 'row'
	},

	logoText: {
		fontFamily: 'sans-serif-thin',

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

	appbar: {
		position: 'absolute',
		right: 0,
		left: 0,
		top: 0
	},

	fab: {
		backgroundColor: 'green',
		marginTop: 45
	}
});

export default SignUpScreen;
