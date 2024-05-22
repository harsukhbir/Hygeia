import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { View, Input } from "native-base";

const styles = StyleSheet.create({
	gridPad: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%"
	},
	inputViewPart: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		marginHorizontal: 5,
		marginBottom: 10
	},
	inputDigitBox: {
		textAlign: "center",
		height: 40,
		maxWidth: 50,
		color: "#fff",
		backgroundColor: "transparent",
		borderBottomColor: "#fff",
		borderBottomWidth: 1,
		paddingTop: 2,
		paddingBottom: 2,
		paddingLeft: 2,
		paddingRight: 2,
		fontSize: 20,
		lineHeight: 24,
	}
});

class OtpInputs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			otp: []
		};
	}

	componentDidUpdate() {
		const { otp } = this.state;
		const { resetOTPInput } = this.props;

		if(otp.length === 6 && resetOTPInput === true) {
			const inputs = Array(6).fill(0);
			inputs.map((i, j) => (
				this.otpTextInput[j]._root.clear()
			));
			this.setState({ otp: [] });
		}
	}

	otpTextInput = [];

	focusPrevious(key, index) {
		if(key === "Backspace" && index !== 0) this.otpTextInput[index - 1]._root.focus();
	}

	focusNext(index, value) {
		if(index < this.otpTextInput.length - 1 && value) {
			this.otpTextInput[index + 1]._root.focus();
		}
		if(index === this.otpTextInput.length - 1) {
			this.otpTextInput[index]._root.blur();
		}
		const { otp } = this.state;
		const { onChangePin } = this.props;
		const otpCopy = otp;
		otpCopy[index] = value;
		this.setState({ otp: otpCopy });
		if(onChangePin) {
			onChangePin(otpCopy.join(""));
		}
	}

	renderInputs() {
		const { custominputDigit, type, noOfBoxes, hideNumber } = this.props;
		const inputs = Array(noOfBoxes).fill(0);
		const txt = inputs.map((i, j) => (
			<View key={String(j)} style={styles.inputViewPart}>
				<Input
					style={[styles.inputDigitBox, custominputDigit]}
					maxLength={1}
					keyboardType="numeric"
					secureTextEntry={hideNumber}
					onChangeText={(v) => this.focusNext(j, v)}
					onKeyPress={(e) => this.focusPrevious(e.nativeEvent.key, j)}
					ref={(ref) => this.otpTextInput[j] = ref}
					autoFocus={(j === 0 && type === "first")}
				/>
			</View>
		));
		return txt;
	}

	render() {
		return (
			<View style={styles.gridPad}>
				{this.renderInputs()}
			</View>
		);
	}
}

OtpInputs.defaultProps = {
	type: "",
	onChangePin: null,
	custominputDigit: {},
	resetOTPInput: false
};

OtpInputs.propTypes = {
	type: PropTypes.string,
	noOfBoxes: PropTypes.number.isRequired,
	onChangePin: PropTypes.func,
	custominputDigit: PropTypes.instanceOf(Object),
	hideNumber: PropTypes.bool.isRequired,
	resetOTPInput: PropTypes.bool
};

export default OtpInputs;