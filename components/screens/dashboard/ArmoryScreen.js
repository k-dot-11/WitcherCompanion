import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Appbar, IconButton, Colors } from 'react-native-paper';
import CurrentArmory from '../../layout-assets/CurrentArmory';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const currentEmail = auth().currentUser.email.toString();

const ArmoryScreen = (props) => {
	console.log(props);

	return (
		<View style={styles.mainContainer}>
			<Appbar style={styles.appBar}>
				<Appbar.Content
					title="Armory"
					titleStyle={{ color: 'white', alignSelf: 'center', justifyContent: 'center' }}
				/>
			</Appbar>
			<View style={{ marginTop: 40, height: '27%', width: '90%' }}>
				<CurrentArmory email={currentEmail} />
			</View>

			<View style={{ flexDirection: 'row', marginTop: 90, justifyContent: 'space-between', width: '73%' }}>
				<View>
					<IconButton icon="sword" color='silver' size={70} onPress={() => console.log('Pressed')} />
					<Text style={styles.label}>Steel Melees</Text>
					<IconButton icon="shield" color='silver' size={70} onPress={() => console.log('Pressed')} />
					<Text style={styles.label}>Shields</Text>
					<IconButton icon="target" color='silver' size={70} onPress={() => console.log('Pressed')} />
					<Text style={styles.label}>Ranged Weapons</Text>
				</View>
				<View>
					<IconButton icon="sword" color = 'white'size={70} onPress={() => console.log('Pressed')} />
					<Text style={styles.label}>Silver Melees</Text>
					<IconButton icon="skull" color='white' size={70} onPress={() => console.log('Pressed')} />
					<Text style={styles.label}>Helmet</Text>
					<IconButton icon="human" color='white' size={70} onPress={() => console.log('Pressed')} />
					<Text style={styles.label}>Armor</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		paddingVertical: 30,
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#121212'
	},
	appBar: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		left: 0,
		right: 0,
		top: 0
	},
	label:{
		color:'white',
		alignSelf:'center'
	}
});

export default ArmoryScreen;
