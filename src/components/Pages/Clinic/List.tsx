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
import { makeFilteredClinicsSelector } from "../../../store/Clinic";

interface ConnectedProps {
	actions: ClinicsActions;
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
		clinicsLocation.forEach((location) => {
			location.districts.forEach((d) => {
				this.provinces.push({...d});
				this.props.actions.fetchClinicList(location.province.key, d.value, d.key);
			})
		});
	}

	onNewClick = () => {

	}

	onDistrictFilterChange = (value) => {
		this.props.actions.updateDistrict(value);
	}

	render()
	{
		const {clinicList} = this.props;
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
										onChange={this.onDistrictFilterChange}
										className={styles.districtFilter}
										defaultValue={this.provinces[0].key}>
										{this.provinces.map((p) => {
											return (
												<Option value={p.key}>{p.name}</Option>
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
		loading: state.app.loading,
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