import { StyleSheet, Dimensions } from "react-native";

const dimensions = Dimensions.get("window");

export default StyleSheet.create({
	container: {
		padding: 15,
		paddingRight: 0,
		paddingLeft: 0
	},
	setsessionMain: {
		// flex:1,
		flexDirection: "row",
		justifyContent: "space-between",
		height: 40,
		alignItems: "center",
	},
	setsessionLeft: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	setsessionRight: {
		flex: 0,
		flexDirection: "row",
		alignItems: "center",
	},
	ImageBG: {
		backgroundColor: "#F3921F",
		width: 40,
		height: 40,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10
	},
	setsessionsImage: {
		marginRight: 5
	},
	sessionsTitle: {
		fontSize: 18,
		color: "#999999",
		textTransform: "uppercase",
		fontWeight: "600"
	},
	setsessionTitle: {
		fontSize: 18,
		color: "#F3921F",
		textTransform: "uppercase",
		fontWeight: "600"
	},
	alarmList: {
		marginTop: 10,
		padding: 0
	},
	roundFrame: {
		width: 20,
		height: 20,
		backgroundColor: "#000",
		color: "#fff",
		borderRadius: 50,
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		marginRight: 5,
		fontSize: 14,
		lineHeight: 18
	},
	alarmListItemLeftRight: {
		paddingRight: 0,
		width: 135
	},
	listText: {
		fontSize: 16
	},
	alarmListItem: {
		borderBottomWidth: 0,
		marginBottom: 0,
		marginLeft: 0,
		marginRight: 0,
		paddingRight: 0
	},
	alarmListItemPadding: {
		paddingRight: 10
	},
	leftBreast: {
		flexDirection: "row",
		alignItems: "center",
	},
	rightBreast: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5
	},
	cardsPickerView: {
		marginTop: 12,
		width: "100%",
		borderWidth: 1,
		borderColor: "#efefef",
		backgroundColor: "#efefef",
		fontSize: 14,
		borderRadius: 8
	},
	addBreastfeed: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		marginTop: 20
	},
	addBreastfeedButton: {
		width: 50,
		height: 50,
		backgroundColor: "#4B2785",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 50,
		shadowColor: "#4B2785",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5
	},
	scrollView: {
		height: dimensions.height / 2 - 75
	},
	menuOption: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 5,
		padding: 5
	},
	menuOptionText: {
		marginLeft: 10,
		fontSize: 18,
	},
	menuOptionS: {
		marginTop: 8,
		marginBottom: 8,
		marginHorizontal: 4,
		borderRadius: 0
	}
});