import * as React from "react";
import '../../../styles/elements/menu/item.scss';
import { Menu as AntDMenu } from "antd";
import { MenuItemProps as AntDMenuItemProps } from "antd/lib/menu/MenuItem";

interface MenuItemProps extends AntDMenuItemProps {

}

export default class MenuItem extends React.PureComponent<MenuItemProps, {}>
{
	render()
	{

		return React.cloneElement(<AntDMenu.Item />, {...this.props});
	}
}