import { StyleSheet, Dimensions, Platform } from "react-native";

const dimensions = Dimensions.get("window");

export default StyleSheet.create({
	backButton: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		paddingHorizontal: 20,
	},
	backIcon: {
		color: "#000",
	},
	backText: {
		fontSize: 12,
		lineHeight: 14,
		textTransform: "uppercase",
		color: "#000",
		marginLeft: 7
	},
	container: {
		paddingHorizontal: 15,
		flex: 1
	},
	breastfeedTitle: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 20,
		lineHeight: 24,
		borderBottomColor: "#E0E0E0",
		borderBottomWidth: 1,
		paddingBottom: 20,
	},
	ScrollView: {
		height: dimensions.height / 2 + 140
	},
	addbreastfeeddmButtons: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		padding: 10,
		marginRight: "auto",
		marginLeft: "auto",
		justifyContent: "center",
	},
	addbreastfeedbuttons: {
		width: "50%",
	},
	buttonContainer: {
		width: "100%",
	},
	cancelbuttonStyle: {
		maxWidth: "100%",
		backgroundColor: "#fff",
		elevation: 2,
		marginRight: 11,
	},
	savebuttonStyle: {
		maxWidth: "100%",
		backgroundColor: "#E4B167",
		elevation: 2,
		marginLeft: 11,
	},
	notsInput: {
		flex: 1,
		marginTop: 20
	},
	inputStyle: {
		borderColor: "#999999",
		color: "#000",
		width: "100%",
	},
	textInput: {
		fontSize: 20,
		lineHeight: 24,
		color: "#000000",
	},
	startTimePicker: {
		// width: 175,
		marginTop: 30,
		position: "relative",
		justifyContent: "center",
		textAlign: "center",
		paddingHorizontal: dimensions.width / 4
	},
	pickerLabel: {
		backgroundColor: "#ECC894",
		position: "absolute",
		top: -8,
		left: dimensions.width / 4 + 12,
		fontWeight: "normal",
		fontSize: 12,
		lineHeight: 16,
		color: "#fff",
		textTransform: "uppercase",
		zIndex: 1,
		paddingHorizontal: 5
	},
	picker: {
		borderWidth: 1,
		borderColor: "#999",
		borderRadius: 5,
		fontSize: 20,
		lineHeight: 24,
	},
	pickerInput: {
		height: 60,
		width: "100%",
		color: "#000",
		fontSize: 20,
		backgroundColor: "transparent",
		marginLeft: 10,
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 7
	},
	pickerIcon: {
		color: "#000",
		fontSize: 30,
		position: "absolute",
		top: 15,
		right: 15
	},
	manualEentry: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 50
	},
	switchToggle: {
		flexDirection: "row",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	manualText: {
		fontSize: 16,
		marginLeft: 5
	},
	checkIcon: {
		position: "absolute",
		color: "#fff",
		left: Platform.OS === "ios" ? 30 : 28,
		top: Platform.OS === "ios" ? 0 : 9,
		zIndex: 1,
	},
	ClearButton: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center"
	},
	clearButtonStyle: {
		marginTop: 20,
		backgroundColor: "#BDBDBD",
	},
	clearButtonContainer: {
		width: 100,
		fontSize: 16
	},
	TimeCount: {
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		flex: 1,
		flexDirection: "row",
		paddingHorizontal: 16,
		marginTop: 20
	},
	timeTitle: {
		fontSize: 15,
		color: "#000",
		textTransform: "uppercase",
		fontWeight: "700",
		marginBottom: 3
	},
	timeCountText: {
		fontSize: 18,
		color: "#F5821F",
		marginTop: 3,
		paddingRight: 10
	},
	LeftTimeCount: {
		textAlign: "center",
		alignItems: "center",
	},
	MiddleTimeCount: {
		textAlign: "center",
		alignItems: "center",
		paddingRight: 5,
		paddingLeft: 5
	},
	RightTimeCount: {
		textAlign: "center",
		alignItems: "center",
	},
	TimeStart: {
		backgroundColor: "#4B2785",
		width: 85,
		height: 85,
		shadowColor: "#4B2785",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center"
	},
	playText: {
		fontSize: 18,
		color: "#fff",
		textTransform: "uppercase",
		marginBottom: 2
	},
	playIcon: {
		color: "#fff",
		fontSize: 24,
		marginTop: -5,
		marginBottom: -5
	},
	pauseIcon: {
		color: "#fff",
		fontSize: 14
	},
	emptyText: {
		margin: 0,
		padding: 0,
		width: 0,
		height: 0
	},
	timeCountIcon: {
		color: "#000",
		fontSize: 30,
		position: "absolute",
		top: 4,
		right: -5
	}
});