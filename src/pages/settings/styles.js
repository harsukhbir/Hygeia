import { StyleSheet, Dimensions, Platform } from "react-native";

const dimensions = Dimensions.get("window");

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 30
	},
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
	scrollView: {
		height: dimensions.height / 2 + 220,
		padding: 15
	},
	settingsTitle: {
		fontWeight: "bold",
		fontSize: 20,
		lineHeight: 24,
		textAlign: "center",
		marginTop: 25,
		paddingBottom: 20,
		borderBottomWidth: 1,
		borderColor: "#E0E0E0"
	},
	settingsEmail: {
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 20
	},
	settingsLabel: {
		fontWeight: "bold",
		fontSize: 18,
		lineHeight: 22
	},
	settingsEmailID: {
		fontSize: 18,
		lineHeight: 21,
		color: "#999",
		marginLeft: 20
	},
	changepasswordLabel: {
		fontWeight: "bold",
		fontSize: 18,
		lineHeight: 22,
		color: "#F3921F",
		marginTop: 11,
		paddingBottom: 23,
		borderBottomWidth: 1,
		borderColor: "#E0E0E0",
		marginBottom: 20,
	},
	babyAdd: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	babyTitleIcon: {
		flexDirection: "row",
		alignItems: "center"
	},
	babyaddIcon: {
		maxWidth: 30,
		height: 30,
		resizeMode: "contain"
	},
	babyTitle: {
		fontSize: 18,
		lineHeight: 22,
		fontWeight: "bold",
		color: "#000",
		marginLeft: 6
	},
	editpencilIcon: {
		maxWidth: 15,
		height: 15,
		resizeMode: "contain"
	},
	babyDeleteIcon: {
		fontSize: 18,
		color: "#000",
		marginLeft: 10
	},
	settingsBabyIcon: {
		flexDirection: "row",
		alignItems: "center",
	},
	babyaddplusIcon: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 14,
		borderBottomWidth: 1,
		borderColor: "#E0E0E0",
		paddingBottom: 20,
		marginBottom: 20
	},
	addbabyIcon: {
		maxWidth: 16,
		height: 16,
		resizeMode: "contain"
	},
	anotherBaby: {
		fontWeight: "normal",
		fontSize: 16,
		lineHeight: 19,
		color: "#000000",
		marginLeft: 5
	},
	unitsBox: {
		borderBottomWidth: 1,
		borderColor: "#E0E0E0",
		paddingBottom: 20,
		marginBottom: 20
	},
	unitsTitle: {
		fontWeight: "bold",
		fontSize: 20,
		lineHeight: 24,
		paddingBottom: 20
	},
	notificationBox: {
		borderBottomWidth: 1,
		borderColor: "#E0E0E0",
		paddingBottom: 20,
		marginBottom: 20,
		paddingRight: Platform.OS === "ios" ? 20 : 0
	},
	notificationTitle: {
		fontWeight: "bold",
		fontSize: 20,
		lineHeight: 24,
		paddingBottom: 10
	},
	notificationDetails: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 10
	},
	notificationchekbox: {
		width: "85%"
	},
	switchToggle: {
		maxWidth: 35,
		paddingLeft: 6,
		position: "relative"
	},
	checkIcon: {
		position: "absolute",
		color: "#fff",
		right: Platform.OS === "ios" ? -3 : 8,
		top: Platform.OS === "ios" ? 0 : 8,
		zIndex: 1
	},
	notificationlistTitle: {
		fontSize: 18,
		lineHeight: 21,
		color: "#000000",
		fontWeight: "normal",
	},
	notificationlistText: {
		fontSize: 14,
		lineHeight: 17,
		color: "#999999",
		fontWeight: "normal",
	},
	logoutbuttonStyle: {
		maxWidth: "70%",
		marginTop: 15,
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#E4B167",
		marginRight: 11
	},
	unitRadioGroup: {
		flexDirection: "row",
		textAlign: "right",
		alignItems: "center"
	},
	unitRadioButton: {
		width: "100%",
		alignItems: "center",
		padding: 0,
		marginRight: 100,
	},
	unitRadiotitle: {
		fontSize: 18,
		lineHeight: 21,
		color: "#000000",
		fontWeight: "normal",
		marginTop: 2,
		marginLeft: 2
	}
});