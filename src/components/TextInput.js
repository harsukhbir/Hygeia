import PropTypes from "prop-types";
import React from "react";
import { View, StyleSheet, TextInput as Input, Text, Keyboard } from "react-native";
import { isEmpty } from "../utils/native";

const styles = StyleSheet.create({
	textContainer: {
		marginTop: 30,
		position: "relative"
	},
	textLabel: {
		backgroundColor: "#ECC894",
		position: "absolute",
		top: -8,
		left: 12,
		fontWeight: "normal",
		fontSize: 12,
		lineHeight: 16,
		color: "#fff",
		textTransform: "uppercase",
		zIndex: 1,
		paddingHorizontal: 5
	},
	textInput: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: "#fff",
		paddingHorizontal: 15,
		borderRadius: 5,
		paddingVertical: 15,
		color: "#fff",
		fontSize: 20,
		lineHeight: 24
	},
	error: {
		flex: 1,
		color: "red",
		marginTop: 5
	}
});

export default function TextInput({ inputStyle, multiline, textLabelColor, textLabelBackground, placeholder, onChangeText, value, style, keyboardType, maxLength, isInvalid, errorMessage, autoCorrect, secureTextEntry, onSubmitEditing, onRef, returnKeyType, blurOnSubmit, editable }) {
	return (
		<View style={[styles.textContainer, style]}>
			<Text style={[styles.textLabel, { backgroundColor: textLabelBackground, color: textLabelColor }]}>{placeholder}</Text>
			<Input
				style={[styles.textInput, inputStyle]}
				// placeholder={placeholder}
				// placeholderTextColor="#fff"
				value={value}
				multiline={multiline}
				onChangeText={onChangeText}
				keyboardType={keyboardType}
				autoCorrect={autoCorrect}
				secureTextEntry={secureTextEntry}
				onSubmitEditing={onSubmitEditing}
				blurOnSubmit={blurOnSubmit}
				ref={onRef}
				returnKeyType={returnKeyType}
				maxLength={maxLength}
				editable={isEmpty(editable) ? true : editable}
				onSubmitEditing={() => {
					Keyboard.dismiss();
				}}
			/>
			{
				isInvalid && <Text style={styles.error}>{isEmpty(errorMessage) ? `${placeholder} is required` : errorMessage}</Text>
			}
		</View>
	);
}

TextInput.propTypes = {
	textLabelBackground: PropTypes.string,
	textLabelColor: PropTypes.string,
	placeholder: PropTypes.string,
	onChangeText: PropTypes.func.isRequired,
	multiline: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	style: PropTypes.object,
	inputStyle: PropTypes.object,
	keyboardType: PropTypes.string,
	maxLength: PropTypes.number,
	isInvalid: PropTypes.bool,
	errorMessage: PropTypes.string,
	autoCorrect: PropTypes.bool,
	secureTextEntry: PropTypes.bool,
	onSubmitEditing: PropTypes.func,
	onRef: PropTypes.func,
	returnKeyType: PropTypes.string,
	blurOnSubmit: PropTypes.bool,
	editable: PropTypes.bool,
};

/* SPECIFIES THE DEFAULT VALUES FOR PROPS */
TextInput.defaultProps = {
	textLabelBackground: "#ECC894",
	textLabelColor: "#fff",
	placeholder: "",
	onRef: null,
	isInvalid: false,
	errorMessage: "",
	inputStyle: {},
	style: {},
	keyboardType: "default",
	maxLength: null,
	autoCorrect: false,
	secureTextEntry: false,
	blurOnSubmit: false,
	returnKeyType: "done",
	onSubmitEditing: () => {},
	editable: true
};