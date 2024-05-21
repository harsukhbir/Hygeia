import { StyleSheet } from "react-native";

export default StyleSheet.create({
	backButton: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		paddingHorizontal: 20,
	},
	backIcon: {
		color: "#000"
	},
	backText: {
		fontSize: 12,
		lineHeight: 14,
		textTransform: "uppercase",
		color: "#000",
		marginLeft: 7
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		paddingTop: 25,
		paddingHorizontal: 40,
		width: "100%"
	},
	title: {
		fontWeight: "bold",
		fontSize: 20,
		lineHeight: 24,
		color: "#000",
		marginBottom: 42
	},
	textInputContainer: {
		paddingTop: 0,
		width: "100%"
	},
	buttonContainer: {
		paddingTop: 50,
	},
	buttonStyle: {
		shadowColor: "rgba(0, 0, 0, 0.25)",
		backgroundColor: "#E4B167",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		maxWidth: "100%"
	},
	buttonTextStyle: {
		color: "#fff",
	},
	inputStyle: {
		borderColor: "#999999",
		color: "#000"
	},
	formContainer: {
		width: "100%"
	},
});