import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	contentArea: {
		flexGrow: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	welcomeContent: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 50
	},
	welcomeText: {
		fontWeight: "normal",
		fontSize: 30,
		lineHeight: 36,
		color: "#fff",
		width: 263,
		textAlign: "center"
	},
	signButtonContainer: {
		width: "100%",
		marginBottom: 23
	},
	buttonContainer: {
		width: "100%"
	},
	buttonStyle: {
		backgroundColor: "#fff",
		borderColor: "#fff",
		borderWidth: 1,
	},
	buttonTextStyle: {
		color: "#E8BC7D"
	},
	topBG: {
		position: "absolute",
		top: 0,
		left: 0
	},
	extraBtnStyle: {
		backgroundColor: "transparent",
		borderColor: "#fff",
		borderWidth: 1
	},
	extraBtnTextStyle: {
		color: "#fff"
	}
});