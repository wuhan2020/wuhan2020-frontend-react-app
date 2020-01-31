import * as React from "react";
import styles from '../../styles/pages/home/index.module.scss';
import Message from "../Message";
import { Row, Col, Layout } from "antd";
import Card from "../Elements/Card";

const { Content } = Layout;
export default class Home extends React.PureComponent<{}, {}>
{

	renderOverview = () => {
		return (
			<div className={styles.overview}>
				<label>{Message('OVERVIEW')}</label>
				<Row gutter={40}>
					<Col lg={12} md={24}>
						<Card style={{width: '100%'}}>
							<div className={styles.cardBody}>
								<div className={styles.overviewTitle}>{Message('DOMESTIC')}</div>
								</div>
						</Card>
					</Col>
					<Col lg={12} md={24}>
						<Card style={{width: '100%'}}>
							<div className={styles.cardBody}>
								<div className={styles.overviewTitle}>{Message('INTERNATIONAL')}</div>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}

	render()
	{
		return (
			<Layout>
				<Content>
					<div className={styles.pageHome}>
						{this.renderOverview()}
					</div>
				</Content>
			</Layout>
		)
	}
}