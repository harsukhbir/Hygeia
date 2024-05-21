import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	breastpumptext: {
		fontWeight: "normal",
		fontSize: 16,
		lineHeight: 19,
		color: "#000000",
		textAlign: "center"
	},
	buttonContainer: {
		width: "100%"
	},
	savebuttonStyle: {
		backgroundColor: "#E4B167",
		marginLeft: 11,
		height: 200,
		width: 200,
		borderRadius: 100,
		elevation: 8,
		marginTop: 20
	},
	savebuttontextStyle: {
		color: "#fff",
		textTransform: "capitalize"
	},
	learnmorebutton: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 20
	},
	learnmoreText: {
		fontWeight: "500",
		fontSize: 16,
		lineHeight: 20,
		color: "#999999",
		marginRight: 10,
		textDecorationLine: "underline",
	},
	dashboardboxImage: {
		width: 14,
		height: 14,
		resizeMode: "contain",
	}
});