import { StyleSheet } from "react-native";

export default StyleSheet.create({
	backButton: {
		position: "absolute",
		top: 30,
		left: 30,
		zIndex: 12
	},
	container: {
		flexGrow: 1,
		width: "100%"
	},
	contentArea: {
		flexGrow: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 40,
	},
	textInputContainer: {
		paddingTop: 0,
		width: "100%"
	},
	buttonContainer: {
		paddingTop: 50,
		width: "100%"
	},
	buttonStyle: {
		shadowColor: "rgba(0, 0, 0, 0.25)",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		maxWidth: "100%"
	},
	formContainer: {
		width: "100%"
	},
	otpContainer: {
		flexGrow: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	otpInputs: {
		maxWidth: 220
	},
	otpErrorMessage: {
		color: "red",
		marginTop: 5,
		fontSize: 13
	},
	resendTextDiv: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 50
	},
	resendText: {
		fontWeight: "normal",
		fontSize: 14,
		lineHeight: 17,
		textTransform: "uppercase",
		color: "#999999"
	},
	resend: {
		fontWeight: "normal",
		fontSize: 14,
		lineHeight: 17,
		textTransform: "uppercase",
		color: "#999999",
		marginLeft: 5,
		textDecorationLine: "underline"
	},
	lockIcon: {
		width: 100,
		resizeMode: "contain"
	},
	headerText: {
		fontSize: 30,
		lineHeight: 37,
		fontWeight: "500",
		color: "#fff",
		textAlign: "center",
		marginVertical: 50
	},
	headerSubText: {
		fontWeight: "normal",
		fontSize: 22,
		lineHeight: 26,
		color: "#fff",
		textAlign: "center",
		marginBottom: 20
	},
});