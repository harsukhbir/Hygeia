import { StyleSheet } from "react-native";

export default StyleSheet.create({
	backButton: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		paddingHorizontal: 20,
	},
	backIcon: {
		color: "#000",
	},
	backText: {
		fontSize: 12,
		lineHeight: 14,
		textTransform: "uppercase",
		color: "#000",
		marginLeft: 7
	},
	container: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 15,
		marginBottom: 15,
		flex: 1
	},
	supportdTitle: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 20,
		lineHeight: 24,
		borderBottomColor: "#E0E0E0",
		borderBottomWidth: 1,
		paddingBottom: 17,
		paddingTop: 30
	},
	contactText: {
		fontWeight: "normal",
		fontSize: 16,
		lineHeight: 20,
		color: "#000000",
		marginTop: 20
	},
	contactBottomText: {
		fontWeight: "normal",
		fontSize: 14,
		lineHeight: 17,
		color: "#000000",
		marginTop: 20
	},
	checkStatus: {
		color: "#E4B167",
	},
	number: {
		fontWeight: "bold",
	},
	contactForm: {
		marginTop: 10
	},
	textInput: {
		fontSize: 20,
		lineHeight: 24,
		color: "#000000"
	},
	inputStyle: {
		borderColor: "#999999",
		color: "#000",
		width: "100%",
	},
	MsgInputStyle: {
		borderColor: "#999999",
		color: "#000",
		width: "100%",
		height: 120,
		textAlignVertical: "top",
	},
	submitButton: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		padding: 5,
		marginRight: "auto",
		marginLeft: "auto",
		justifyContent: "center",
	},
	buttonContainer: {
		width: "100%",
	},
	submitButtonStyle: {
		maxWidth: "100%",
		marginTop: 15,
		backgroundColor: "#E4B167",
		elevation: 2,
		marginLeft: 0,
		width: 183
	},
});