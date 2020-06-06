import React from 'react';
import { View } from 'react-native';
import { Card, Title, Paragraph , Avatar} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const currentEmail = auth().currentUser.email.toString();

const CurrentArmory = (props) => {
	return (
		<Card>
			<Card.Content>
				<Title style={{ alignSelf: 'center' }} left={(props) => <Avatar.Icon {...props} icon="sword-cross" />}>
					Equipped Items
				</Title>
				<View style={{ flexDirection: 'row', alignSelf: 'center'}}>
					<View style={{ padding: 15 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
							<Icon name="sword" size={30} color="#900" />
							<Paragraph style={{ fontSize: 17 }}>Steel sword</Paragraph>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
							<Icon name="skull-outline" size={30} color="#900" />
							<Paragraph style={{ fontSize: 17 }}>Helmet</Paragraph>
						</View>

						<View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
							<Icon name="human" size={30} color="#900" />
							<Paragraph style={{ fontSize: 17 }}>armor</Paragraph>
						</View>
					</View>

					<View style={{ padding: 15 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
							<Icon name="sword" size={30} color="#900" />
							<Paragraph style={{ fontSize: 17 }}>Silver Sword</Paragraph>
						</View>

						<View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
							<Icon name="shield" size={30} color="#900" />
							<Paragraph style={{ fontSize: 17 }}>Shield</Paragraph>
						</View>

						<View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
							<Icon name="target" size={30} color="#900" />
							<Paragraph style={{ fontSize: 17 }}>Ranged</Paragraph>
						</View>
					</View>
				</View>
			</Card.Content>
		</Card>
	);
};

export default CurrentArmory;
