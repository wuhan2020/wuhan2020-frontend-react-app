import * as React from "react";
import styles from '../../styles/pages/clinics/index.module.scss';
import Message from "../Message";
import { Row, Col, Layout } from "antd";
import Card from "../Elements/Card";

const { Content } = Layout;
export default class Clinics extends React.PureComponent<{}, {}>
{
	render()
	{
		return (
			<Layout>
				<Content>
          Hello
				</Content>
			</Layout>
		)
	}
}