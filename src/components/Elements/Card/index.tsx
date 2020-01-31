import * as React from "react";
import '../../../styles/elements/card/index.scss';
import { Card as AntDCard } from "antd";
import { CardProps as AntDCardProps } from "antd/lib/card";

interface CardProps extends AntDCardProps {

}

export default class Card extends React.PureComponent<CardProps, {}>
{
	render()
	{

		return React.cloneElement(<AntDCard />, {...this.props});
	}
}