import PropTypes from "prop-types";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
	container: {
	},
	getStartedGoogleView: {
		marginTop: 12,
		backgroundColor: "#cf4332",
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 4,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		width: "100%"
	},
	loginWithText: {
		textAlign: "center",
		color: "white",
		fontSize: 14
	},
	contentIcon: {
		color: "white",
		marginRight: 10,
		fontSize: 14,
		marginTop: 2
	},
});

export default function GoogleButton({ googleClicked, text, style }) {
	return (
		<View style={[styles.container, style]}>
			<TouchableOpacity onPress={googleClicked}>
				<View style={styles.getStartedGoogleView}>
					<Icon style={styles.contentIcon} name="google" />
					<Text style={styles.loginWithText}>{text}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}

GoogleButton.propTypes = {
	googleClicked: PropTypes.func,
	text: PropTypes.string.isRequired,
	style: PropTypes.object,
};

/* SPECIFIES THE DEFAULT VALUES FOR PROPS */
GoogleButton.defaultProps = {
	googleClicked: () => {},
	style: {}
};