import React from 'react';
import Switch from 'react-switch';
import ComponentContainer from './ComponentContainer';
import Label from './Label';

const SwitchInput = ({ onChange, id, width, leftLable, rightLabel, label, ...inputProps }) => {
	const height = width * 0.4166;
	const handleDiameter = width * 0.625;
	return (
		<ComponentContainer>
			<div className="input-switch-container">
				{leftLable && <Label>{leftLable}</Label>}
				<div className="input-switch">
					<Switch
						{...inputProps}
						id={id}
						width={width}
						height={height}
						handleDiameter={handleDiameter}
						//boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
						//activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
						boxShadow="0px 1px 5px"
						activeBoxShadow="0px 0px 1px 10px"
						onChange={checked => onChange({ id, value: checked })}
					/>
				</div>
				<Label>{rightLabel || label}</Label>
			</div>
		</ComponentContainer>
	);
};

SwitchInput.defaultProps = {
	checked: false,
	checkedIcon: false,
	uncheckedIcon: false,
	width: 30,
	// height: 20,
	// handleDiameter: 30,
	onColor: '#86d3ff',
	onHandleColor: '#1976d2',
	className: 'react-switch',
	onChange: () => { }
};

export default SwitchInput;
