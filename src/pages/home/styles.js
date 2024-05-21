import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		padding: 20,
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	list: {
		marginTop: 10,
		marginBottom: 20,
		width: "100%",
	},
	listItemTitle: {
		fontSize: 16,
		color: "black",
		marginBottom: 10
	},
	listItem: {
		marginLeft: 0,
		paddingLeft: 0,
		paddingTop: 15,
		paddingBottom: 15,
		borderBottomWidth: 1,
		borderColor: "#E8E8E8",
		color: "black"
	},
});