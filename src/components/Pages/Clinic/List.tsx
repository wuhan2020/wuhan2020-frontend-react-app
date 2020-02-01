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
import ClinicCard from "../../../components/Elements/Clinic/Card";
import { clinicsLocation } from "../../../constants/globals";
import Select from "../../../components/Elements/Select";
import Option from "../../../components/Elements/Select/Option";
import { makeFilteredClinicsSelector, ClinicsState } from "../../../store/Clinic";
import { AppState } from "../../../store/App";

interface ConnectedProps {
	actions: ClinicsActions;
	app: AppState;
	clinicsState: ClinicsState;
	loading: boolean;
	clinicList: IClinic[];
}

interface Props extends RouteComponentProps {

}

const { Content } = Layout;
class ClinicList extends React.PureComponent<Props, {}>
{
	public props: ConnectedProps & Props;

	provinces: {key: number, name: string}[] = [
		{key: -1, name: '省市'},
	];

	componentDidMount() {
		this.props.app.dataSource && this.props.app.dataSource['hospital'].forEach((link, index) => {
			this.props.actions.fetchClinicList(link, index);
		})
	}

	onNewClick = () => {

	}

	onCityFilterChange = (value) => {
		this.props.actions.updateCity(value);
	}

	render()
	{
		const {clinicList, clinicsState} = this.props;
		return (
			<Layout style={{backgroundColor: '#fff', flex: '1 1 auto', minHeight: 'unset'}}>
				<Content>
					<div className={styles.pageClinicList}>
						<header>
							<div className={styles.title}>{Message('CLINIC_LIST_PAGE_TITLE')}</div>
							<Button shape='round' type='primary' onClick={() => this.onNewClick}>{Message('NEW_DEMAND')}</Button>
						</header>
						<section className={styles.filters}>
							<Row type='flex'>
								<Col lg={3} sm={12}>
									<Select
										onChange={this.onCityFilterChange}
										className={styles.cityFilter}
										defaultValue={clinicsState.cityList[0].key}>
										{clinicsState.cityList.map((d) => {
											return (
												<Option value={d.key}>{d.name}</Option>
											);
										})}
									</Select>
								</Col>
							</Row>
						</section>
						<section className={styles.listWrapper}>
							<Row type='flex'>
								{clinicList.map((clinic, index) => {
									return (
										<Col key={`clinic_${index}`} lg={8} sm={24}>
											<ClinicCard clinic={clinic} />
										</Col>
									);
								})}
							</Row>
						</section>
					</div>
				</Content>
			</Layout>
		)
	}
}

const mapStateToProps = (state: IApplicationState) =>
{
	const filteredClinicsSelector = makeFilteredClinicsSelector();
	return {
		app: state.app,
		loading: state.app.loading,
		clinicsState: state.clinic,
		clinicList: filteredClinicsSelector(state),
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