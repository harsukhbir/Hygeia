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
		paddingHorizontal: 40,
		paddingVertical: 40
	},
	getStartedHeader: {
		marginBottom: 0
	},
	getStartedTitle: {
		fontWeight: "normal",
		fontSize: 30,
		lineHeight: 36,
		color: "#fff",
		textAlign: "center"
	},
	skipButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 16
	},
	skipButtonText: {
		fontWeight: "normal",
		fontSize: 14,
		lineHeight: 17,
		color: "#fff",
		textDecorationLine: "underline"
	},
	skipButtonIcon: {
		color: "#fff",
		fontSize: 14,
		transform: [{ rotate: "180deg" }],
		marginLeft: 9
	},
	formContainer: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	formContainerInner: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 50
	},
	textInputContainer: {
		paddingTop: 0,
		width: "100%"
	},
	imagePlaceholder: {
		width: 100,
		resizeMode: "contain",
		margin: "auto"
	},
	buttonContainer: {
		width: "100%"
	},
	buttonStyle: {
		maxWidth: "100%",
		marginTop: 56
	},
	pickerInputContainer: {
		width: "100%",
		marginTop: 30,
		position: "relative"
	},
	pickerLabel: {
		backgroundColor: "#ECC894",
		position: "absolute",
		top: -8,
		left: 12,
		fontWeight: "normal",
		fontSize: 12,
		lineHeight: 16,
		color: "#fff",
		textTransform: "uppercase",
		zIndex: 1,
		paddingHorizontal: 5
	},
	picker: {
		borderWidth: 1,
		borderColor: "#fff",
		borderRadius: 5,
		fontSize: 20,
		lineHeight: 24,
	},
	pickerInput: {
		height: 60,
		width: "100%",
		color: "#fff",
		fontSize: 20,
		lineHeight: 24,
		position: "relative",
		left: 5,
		backgroundColor: "transparent",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 8,
	},
	pickerIcon: {
		color: "#fff",
		fontSize: 30,
		position: "absolute",
		top: 18,
		right: 5
	},
	RNPickerIcon: {
		color: "#fff",
		fontSize: 30,
		position: "absolute",
		top: 18,
		right: 5
	},
	addAnother: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
		marginTop: 20
	},
	addAnotherIcon: {
		color: "#fff",
		fontSize: 20,
		marginRight: 5
	},
	addAnotherText: {
		fontWeight: "normal",
		fontSize: 16,
		lineHeight: 19,
		color: "#fff"
	},
	error: {
		color: "red",
		fontWeight: "normal",
		fontSize: 14,
		lineHeight: 16,
		marginTop: 5,
		textAlign: "left",
		width: "100%"
	},
	weightPicker: {
		borderWidth: 1,
		borderColor: "#fff",
		borderRadius: 5,
		fontSize: 20,
		lineHeight: 24,
		flexDirection: "row",
		alignItems: "center",
	},
	weightLBPicker: {
		width: "50%",
		// borderRightColor: "#fff",
		// borderRightWidth: 1,
	},
	weightOZPicker: {
		width: "50%",
	},
});