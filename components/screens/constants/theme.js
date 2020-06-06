import { DefaultTheme, DarkTheme } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const currentEmail = auth().currentUser.email.toString();

export const lightTheme = {
	...DefaultTheme,

	colors: {
		...DefaultTheme.colors,
		primary: '#FF7597',
		accent: 'yellow',
		background: 'white',
		tabBarColor: '#FF7597'
	}
};

export const darkTheme = {
	...DarkTheme,
	dark: true,
	colors: {
		...DarkTheme.colors,
		tabBarColor: '#303030',
		primary: '#d50000',
		accent: 'tomato',
		background: '#121212'
	}
};
