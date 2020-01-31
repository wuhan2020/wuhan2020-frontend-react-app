import * as React from "react";
import styles from '../../../styles/pages/clinic/list.module.scss';
import Message from "../../Message";
import { Row, Col, Layout } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Card from "../../Elements/Card";
import { actionCreators as clinicsActionCreators, Actions as ClinicsActions } from "../../../store/Clinic/actions";
import { IApplicationState } from "../../../store";
import { withRouter, RouteComponentProps } from "react-router";
import { IClinic } from "../../../types/interfaces";
import Button from "../../../components/Elements/Button";

interface ConnectedProps {
	actions: ClinicsActions;
	loading: boolean;
	clinicList: IClinic[];
}

interface Props extends RouteComponentProps {

}

// @todo - remove these when backend better supports data retrieving instead of getting from github directly
const targetDistricts = [
	{key: 0, name: '十堰市'},
	{key: 0, name: '咸宁市'},
	{key: 0, name: '孝感市'},
	{key: 0, name: '宜昌市'},
	{key: 0, name: '武汉市'},
	{key: 0, name: '荆州市'},
	{key: 0, name: '荆门市'},
	{key: 0, name: '襄阳市'},
	{key: 0, name: '鄂州市'},
	{key: 0, name: '随州市'},
	{key: 0, name: '黄冈市'},
	{key: 0, name: '黄石市'},
]

const { Content } = Layout;
class ClinicList extends React.PureComponent<Props, {}>
{
	public props: ConnectedProps & Props;
	componentDidMount() {
		targetDistricts.forEach((item) => {
			this.props.actions.fetchClinicList(item.name, item.key);
		});
	}

	onNewClick = () => {

	}

	render()
	{
		return (
			<Layout style={{backgroundColor: '#fff'}}>
				<Content>
					<div className={styles.pageClinicList}>
						<header>
							<div className={styles.title}>{Message('CLINIC_LIST_PAGE_TITLE')}</div>
							<Button shape='round' type='primary' onClick={() => this.onNewClick}>{Message('NEW_DEMAND')}</Button>
						</header>
					</div>
				</Content>
			</Layout>
		)
	}
}

const mapStateToProps = (state: IApplicationState) =>
{
	return {
		loading: state.app.loading,
		clinicList: state.clinic.list,
	};
};

const mapActionsToProps = dispatch =>
{
	return {
		actions: bindActionCreators(
			{
				...clinicsActionCreators,
			},
			dispatch
		),
	};
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withRouter(ClinicList));