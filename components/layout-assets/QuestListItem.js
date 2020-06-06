import React from 'react';
import {View} from 'react-native';
import { Card, Text, Button, Icon, Avatar, Title, Paragraph } from 'react-native-paper';

const QuestListItem = (props) => {
	const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
	return (
		<View>
			<Card>
				<Card.Content>
					<Title>{props.name}</Title>
					<Paragraph>{props.purpose}</Paragraph>
				</Card.Content>
				<Card.Actions>
					<Button>Cancel</Button>
					<Button>Ok</Button>
				</Card.Actions>
			</Card>
		</View>
	);
};

export default QuestListItem;
