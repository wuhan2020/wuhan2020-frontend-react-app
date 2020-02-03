import * as React from "react";
import '../../../styles/elements/select/index.scss';
import { Select as AndDSelect } from "antd";
import { SelectProps as AntDSelectProps } from "antd/lib/select";

interface SelectProps extends AntDSelectProps {

}

export default class Select extends React.PureComponent<SelectProps, {}>
{
	render()
	{

		return React.cloneElement(<AndDSelect />, {...this.props});
	}
}