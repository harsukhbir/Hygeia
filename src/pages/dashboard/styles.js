import { StyleSheet } from "react-native";

export default StyleSheet.create({
	safeAreaContainer: {
		flex: 1,
		backgroundColor: 'white',
	},
	container: {
		paddingHorizontal: 15,
		paddingTop: 15,
		paddingBottom: 15
	},
	activityTitle: {
		color: "#000000",
		fontWeight: "bold",
		fontSize: 22,
		lineHeight: 27,
		textAlign: "center",
	},
	dashboardbox: {
		marginTop: 15,
		backgroundColor: "#fff",
		padding: 11,
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	dashboardboxHeader: {
		flexDirection: "row",
		alignItems: "center",
	},
	dashboardboxImage: {
		marginRight: 9.5,
		maxWidth: 40,
		height: 40,
		resizeMode: "contain",
	},
	dashboardboxTitle: {
		color: "#F3921F",
		fontSize: 20,
		lineHeight: 24,
		fontWeight: "bold",
	},
	listing: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 11,
	},
	listIcon: {
		marginRight: 5,
		maxWidth: 20,
		height: 20,
		resizeMode: "contain",
	},
	listBreastsIcon: {
		width: 16,
		height: 16,
		backgroundColor: "#000000",
		color: "#fff",
		borderRadius: 8,
		overflow: "hidden",
		alignContent: "center",
		justifyContent: "center",
		textAlign: "center",
		fontWeight: "500",
		fontSize: 12,
		lineHeight: 15,
		marginRight: 5,
	},
	mainlistText: {
		flexDirection: "row",
		alignItems: "center",
	},
	pumpingmainlistText: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		flex: 1,
	},
	listTextBold: {
		fontWeight: "bold",
		fontSize: 16,
		lineHeight: 20,
		color: "#000000",
	},
	listText: {
		fontWeight: "normal",
		fontSize: 16,
		lineHeight: 20,
		color: "#000000",
	},
	time_hours: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		flex: 1,
	},
	dashboardboxsessionTitle: {
		flexDirection: "row",
		alignItems: "center",
	},
	dashboardboxsessionText: {
		marginLeft: 10,
		color: "#999999",
		fontSize: 10,
		lineHeight: 14.32,
	},
	linechart: {
		width: "100%",
		paddingLeft: 23,
	},
	linechartOrange: {
		width: "100%",
		height: 5,
		backgroundColor: "#F3921F",
		marginTop: 15,
	},
	linechartPurple: {
		width: "67%",
		height: 5,
		backgroundColor: "#4B2785",
	},
	pumpinglinechartPurple: {
		width: "50%",
		height: 5,
		backgroundColor: "#4B2785",
	},
	linechartText: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 2,
	},
	linechartpurpleText: {
		color: "#4B2785",
		fontSize: 14,
		lineHeight: 17,
		fontWeight: "normal",
	},
	linechartorangeText: {
		color: "#F3921F",
		fontSize: 14,
		lineHeight: 17,
		fontWeight: "normal",
	},
	linechartMiter: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: 5,
	},
	pumpLinechartMiter: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 5,
	},
	linecharttextMiter: {
		fontSize: 14,
		lineHeight: 17,
		color: "#000000",
		fontWeight: "normal",
	},
	linecharttextboldMiter: {
		fontSize: 14,
		lineHeight: 17,
		color: "#000000",
		fontWeight: "bold",
	},
	notFoundText: {
		fontWeight: "500",
		fontSize: 16,
		lineHeight: 20,
		color: "#999999",
		textAlign: "center",
		paddingVertical: 40
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(153, 153, 153, 0.5)"
	},
	modalView: {
		backgroundColor: "white",
		borderRadius: 20,
		paddingTop: 45,
		paddingBottom: 30,
		paddingHorizontal: 25,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: "95%",
		position: "relative",
	},
	modalClose: {
		position: "absolute",
		right: 19,
		top: 24
	},
	modalTitle: {
		fontWeight: "500",
		fontSize: 20,
		lineHeight: 24,
		color: "#000000",
		marginBottom: 12
	},
	modalSubTitle: {
		fontWeight: "normal",
		fontSize: 16,
		lineHeight: 19,
		color: "#000000"
	},
	buttonContainer: {
		paddingTop: 29,
	},
	buttonStyle: {
		shadowColor: "rgba(0, 0, 0, 0.25)",
		backgroundColor: "#E4B167",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		maxWidth: "100%"
	},
	buttonTextStyle: {
		color: "#fff",
	},
});