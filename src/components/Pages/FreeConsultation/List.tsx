import * as React from "react";
import styles from "../../../styles/pages/free-consultation/list.module.scss";
import Message from "../../Message";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IApplicationState } from "../../../store";
import { withRouter, RouteComponentProps } from "react-router";
import { Layout, Col, Row, Card } from "antd";
import { AppState } from "src/store/App";
import {
  actionCreators as FreeConsultationActionCreators,
  Actions as FreeConsultationActions
} from "../../../store/FreeConsultation/actions";
import { IntlShape } from "react-intl";
import { Search } from "../../Elements/Input";
import {
  makeFilteredClinicsSelector,
  ClinicsState
} from "../../../store/Clinic";
import FreeConsultationCard from "../../Elements/FreeConsult/Card";
import { IFreeConsultation, IClinic } from "src/types/interfaces";

interface ConnectedProps {
  loading: boolean;
  app: AppState;
  freeConsultState: ClinicsState;
  actions: FreeConsultationActions;
  intl: IntlShape;
  freeConsultList: IFreeConsultation[];
}

interface Props extends RouteComponentProps {}
const { Content } = Layout;
class FreeConsultationList extends React.PureComponent<Props, {}> {
  public props: ConnectedProps & Props;

  onFreeConsultationSearch:
    | ((
        value: string,
        event?:
          | React.ChangeEvent<HTMLInputElement>
          | React.MouseEvent<HTMLElement, MouseEvent>
          | React.KeyboardEvent<HTMLInputElement>
          | undefined
      ) => void)
    | undefined;

  componentDidMount() {}

  componentWillMount() {
    console.log(this.props.app.dataSource);
    this.props.app.dataSource &&
      this.props.actions.fetchFreeConsultationList(
        this.props.app.dataSource["clinic"]
      );
  }

  onNewClick = () => {};

  render() {
    const { freeConsultList, freeConsultState } = this.props;

    return (
      <Layout
        style={{
          backgroundColor: "#fff",
          flex: "1 0 auto",
          minHeight: "unset"
        }}
      >
        <Content>
          <div className={styles.pageFreeConsultationList}>
            <header>
              <div className={styles.title}>
                {Message("FREE_CONSULTATION_PAGE_TITLE")}
              </div>
            </header>
            <section>
              <Row gutter={16}>
                <Col lg={6} sm={12}>
                  <Search
                    // placeholder={this.props.intl.formatMessage({
                    //   id: "SEARCH_FREE_CONSULTATION"
                    // })}
                    onSearch={this.onFreeConsultationSearch}
                  ></Search>
                </Col>
              </Row>
            </section>

            <section className={styles.listWrapper}>
              <Row style={{ maxWidth: "100%", width: "100%" }} type="flex">
                {freeConsultList.map((freeconsult, index) => {
                  return (
                    <Col
                      style={{ maxWidth: "100%" }}
                      key={`free_consult_${index}`}
                      lg={8}
                      sm={24}
                    >
                      <FreeConsultationCard
                        history={this.props.history}
                        freeconsult={freeconsult}
                      ></FreeConsultationCard>
                    </Col>
                  );
                })}
              </Row>
            </section>
          </div>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  const filteredClinicsSelector = makeFilteredClinicsSelector();
  return {
    app: state.app,
    loading: state.app.loading,
    freeConsultState: state.clinic
    // freeConsultList: filteredClinicsSelector(state)
  };
};

const mapActionsToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...FreeConsultationActionCreators
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(FreeConsultationList));
