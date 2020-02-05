import * as React from "react";
import styles from "../../../styles/pages/free-consultation/list.module.scss";
import Message from "../../Message";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IApplicationState } from "../../../store";
import { withRouter, RouteComponentProps } from "react-router";
import { Row, Col, Input, Layout, Pagination } from "antd";
import { freeConsulationState } from "../../../store/freeConsultation";
import { IntlShape, injectIntl } from "react-intl";
import {
  actionCreators as freeConsulationActionCreators,
  Actions as freeConsulationActions
} from "../../../store/FreeConsultation/actions";
import { AppState } from "../../../store/App";
import { IFreeConsultation } from "../../../types/interfaces";
import { mockFreeConsultation } from "../../../mockData/freeConsultation";
import FreeConsultationCard from "../../../components/Elements/FreeConsultation/Card";
interface ConnectedProps {
  loading: boolean;
  app: AppState;
  freeConsultationList: IFreeConsultation[];
  freeConsultation: freeConsulationState;
  actions: freeConsulationActions;
  intl: IntlShape;
}

interface Props extends RouteComponentProps {}
const { Content } = Layout;
const { Search } = Input;

class FreeConsultationList extends React.PureComponent<Props, {}> {
  public props: ConnectedProps & Props;

  state = {
    freeConsultationList: mockFreeConsultation,
    current: 1,
    total: mockFreeConsultation.length,
    pageSize: 6
  };

  componentWillMount() {
    //this.props.app.dataSource && this.props.actions.fetchFreeConsultationList(this.props.app.dataSource['freeConsultation']);
  }

  componentDidMount() {
    const { total, pageSize, current } = this.state;
    this.setState({
      freeConsultationList: mockFreeConsultation.slice(
        pageSize * (current - 1),
        pageSize * current > total ? total : pageSize * current
      )
    });
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
    this.setState({
      freeConsultationList: mockFreeConsultation.slice(
        pageSize * (current - 1),
        pageSize * current > total ? total : pageSize * current
      )
    });
  };

  render() {
    const { current, total, pageSize, freeConsultationList } = this.state;
    return (
      <div className="freeConsultationListContainer">
        <div className={styles.searchFreeConsultation}>
          <h1>{Message("FREE_CONSULTATION_ONLINE")}</h1>
          <Search
            placeholder="搜索义诊"
            onSearch={value => console.log(value)}
            style={{ width: 600 }}
          />
        </div>
        <Layout
          style={{
            backgroundColor: "#fff",
            flex: "1 0 auto",
            minHeight: "unset"
          }}
        >
          <Content>
            <div className={styles.pageFreeConsultationList}>
              <div className="freeConsultationsContent">
                <Row style={{ maxWidth: "100%" }} type="flex">
                  {freeConsultationList.map((freeConsultation, index) => {
					  console.log(freeConsultation);
                    return (
                      <Col
                        style={{ maxWidth: "100%", paddingBottom:"1rem"}}
                        key={`clinic_${index}`}
                        lg={8}
                        sm={24}
                      >
                        <FreeConsultationCard data={freeConsultation} />
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </div>
          </Content>
        </Layout>
        <Pagination
          onChange={this.handlePageChange}
          pageSize={pageSize}
          defaultCurrent={current}
          total={total}
          className={styles.pagenation}
          style={{ paddingBottom: "2rem"}}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    loading: state.app.loading,
    freeConsultationList: state.freeConsultation
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

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(FreeConsultationList));
