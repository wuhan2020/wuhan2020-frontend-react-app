import * as React from "react";
import styles from '../../../styles/pages/epidemic/index.module.scss';
import Message from "../../Message";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IApplicationState } from "../../../store";
import { withRouter, RouteComponentProps } from "react-router";
import { Layout } from "antd";
import { HierarchicalVirusMap } from 'wuhan2020-mapviz';
import {data} from '../../../mockData/Epidemic';
import { isMobile } from "../../../utils/deviceHelper";

interface ConnectedProps {
	loading: boolean;
}

interface Props extends RouteComponentProps {

}
const { Content } = Layout;

const RESOLUTION = 3600000 * 24;
class Epidemic extends React.PureComponent<Props, {}>
{
	public props: ConnectedProps & Props;
	componentDidMount() {
	}

	onNewClick = () => {

	}

	render()
	{
		return (
			<Layout style={{backgroundColor: '#fff', flex: '1 0 auto', minHeight: 'unset'}}>
				<Content>
					<div className={styles.pageEpidemic}>
            <div className="virus-map" style={{width: '100vw', height: '100%', padding: '20px'}}>
              <HierarchicalVirusMap data={data} resolution={RESOLUTION} type={'overview'} />
            </div>
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
	};
};

const mapActionsToProps = dispatch =>
{
	return {
		actions: bindActionCreators(
			{
			},
			dispatch
		),
	};
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withRouter(Epidemic));