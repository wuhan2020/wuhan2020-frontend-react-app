import * as React from "react";
import styles from "../../../styles/pages/free-consultation/list.module.scss";
import Message from "../../Message";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IApplicationState } from "../../../store";
import { withRouter, RouteComponentProps } from "react-router";
import { Row, Col, Input, Layout, Pagination } from "antd";
import { freeConsulationState } from "../../../store/FreeConsultations";
import { IntlShape, injectIntl } from "react-intl";
import {
  actionCreators as freeConsulationActionCreators,
  Actions as freeConsulationActions
} from "../../../store/FreeConsultations/actions";
import { AppState } from "../../../store/App";
import { IFreeConsultation } from "../../../types/interfaces";
import FreeConsultationCard from "../../../components/Elements/FreeConsultation/Card";
import { isMobile } from "../../../utils/deviceHelper";
interface ConnectedProps {
  loading: boolean;
  app: AppState;
  freeConsultationList: IFreeConsultation[];
  freeConsultation: freeConsulationState;
  actions: freeConsulationActions;
  intl: IntlShape;
}

interface Props extends RouteComponentProps {

}
interface State {
	current: number;
	total: number;
	pageSize: 6;
	freeConsultationList: IFreeConsultation[];
}
const { Content } = Layout;
const { Search } = Input;

class FreeConsultationList extends React.PureComponent<Props, {}> {
  public props: ConnectedProps & Props;

	state = {
		current: 1,
		total: 0,
		pageSize: 6,
		freeConsultationList: []
	}
	
	componentWillMount() {
		this.props.app.dataSource && this.props.actions.fetchFreeConsultationList(this.props.app.dataSource['clinic']);
	}

	componentDidMount() {
		const { total , pageSize, current} = this.state;
		const { freeConsultationList } = this.props;
		
		this.setState({freeConsultationList: freeConsultationList.slice((pageSize * (current - 1)), pageSize * current > total ? total : pageSize * current)})
	}

  onNewClick = () => {};

  handlePageChange = page => {
    this.setState({
      current: page
    });
    this.getPerPageInfo(page);
  };

	getPerPageInfo = (current: number) => {
		const { pageSize, total } = this.state;
		const { freeConsultationList } = this.props;

		this.setState({freeConsultationList: freeConsultationList.slice((pageSize * (current - 1)), pageSize * current  > total ? total : pageSize * current)})
	}

	render()
	{
		const {current, total, pageSize} = this.state;
		const {freeConsultationList} = this.props;
		return (
			<div className={styles.pageFreeConsultationList}>
				<Layout style={{backgroundColor: '#fff', flex: '1 0 auto', minHeight: 'unset'}}>
					<Content>
						<header className={styles.searchFreeConsultation}>
							<h3>{Message('FREE_CONSULTATION_ONLINE')}</h3>
							<Row type='flex' justify='center' style={{width: '100%'}}>
								<Col lg={8} sm={24} xs={24}>
									<Search
										placeholder={this.props.intl.formatMessage({ id: 'SEARCH_CONSULTATION' })}
										onSearch={value => console.log(value)}
									/>
								</Col>
							</Row>
						</header>
						<div className={styles.pageFreeConsultationList}>
							<div className={styles.freeConsultationsContent}>
								<Row style={{maxWidth: '100%'}} type='flex' gutter={isMobile ? 0 : 24}>
									{freeConsultationList.map((freeConsultation, index) => {
										return (
											<Col style={{maxWidth: '100%'}} key={`consultation_${index}`} xs={24} lg={8} sm={24}>
												<FreeConsultationCard data={freeConsultation}/>
											</Col>
										);
									})}
								</Row>
							</div>
						</div>
					</Content>
				</Layout>
				<div className={styles.paginationWrapper}>
					<Pagination onChange={this.handlePageChange} pageSize={pageSize} defaultCurrent={current} total={total} />
					</div>
			</div>
		)
	}
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    app: state.app,
    loading: state.app.loading,
    freeConsultationList: state.freeConsultation.list
  };
};

const mapActionsToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...freeConsulationActionCreators
      },
      dispatch
    )
  };
};

export default injectIntl(
  connect(
    mapStateToProps,
    mapActionsToProps
  )(withRouter(FreeConsultationList)) as any
) as any;
