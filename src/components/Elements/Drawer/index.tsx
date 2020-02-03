import * as React from "react";
import '../../../styles/elements/drawer/index.scss';
import { Drawer as AntDDrawer } from "antd";
import { DrawerProps as AntDDrawerProps } from "antd/lib/drawer";

interface DrawerProps extends AntDDrawerProps {

}

export default class Drawer extends React.PureComponent<DrawerProps, {}>
{
	render()
	{
		return React.cloneElement(<AntDDrawer />, {...this.props});
	}
}