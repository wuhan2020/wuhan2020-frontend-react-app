import * as React from "react";
import '../../../styles/elements/select/option.scss';
import { Select } from "antd";
import { OptionProps as AntDOptionProps } from "antd/lib/select";

interface OptionProps extends AntDOptionProps {

}

export default class Option extends React.PureComponent<OptionProps, {}>
{
	render()
	{

		return React.cloneElement(<Select.Option />, {...this.props});
	}
}