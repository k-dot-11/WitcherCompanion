import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Appbar, Text, DarkTheme, Provider } from 'react-native-paper';
import { darkTheme } from '../constants/theme';
const HomeScreen = (props) => {
	return (
		<View style={styles.mainContainer}>
			<Appbar style={styles.appBar}>
				<Appbar.Action
					icon="forwardburger"
					color="white"
					size={30}
					onPress={() => {
						props.navigation.openDrawer();
					}}
				/>

				<Appbar.Content
					title="Home"
					titleStyle={{ marginRight: 66, color: 'white', alignSelf: 'center', justifyContent: 'center' }}
				/>
			</Appbar>
			<Text>Hello Fren</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: '#121212',
		padding: 30,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	appBar: {
		position: 'absolute',
		backgroundColor: darkTheme.colors.tabBarColor,
		alignItems: 'center',
		justifyContent: 'center',
		left: 0,
		right: 0,
		top: 0
	}
});

export default HomeScreen;
