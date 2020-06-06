import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import {
	Appbar,
	Button,
	Dialog,
	DarkTheme,
	RadioButton,
	ActivityIndicator,
	Card,
	Icon,
	Avatar,
	Title,
	Paragraph,
	Divider,
	List,
	Image,
	Banner
} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import QuestListItem from '../../layout-assets/QuestListItem';
import CurrentQuests from '../CurrentQuests';

const QuestsScreen = ({ navigation }) => {
	//...................................................//

	const getQuests = () => {
		const subscriber = firestore()
			.collection('quests')
			.doc(location)
			.collection('quests')
			.onSnapshot((querySnapshot) => {
				const quests = [];

				querySnapshot.forEach((documentSnapshot) => {
					quests.push({
						...documentSnapshot.data(),
						key: documentSnapshot.id
					});
				});

				setQuests(quests);
				setLoading(false);
				setRefreshing(false);
			});

		// Unsubscribe from events when no longer in use
		return () => {
			subscriber();
		};
	};

	const currentEmail = auth().currentUser.email.toString();
	const [ dialogVisible, setDialogVisible ] = useState(false);
	const [ location, setLocation ] = useState('Kaer Morhen valley');
	const [ loading, setLoading ] = useState(true); // Set loading to true on component mount
	const [ refresh, setRefreshing ] = useState(false); // Initial empty array of quests
	const [ quests, setQuests ] = useState([]);
	const [ bannerVisible, setBannerVisible ] = useState(true);

	const hideDialog = () => {
		setDialogVisible(false);
	};

	const showDialog = () => {
		setDialogVisible(true);
	};

	useEffect(
		() => {
			getQuests();
		},
		[ refresh ]
	);

	if (loading) {
		return (
			<View style={styles.mainContainer}>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<View style={styles.mainContainer}>
			<Appbar style={styles.appBar}>
				<Appbar.Content
					title="Quests"
					titleStyle={{ marginLeft: 56, color: 'white', alignSelf: 'center', justifyContent: 'center' }}
				/>
				<Appbar.Action
					icon="filter"
					color="white"
					size={30}
					onPress={() => {
						showDialog();
					}}
				/>
			</Appbar>
			<View style={{ marginTop: 25, width: '100%' }}>
				<Banner
					visible={bannerVisible}
					actions={[
						{
							label: 'Close',
							onPress: () => setBannerVisible(false)
						},
						{
							label: 'Current Quests',
							onPress: () => {
								setBannerVisible(false);
								navigation.navigate('Current Quest');
							}
						}
					]}
				>
					You may see your current quests here.
				</Banner>
				<List.Subheader>{location}</List.Subheader>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={quests}
					refreshing={refresh}
					renderItem={({ item }) => (
						<View style={{ width: '100%' }}>
							<QuestListItem name={item.name} description={item.purpose} id={item.key} />
							<Divider />
						</View>
					)}
				/>
			</View>

			<Dialog theme={DarkTheme} visible={dialogVisible} onDismiss={() => hideDialog()}>
				<Dialog.Title style={{ alignSelf: 'center' }}>Select Quest Location</Dialog.Title>
				<Dialog.ScrollArea>
					<ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
						<RadioButton.Group onValueChange={(value) => setLocation(value)} value={location}>
							<View style={styles.radioButtonView}>
								<RadioButton value="Kaer Morhen valley" />
								<Text style={styles.radioButtonText}>Kaer Morhen valley</Text>
							</View>
							<View style={styles.radioButtonView}>
								<RadioButton value="Novigrad" />
								<Text style={styles.radioButtonText}>Novigrad</Text>
							</View>
							<View style={styles.radioButtonView}>
								<RadioButton value="Skellige" />
								<Text style={styles.radioButtonText}>Skellige</Text>
							</View>
							<View style={styles.radioButtonView}>
								<RadioButton value="Velen" />
								<Text style={styles.radioButtonText}>Velen</Text>
							</View>
							<View style={styles.radioButtonView}>
								<RadioButton value="White Orchard" />
								<Text style={styles.radioButtonText}>White Orchard</Text>
							</View>
						</RadioButton.Group>
					</ScrollView>
				</Dialog.ScrollArea>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					<Button onPress={() => hideDialog()}>Cancel</Button>
					<Button
						onPress={() => {
							getQuests();
							setRefreshing(true);
							hideDialog();
						}}
					>
						Ok
					</Button>
				</View>
			</Dialog>
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
	radioButtonView: { flexDirection: 'row', alignItems: 'center' },
	radioButtonText: {
		color: 'white'
	}
});

export default QuestsScreen;
