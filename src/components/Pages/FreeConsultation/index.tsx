import * as React from "react";
import styles from "../../../styles/pages/free-consultation/index.module.scss";
import Message from "../../Message";
import { connect } from "react-redux";
import { Layout, Row, Col, Divider, Table, message } from "antd";
import { bindActionCreators } from "redux";
import { IApplicationState } from "../../../store";
import { withRouter, RouteComponentProps } from "react-router";
import { FreeConsultationState } from "../../../store/FreeConsultation";
import { IntlShape, injectIntl } from "react-intl";
import { AppState } from "src/store/App";
import {
  actionCreators as FreeConsultationActionCreators,
  Actions as FreeConsultationActions
} from "../../../store/FreeConsultation/actions";

interface ConnectedProps {
  loading: boolean;
  app: AppState;
  free_consultState: FreeConsultationState;
  actions: FreeConsultationActions;
  intl: IntlShape;
}

interface State {}

interface Props extends RouteComponentProps {}

const { Content } = Layout;

class FreeConsultation extends React.PureComponent<Props, State> {
  public props: ConnectedProps & Props;
  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {
    // @todo - this is a BAD practice, but could be resolve if we have an endpoint for specific clini, and move all these logic to redux store
    this.init();
  }

  init() {
    throw new Error("Method not implemented.");
  }

  render(){
      return(
          <Layout style={{backgroundColor: '#fff', flex: '1 0 auto', minHeight: 'unset'}}>
              <Content>
                    
              </Content>
          </Layout>
      )
  }
}
