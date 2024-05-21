import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		padding: 15
	},
	tutorialsTitle: {
		fontWeight: "bold",
		fontSize: 22,
		lineHeight: 27,
		color: "#000000",
		textAlign: "center",
		borderBottomWidth: 1,
		borderColor: "#E5E5E5",
		paddingBottom: 20,
		marginTop: 6
	},
	tutorialsVideoBox: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 20
	},
	tutorialsVideo: {
		maxWidth: 150,
		height: 100,
		resizeMode: "contain"
	},
	tutorialsvideoText: {
		fontWeight: "bold",
		fontSize: 16,
		lineHeight: 20,
		fontStyle: "normal",
		paddingLeft: 20,
		width: "60%",
	}
});