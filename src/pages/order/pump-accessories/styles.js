import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		paddingLeft: 10,
		paddingRight: 10,
		marginTop: 21
	},
	breastpumptext: {
		fontWeight: "normal",
		fontSize: 16,
		lineHeight: 20,
		color: "#000000",
		textAlign: "center"
	},
	buttonContainer: {
		width: "100%"
	},
	savebuttonStyle: {
		backgroundColor: "#E4B167",
		marginLeft: 11,
		height: 250,
		width: 250,
		borderRadius: 200,
		elevation: 8,
		marginTop: 72,
		alignItems: "center",
		justifyContent: "center",
		marginLeft: "auto",
		marginRight: "auto"
	},
	savebuttontextStyle: {
		color: "#fff",
		textTransform: "capitalize",
		textAlign: "center",
		fontSize: 18,
		lineHeight: 22,
		paddingLeft: 40,
		paddingRight: 40,
	},
	learnmorebutton: {
		flexDirection: "column",
		alignItems: "center",
		marginTop: 72
	},
	learnmoreText: {
		fontWeight: "500",
		fontSize: 16,
		lineHeight: 20,
		color: "#999999",
		marginRight: 4,
	},
	learnmoreTextCopy: {
		textDecorationLine: "underline",
		color: "#F5821F"
	},
	dashboardboxImage: {
		width: 14,
		height: 14,
		resizeMode: "contain",
		marginTop: 10
	}
});