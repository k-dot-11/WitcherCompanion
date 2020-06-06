import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';


const SettingsScreen = () => {
	return (
		<View style={styles.mainContainer}>
			<Appbar style={styles.appBar}>
				<Appbar.Content
					title="Settings"
					titleStyle={{ color: 'white', alignSelf: 'center', justifyContent: 'center' }}
				/>
			</Appbar>
			<Text>Hello Fren</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		padding: 30,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#121212'
	},
	appBar: {

		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		left: 0,
		right: 0,
		top: 0
	}
});

export default SettingsScreen;
