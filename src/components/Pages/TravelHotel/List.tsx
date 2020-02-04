import * as React from "react";
import styles from '../../../styles/pages/travel-hotel/list.module.scss';
import Message from "../../Message";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IApplicationState } from "../../../store";
import { withRouter, RouteComponentProps } from "react-router";
import { Layout } from "antd";
import TravelHotelCard from "../../../components/Elements/TravelHotel/index";

interface ConnectedProps {
	loading: boolean;
}

interface Props extends RouteComponentProps {

}
const { Content } = Layout;
class TravelHotelList extends React.PureComponent<Props, {}>
{
	public props: ConnectedProps & Props;
	componentDidMount() {
	}

	onNewClick = () => {

	}

	render()
	{
		const travelhotel = {
			"id": 0,
			"province": "云南",
			"city": "昆明市-官渡区",
			"contacts": [{
				"name": "",
				"tel": "0871-65655099"
			}],
			"address": "官渡区大板桥商业街889号",
			"name": "维也纳智好酒店机场店",
			"date": "2020-01-27T16:00:00.000Z",
			"url": "http://wlj.wuhan.gov.cn/html/gsgg/20200128/13301.html",
			"remark": null
		};
		return (
			<Layout style={{backgroundColor: '#fff', flex: '1 0 auto', minHeight: 'unset'}}>
				<Content>
					<TravelHotelCard history={this.props.history} travelhotel={travelhotel} />
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
)(withRouter(TravelHotelList));