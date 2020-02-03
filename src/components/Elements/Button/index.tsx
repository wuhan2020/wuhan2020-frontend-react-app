import * as React from "react";
import '../../../styles/elements/button/index.scss';
import { Button as AntDButton } from "antd";
import { ButtonProps as AntDButtonProps } from "antd/lib/button";

interface ButtonProps extends AntDButtonProps {
	theme?: 'main' | 'white';
	fakeDisabled?: boolean;
}

export default class Button extends React.PureComponent<ButtonProps, {}>
{
	render()
	{
		const props = {...this.props};

		delete props.theme;
		delete props.fakeDisabled;

		return React.cloneElement(<AntDButton />, {...AntDButton.defaultProps, ...props, className: `${this.props.theme || 'main'} ${this.props.fakeDisabled ? 'fakeDisabled' : ''}`});
	}
}