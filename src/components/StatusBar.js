import React from "react";
import { StyleSheet, StatusBar as StatusBarNative, View } from "react-native";
import { AppTheme } from "../utils/appTheme";
import { isIOS } from "../utils/native";

const styles = StyleSheet.create({
	statusBarView: {
		height: 0, // If manually manage status bar height in iOS then use STATUSBAR_HEIGHT
		backgroundColor: AppTheme.primaryColor
	},
});

const StatusBar = ({ barStyle }) => {
	const styleStatusBar = `${barStyle}-content`;
	if(!isIOS()) {
		StatusBarNative.setBackgroundColor(AppTheme.primaryColor);
		StatusBarNative.setBarStyle(styleStatusBar);
		return null;
	}

	return (
		<View style={styles.statusBarView}>
			<StatusBarNative translucent backgroundColor={AppTheme.primaryColor} barStyle={styleStatusBar} />
		</View>
	);
};

export default StatusBar;