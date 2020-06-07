import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { Appbar } from 'react-native-paper';
import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart
} from 'react-native-chart-kit';

const SettingsScreen = () => {
	const data = {
		labels: [ 'Swim', 'Bike', 'Run' ], // optional
		data: [ 0.4, 0.6, 0.8 ]
	};

	return (
		<View style={styles.mainContainer}>
			<Appbar style={styles.appBar}>
				<Appbar.Content
					title="Settings"
					titleStyle={{ color: 'white', alignSelf: 'center', justifyContent: 'center' }}
				/>
			</Appbar>
			<View>
				<Text style={styles.chartLabel}>Bezier Line Chart</Text>
				<LineChart
					data={{
						labels: [ 'January', 'February', 'March', 'April', 'May', 'June' ],
						datasets: [
							{
								data: [
									Math.random() * 100,
									Math.random() * 100,
									Math.random() * 100,
									Math.random() * 100,
									Math.random() * 100,
									45
								]
							}
						]
					}}
					width={420} // from react-native
					height={220}
					yAxisLabel="$"
					yAxisSuffix="k"
					yAxisInterval={1} // optional, defaults to 1
					chartConfig={{
						backgroundColor: '#e26a00',
						backgroundGradientFrom: '#fb8c00',
						backgroundGradientTo: '#ffa726',
						decimalPlaces: 2, // optional, defaults to 2dp
						color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

						propsForDots: {
							r: '6',
							strokeWidth: '2',
							stroke: '#ffa726'
						}
					}}
					bezier
					style={{
						marginVertical: 8,
						borderRadius: 16
					}}
				/>
			</View>
			<Text style={styles.chartLabel}>ProgressChart</Text>
			<ProgressChart
				data={data}
				width={420}
				height={220}
				strokeWidth={16}
				radius={32}
				chartConfig={{
					color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
				}}
				hideLegend={false}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		padding: 50,
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

	chartLabel: {
		color: 'white',
		marginTop: 25
	}
});

export default SettingsScreen;
