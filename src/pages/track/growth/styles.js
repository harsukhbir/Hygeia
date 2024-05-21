import { StyleSheet, Dimensions } from "react-native";

const dimensions = Dimensions.get("window");

export default StyleSheet.create({
	container: {
		paddingHorizontal: 15,
		flex: 1,
		paddingBottom: 15
	},
	addBreastfeed: {
		position: "absolute",
		bottom: 20,
		right: 15,
		zIndex: 999,
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
		marginTop: 15
	},
	graphTitle: {
		flexDirection: "row",
	},
	graphTitleText: {
		fontSize: 18,
		color: "#000",
		fontWeight: "700"
	},
	graphTitleSelect: {
		fontSize: 18,
		color: "#F3921F",
		fontWeight: "700",
		marginLeft: 5
	},
	setModalCentered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)"
	},
	setModalView: {
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		width: "95%",
	},
	setModalHeader: {
		backgroundColor: "#f5f5f5",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 12,
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#999999"
	},
	cancelText: {
		fontWeight: "normal",
		fontSize: 22,
		lineHeight: 26,
		color: "#F3921F"
	},
	setModalTitle: {
		fontWeight: "500",
		fontSize: 20,
		lineHeight: 24,
		color: "#000"
	},
});