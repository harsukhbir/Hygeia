import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		paddingLeft: 0,
		paddingRight: 0,
		paddingTop: 10
	},
	supportList: {
		borderTopWidth: 1,
		borderColor: "#E0E0E0",
		marginTop: 10,
	},
	supportText: {
		fontSize: 16,
		width: "95%",
	},
	supportImage: {
		maxWidth: 12,
		height: 10,
		resizeMode: "contain",
	},
	supportListItem: {
		borderBottomWidth: 1,
		borderColor: "#E0E0E0",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		flexWrap: "wrap",
		paddingVertical: 10
	},
});