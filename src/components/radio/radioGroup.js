import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import RadioButton from "./radioButton";
// import { AppTheme } from "../../utils/aapTheme.js";

const defaultSize = 20;
const defaultThickness = 1;

export default class RadioGroup extends Component {
	constructor(props, context) {
		super(props, context);

		const { selectedIndex } = props;
		this.state = {
			selectedIndex,
		};
		this.prevSelected = selectedIndex;
		this.onSelect = this.onSelect.bind(this);
	}

	getChildContext() {
		const { size, thickness, color, highlightColor } = this.props;
		return {
			onSelect: this.onSelect,
			size: size,
			thickness: thickness,
			color: color,
			highlightColor: highlightColor
		};
	}

	componentDidUpdate(prevProps) {
		const { selectedIndex } = this.props;
		if(prevProps.selectedIndex != this.prevSelected) {
			this.prevSelected = selectedIndex;
			this.setState({
				selectedIndex
			});
		}
	}

	onSelect(index, value) {
		const { onSelect } = this.props;
		this.setState({
			selectedIndex: index
		});
		if(onSelect) { onSelect(index, value); }
	}

	render() {
		const { style, children, activeColor, color } = this.props;
		const { selectedIndex } = this.state;
		let radioButtons = React.Children.map(children, (radioButton, index) => {
			let isSelected = selectedIndex === index;
			let radioColor = isSelected && activeColor ? activeColor : color;
			return (
				<RadioButton
					color={radioColor}
					activeColor={activeColor}
					{...radioButton.props}
					index={index}
					isSelected={isSelected}
				>
					{radioButton.props.children}
				</RadioButton>
			);
		});

		return (
			<View style={style}>
				{radioButtons}
			</View>
		);
	}
}

RadioGroup.childContextTypes = {
	onSelect: PropTypes.func.isRequired,
	size: PropTypes.number.isRequired,
	thickness: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	activeColor: PropTypes.string,
	highlightColor: PropTypes.string,
};

RadioGroup.defaultProps = {
	size: defaultSize,
	thickness: defaultThickness,
	color: "red",
	highlightColor: null,
};