import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	StyleSheet,
	View,
	TouchableWithoutFeedback
} from "react-native";

let styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexDirection: "row",
		padding: 10,
	},
	radio: {
		alignItems: "center",
		justifyContent: "center",
	},
	item: {
		marginLeft: 5,
		alignItems: "center",
		justifyContent: "center",
	}
});

export default class RadioButton extends Component {
	constructor(props, context) {
		super(props, context);
	}

	getRadioStyle() {
		const { size, thickness, color } = this.context;
		const { isSelected, activeColor } = this.props;
		return {
			height: size,
			width: size,
			borderRadius: size / 2,
			borderWidth: thickness,
			borderColor: isSelected && activeColor ? activeColor : color,
		};
	}

	getRadioDotStyle() {
		const { size } = this.context;
		const { color, activeColor } = this.props;
		return {
			height: size / 2,
			width: size / 2,
			borderRadius: size / 4,
			backgroundColor: color || activeColor,
		};
	}

	isSelected() {
		const { isSelected } = this.props;
		if(isSelected) { return <View style={this.getRadioDotStyle()} />; }
	}

	render() {
		const { children, disabled, index, value, style, isSelected } = this.props;
		const { onSelect, highlightColor } = this.context;
		return (
			<View style={{ opacity: disabled ? 0.4 : 1 }}>
				<TouchableWithoutFeedback
					disabled={disabled}
					onPress={() => onSelect(index, value)}
				>
					<View style={[styles.container, style, isSelected ? { backgroundColor: highlightColor } : null]}>
						<View style={[styles.radio, this.getRadioStyle()]}>
							{this.isSelected()}
						</View>
						<View style={styles.item}>
							{children}
						</View>
					</View>
				</TouchableWithoutFeedback>
			</View>
		);
	}
}

RadioButton.contextTypes = {
	onSelect: PropTypes.func.isRequired,
	size: PropTypes.number.isRequired,
	thickness: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	highlightColor: PropTypes.string
};

