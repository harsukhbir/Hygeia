import { StyleSheet } from "react-native";

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
		marginBottom: 151
	},
	logo: {
		width: 219,
		resizeMode: "contain"
	},
	welcomeText: {
		fontWeight: "normal",
		fontSize: 22,
		lineHeight: 30,
		color: "#fff",
		marginTop: 47,
		width: 197,
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
		backgroundColor: "transparent",
		borderColor: "#fff",
		borderWidth: 1,
	},
	buttonTextStyle: {
		color: "#fff"
	}
});