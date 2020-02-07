import * as React from "react";
import styles from '../../../styles/pages/epidemic/index.module.scss';
import Message from "../../Message";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IApplicationState } from "../../../store";
import { withRouter, RouteComponentProps } from "react-router";
import { Layout } from "antd";
import { HierarchicalVirusMap } from 'wuhan2020-mapviz';
import { isMobile } from "../../../utils/deviceHelper";
import { actionCreators, Actions } from "../../../store/LiveMap/actions";
import { convertProvincesSeries, convertCountry, convertCountrySeries } from "../../../utils/isacclin";

const patch = [
  {
    "provinceName": "青海省",
    "provinceShortName": "青海",
    "confirmedCount": 1,
    "suspectedCount": 0,
    "curedCount": 0,
    "deadCount": 0,
    "comment": "",
    "cities": [
      {
        "cityName": "西宁",
        "confirmedCount": 1,
        "suspectedCount": 0,
        "curedCount": 0,
        "deadCount": 0
      }
    ],
    "country": "中国",
    "updateTime": 1580001790159
  }
]

interface ConnectedProps {
  actions: Actions;
  loading: boolean;
  data: any;
}

interface Props extends RouteComponentProps {

}
const { Content } = Layout;

const RESOLUTION = 3600000 * 24;
class Epidemic extends React.PureComponent<Props, {}>
{
  public props: ConnectedProps & Props;
  
  componentWillMount() {
    this.props.actions.fetchData();
  }

	componentDidMount() {
	}

	onNewClick = () => {

	}

	render()
	{
    if (!this.props.data) return (
			<Layout style={{backgroundColor: '#fff', flex: '1 0 auto', minHeight: 'unset'}}>
        <Content></Content>
      </Layout>
    );
    const data = {
      provincesSeries: convertProvincesSeries([...this.props.data['history'], ...patch], RESOLUTION, true),
      countrySeries: convertCountrySeries(this.props.data['overall'], RESOLUTION),
      countryData: convertCountry(this.props.data['current']),
    }
		return (
			<Layout style={{backgroundColor: '#fff', flex: '1 0 auto', minHeight: 'unset'}}>
				<Content>
					<div className={styles.pageEpidemic}>
            <div className="virus-map" style={{width: '100vw', height: '100%', padding: '20px'}}>
              <HierarchicalVirusMap data={data} resolution={RESOLUTION} type={isMobile ? 'mobile' : 'pc'} />
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
    data: state.liveMap.data,
	};
};

const mapActionsToProps = dispatch =>
{
	return {
		actions: bindActionCreators(
			{
        ...actionCreators,
			},
			dispatch,
		),
	};
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withRouter(Epidemic));