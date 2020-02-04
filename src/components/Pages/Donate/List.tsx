import * as React from "react";
import styles from '../../../styles/pages/donate/list.module.scss';
import Message from "../../Message";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IApplicationState } from "../../../store";
import { RouteComponentProps, withRouter } from "react-router";
import { Col, Layout, Row } from "antd";
import { actionCreators as donateActionCreators, Actions as DonateActions } from "../../../store/Donate/actions";
import { IDonate } from '../../../types/interfaces';
import { DonateState, makeFilteredDonatesSelector } from "../../../store/Donate";
import DonateCard from "../../../components/Elements/Donate/Card";
import { AppState } from '../../../store/App';

interface ConnectedProps {
	loading: boolean;
  app: AppState;
  actions: DonateActions;
  donateList: IDonate[];
  donateState: DonateState;
}

interface Props extends RouteComponentProps {}

const { Content } = Layout;

class DonateList extends React.PureComponent<Props, {}> {
	public props: ConnectedProps & Props;

	componentDidMount() {
    this.props.app.dataSource && this.props.actions.fetchDonateList(this.props.app.dataSource['donation']);
  }

  onCityFilterChange = (value) => {
    this.props.actions.updateCity(value);
  };

	render() {
    const { donateList, donateState } = this.props;
		return (
			<Layout style={{backgroundColor: '#fff', flex: '1 0 auto', minHeight: 'unset'}}>
				<Content>
          <div className={styles.pageDonateList}>
            <header>
              <div className={styles.title}>{Message('DONATE_PAGE_TITLE')}</div>
              <div className={styles.subtitle}>{Message('DONATE_PAGE_SUBTITLE')}</div>
            </header>
            <section className={styles.filters}>
              <Row gutter={16}>
                <Col xl={3} sm={12}>

                </Col>
                <Col lg={3} sm={12}>

                </Col>
              </Row>
            </section>
            <section className={styles.listWrapper}>
              <Row style={{maxWidth: '100%', width: '100%'}} gutter={16} type='flex'>
                {donateList.map((donate, index) => {
                  return (
                    <Col className={styles.gridCol} key={`donate_${index}`} xxl={8} xl={12} xs={24}>
                      <DonateCard donate={donate} />
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

const mapStateToProps = (state: IApplicationState) => {
  const filteredDonatesSelector = makeFilteredDonatesSelector();
  return {
    app: state.app,
    loading: state.app.loading,
    donateState: state.donate,
    donateList: filteredDonatesSelector(state),
  };
};

const mapActionsToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...donateActionCreators,
      },
      dispatch
    ),
  };
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withRouter(DonateList));