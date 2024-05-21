import React from "react";
import PropTypes from "prop-types";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { AppTheme } from "../utils/appTheme";

const styles = StyleSheet.create({
	loaderContainer: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 2,
		backgroundColor: "rgba(0,0,0,0.5)"
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
	},
	activityIndicatorWrapper: {
		height: 75,
		width: 75,
		borderRadius: 10,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
		backgroundColor: "rgba(255,255,255,0.7)"
	},
	activityIndicator: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	}
});

function LoadingIndicator({ isLoading }) {
	if(isLoading) {
		return (
			<View style={styles.loaderContainer}>
				<View style={styles.container}>
					<View style={styles.activityIndicatorWrapper}>
						<ActivityIndicator size="large" color={AppTheme.primaryColor} style={styles.activityIndicator} />
					</View>
				</View>
			</View>
		);
	} else {
		return null;
	}
}

LoadingIndicator.propTypes = {
	isLoading: PropTypes.bool
};

export default LoadingIndicator;
