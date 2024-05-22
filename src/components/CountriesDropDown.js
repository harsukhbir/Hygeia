import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { isEmpty, isIOS } from "../utils/native";
import { translate } from "../locales/i18n";

const styles = StyleSheet.create({
	textInput: {
		backgroundColor: "#F6F8F9",
		marginTop: 15,
		paddingHorizontal: 15,
		borderRadius: 4,
		paddingVertical: 13.7
	},
	taxesContainer: {
		position: "relative",
		width: "100%"
	},
	textInputContainer: {
		paddingTop: 0,
		paddingHorizontal: 20,
		width: "100%"
	},
	notFoundContry: {
		fontSize: 14,
		paddingHorizontal: 15,
		paddingVertical: 10,
		fontWeight: "600",
	},
	countryText: {
		fontSize: 14,
		fontWeight: "600",
		color: "#323232"
	},
	cardsSection: {
		flex: 1,
		marginHorizontal: 2,
		marginVertical: 3,
		backgroundColor: "white",
		borderRadius: 4,
		elevation: 2,
		maxHeight: 200,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		borderColor: "transparent",
		shadowOpacity: 0.6,
		shadowRadius: 1
	},
	cardsContainer: {
		flex: 1,
		padding: 18,
		position: "absolute",
		top: isIOS() ? 45 : 55,
		left: 0,
		right: 0,
		zIndex: 1
	},
	searchIcon: {
		position: "absolute",
		top: isIOS() ? 28 : 33,
		right: 35,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: 20,
		color: "rgba(0,0,0,0.5)"
	},
	error: {
		flex: 1,
		color: "red",
		marginTop: 5,
	},
	textInputStyle: {
		flex: 1,
		marginTop: 10,
		marginLeft: 20,
		marginRight: 20,
	}
});

class CountriesDropDown extends React.Component {
	render() {
		const { searchCountryTerm, onChangeCountryTerm, onFocusCountryTerm, isShowDropDown, resetCountrySearch, countryErrorMessage, validateInput, filterCountriesStates, onCountryPress, onEnableScroll, states } = this.props;

		return (
			<View style={[styles.taxesContainer, isIOS() && { zIndex: 1 }]}>
				{
					<View style={styles.textInputContainer}>
						<TextInput
							placeholderTextColor="rgba(0,0,0,0.5)"
							style={[styles.textInput, { paddingRight: 35 }]}
							placeholder={translate("signupScreen.countryPlaceholder")}
							value={searchCountryTerm}
							onChangeText={(value) => {
								onChangeCountryTerm(value);
							}}
							returnKeyType="done"
							onFocus={() => {
								onFocusCountryTerm();
							}}
						/>
						{
							(validateInput && (isEmpty(searchCountryTerm) || countryErrorMessage !== ""))
							&& <Text style={styles.error}>{isEmpty(countryErrorMessage) ? `${translate("signupScreen.countryPlaceholder")} is required` : countryErrorMessage}</Text>
						}
						{
							(searchCountryTerm !== "")
								? <MaterialIcon style={styles.searchIcon} onPress={() => resetCountrySearch()}>close</MaterialIcon>
								: <MaterialIcon style={styles.searchIcon}>search</MaterialIcon>
						}
					</View>
				}
				{
					(isShowDropDown === true)
					&& (
						<View style={styles.cardsContainer}>
							<View style={styles.cardsSection}>
								<FlatList
									keyboardShouldPersistTaps="always"
									extraData={states}
									data={filterCountriesStates}
									keyExtractor={(item, index) => index.toString()}
									onTouchStart={() => onEnableScroll(false)}
									onMomentumScrollEnd={() => onEnableScroll(true)}
									renderItem={({ item }) => (
										(isShowDropDown === true)
											? <TouchableOpacity style={{ position: "relative", paddingHorizontal: 15, paddingVertical: 10 }} onPress={() => onCountryPress(item)}><Text style={styles.countryText}>{item.country_name}</Text></TouchableOpacity>
											: null
									)}
								/>
								{ (searchCountryTerm !== "" && filterCountriesStates.length === 0) && <Text style={styles.notFoundContry}>{translate("signupScreen.notFoundCountry")}</Text> }
							</View>
						</View>
					)
				}
			</View>
		);
	}
}

export default CountriesDropDown;