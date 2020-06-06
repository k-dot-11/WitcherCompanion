import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Appbar, Text, Button, Switch, Checkbox } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import firebase, { utils } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const ProfileScreen = ({ navigation }) => {
	const currentEmail = auth().currentUser.email.toString();
	const [ imageSource, setImageSource ] = useState('boo');
	const [ userName, setUserName ] = useState('');
	const [ path, setPath ] = useState('');
	const reference = storage().ref('witcher-profile-pictures/' + currentEmail);

	const options = {
		title: 'Select picture',
		storageOptions: {
			skipBackup: true,
			path: 'images'
		}
	};

	const userDocument = firestore().collection('witchers').doc(currentEmail).get().then((documentSnapshot) => {
		if (documentSnapshot.exists) {
			setUserName(documentSnapshot.data().name);
			setImageSource(documentSnapshot.data().dplink);
		}
	});

	const changeDpLink = (url) => {
		firestore()
			.collection('witchers')
			.doc(currentEmail)
			.update({
				dplink: url
			})
			.then(() => {
				console.log('User updated!');
			});
	};

	

	return (

		

		<View style={styles.mainContainer}>
			<Appbar style={styles.appbar}>
				<Appbar.Action
					icon="arrow-left"
					color="white"
					size={30}
					onPress={() => {
						navigation.goBack();
					}}
				/>
				<Appbar.Content
					title="Profile"
					titleStyle={{ color: 'white', alignSelf: 'center', justifyContent: 'center' }}
				/>
				<Appbar.Action
					icon="pencil"
					color="white"
					size={30}
					onPress={async () => {
						ImagePicker.launchImageLibrary(options, (response) => {
							if (response.didCancel) {
								console.log('User cancelled image picker');
							} else if (response.error) {
								console.log('ImagePicker Error: ', response.error);
							} else {
								setPath(response.path);
							}
						});
						await reference.putFile(path);
						await reference.getDownloadURL().then((url) => changeDpLink(url));
					}}
				/>
			</Appbar>
			<Avatar.Image style={styles.avatar} size={180} source={{ uri: imageSource }} />

			<Text style={styles.nameText}>{userName}</Text>
			<Text style={styles.email}>{currentEmail}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: '#121212',
		flex: 1,
		alignItems: 'center'
	},
	appbar: {
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0
	},
	avatar: {
		marginTop: 80,
		marginBottom: 18
	},
	nameText: {
		fontSize: 35,
		fontFamily: 'sans-serif-thin',
		color: 'white'
	},
	email: {
		fontSize: 16,
		marginTop: 10,
		color: 'white'
	}
});

export default ProfileScreen;
