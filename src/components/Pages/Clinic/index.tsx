import * as React from "react";
import styles from '../../../styles/pages/clinic/index.module.scss';
import Message from "../../Message";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IApplicationState } from "../../../store";
import { withRouter, RouteComponentProps } from "react-router";
import { Layout, Row, Col, Divider, Table } from "antd";
import { ClinicsState } from "../../../store/Clinic";
import { actionCreators as clinicsActionCreators, Actions as ClinicsActions } from "../../../store/Clinic/actions";
import { AppState } from "../../../store/App";
import { IClinic } from "../../../types/interfaces";
import Button from "../../../components/Elements/Button";

interface ConnectedProps {
  loading: boolean;
  app: AppState;
  clinicsState: ClinicsState;
  actions: ClinicsActions;
}

interface Props extends RouteComponentProps {

}

interface State {
  clinic?: IClinic;
}

const { Content } = Layout;
class Clinic extends React.PureComponent<Props, State>
{
  public props: ConnectedProps & Props;

  state: State = {
  }

  componentWillMount() {
    // if data is not loaded (i.e. a direct visit), load them first
    if (!this.props.clinicsState.list || this.props.clinicsState.list.length === 0) {
      this.props.app.dataSource && this.props.app.dataSource['hospital'].forEach(async (link, index) => {
        await this.props.actions.fetchClinicList(link, index);
      });
    }
  }
  componentDidMount() {
    this.init();
  }
	componentDidUpdate() {
    // @todo - this is a BAD practice, but could be resolve if we have an endpoint for specific clini, and move all these logic to redux store
    this.init();
  }
  
  init = () => {
    const cityName = this.props.match.params['cityName'];
    const id = parseInt(this.props.match.params['clinicId']);
    const clinic = this.props.clinicsState.list.find((c) => {
      return c.city === cityName && c.id === id;
    });

    if (clinic) {
      this.setState({clinic});
    } else {
      console.error('clinic not loaded properly');
    }
  }

  getTableColumns = (): any[] => {
    return [
      {
        title: Message('SUPPLY_NAME'),
        dataIndex: 'key',
        key: 'key',
        render: text => <span>{text}</span>
      },
      {
        title: Message('SPECIFICATION'),
        dataIndex: 'specification',
        key: 'specification',
        render: text => <span>{text}</span>
      },
      {
        title: Message('AMOUNT'),
        dataIndex: 'value',
        key: 'value',
        render: text => <span>{text}</span>
      },
    ]
  }

	render()
	{
    const {clinic} = this.state;
    console.log(clinic);
		return (
			<Layout style={{backgroundColor: '#fff', flex: '1 1 auto', minHeight: 'unset'}}>
				<Content>
					{clinic ? <div className={styles.pageClinic}>
            <Row>
              <Col lg={24}>
                <div className={styles.title}>{Message('CLINIC_PAGE_TITLE')}</div>
              </Col>
            </Row>
            <Row>
              <Col lg={24}>
                <div className={styles.clinicName}>{clinic.name}</div>
              </Col>
            </Row>
            <Row gutter={100}>
              <Col lg={8} sm={24}>
                <section className={styles.infoSection}>
                  <div className={styles.infoSectionTitle}>{Message('MAILING_ADDRESS')}</div>
                  <div className={styles.infoSectionBody}></div>
                </section>
              </Col>
              <Col lg={8} sm={24}>
                <section className={styles.infoSection}>
                  <div className={styles.infoSectionTitle}>{Message('CONTACT_METHODS')}</div>
                  <div className={styles.infoSectionBody}>
                    {clinic.contacts.length > 0 ? clinic.contacts.map((c, index) => {
                      const name = c.name || Message('THIS_CLINIC');
                      return <div key={`clinic_contact_${index}`} className={styles.text}>
                        <span>{name}{`: `}</span><Button type='link' href={`tel:${c.tel}`}>{c.tel}</Button>
                      </div>;
                    }) : null}
                  </div>
                </section>
              </Col>
              <Col lg={8} sm={24}>
                <section className={styles.infoSection}>
                  <div className={styles.infoSectionTitle}>{Message('INFO_SUBMISSION')}</div>
                  <div className={styles.infoSectionBody}>
                    {clinic.url ? <Button type='link' href={clinic.url} target='_blank'>{Message('VIEW_SOURCE')}</Button> : null}
                  </div>
                </section>
              </Col>
            </Row>
            <Divider />
            <Table columns={this.getTableColumns()} dataSource={clinic.supplies} />
					</div> : null}
				</Content>
			</Layout>
		)
	}
}

const mapStateToProps = (state: IApplicationState) =>
{
	return {
		loading: state.app.loading,
		app: state.app,
		clinicsState: state.clinic,
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
)(withRouter(Clinic));