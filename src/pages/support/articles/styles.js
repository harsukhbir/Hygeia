import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		paddingLeft: 10,
		paddingRight: 10,
	},
	articlesImgBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		marginTop: 20
	},
	articlesImg: {
		width: 100,
		height: 100,
		resizeMode: "contain"
	},
	articleContent: {
		paddingLeft: 20,
		width: "75%"
	},
	articleTitle: {
		fontWeight: "bold",
		fontSize: 16,
		lineHeight: 20,
		color: "#000000",
		marginBottom: 5,
	},
	articledescription: {
		fontSize: 12,
		lineHeight: 14,
		fontWeight: "normal",
		color: "#999999",
	}
});