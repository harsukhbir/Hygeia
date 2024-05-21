import { StyleSheet, Dimensions } from "react-native";

const dimensions = Dimensions.get("window");

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
		padding: 15,
		flex: 1,
		marginBottom: 15,
	},
	editprofileTitle: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 20,
		lineHeight: 24,
		marginTop: 25,
		marginBottom: 40,
	},
	editprofileForm: {
		paddingLeft: 57,
		paddingRight: 57,
	},
	userprofileIcon: {
		textAlign: "center",
		justifyContent: "center",
		flexDirection: "row",
		position: "relative",
		maxWidth: 100,
		marginLeft: "auto",
		marginRight: "auto",
	},
	MenuuserprofileIcon: {
		maxWidth: 100,
		marginLeft: "auto",
		marginRight: "auto",
	},
	menuOption: {
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 8,
		paddingRight: 8,

	},
	menuOptionText: {
		fontSize: 16,
		lineHeight: 20,
		margin: 0,
		padding: 0,
	},
	userprofilebutton: {
		maxWidth: 125,
		height: 125,
		resizeMode: "contain",
	},
	cameraIcon: {
		position: "absolute",
		bottom: 0,
		right: 0,
		maxWidth: 30,
		height: 30,
		resizeMode: "contain",
		zIndex: 9,
	},
	inputStyle: {
		borderColor: "#999999",
		color: "#000",
		width: "100%",
	},
	textInput: {
		fontSize: 20,
		lineHeight: 24,
		color: "#000000",
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
		borderColor: "#999",
		borderRadius: 5,
		fontSize: 20,
		lineHeight: 24,
	},
	pickerInput: {
		height: 60,
		width: "100%",
		color: "#000",
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
		color: "#999",
		fontSize: 30,
		position: "absolute",
		top: 18,
		right: 5
	},
	profilebottomButtons: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		padding: 10,
		marginRight: "auto",
		marginLeft: "auto",
		justifyContent: "center",
	},
	profilebuttons: {
		width: "50%",
	},
	buttonContainer: {
		width: "100%"
	},
	cancelbuttonStyle: {
		maxWidth: "100%",
		marginTop: 15,
		backgroundColor: "#fff",
		elevation: 2,
		marginRight: 11,
	},
	savebuttonStyle: {
		maxWidth: "100%",
		marginTop: 14,
		backgroundColor: "#E4B167",
		elevation: 2,
		marginLeft: 11,
	},
	savebuttontextStyle: {
		color: "#fff",
	},

	scrollView: {
		height: dimensions.height / 2 + 180
	},
	RNPickerIcon: {
		color: "#999",
		fontSize: 30,
		position: "absolute",
		top: 18,
		right: 5
	},
	weightPicker: {
		borderWidth: 1,
		borderColor: "#999",
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