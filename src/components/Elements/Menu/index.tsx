import * as React from "react";
import '../../../styles/elements/menu/index.scss';
import { Menu as AntDMenu } from "antd";
import { MenuProps as AntDMenuProps } from "antd/lib/menu";

interface MenuProps extends AntDMenuProps {

}

export default class Menu extends React.PureComponent<MenuProps, {}>
{
	render()
	{

		return React.cloneElement(<AntDMenu />, {...this.props});
	}
}