import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IApplicationState } from "../store/index";
import { IntlProvider } from "react-intl";
import { getLocales, ILocales } from "../intl/index";

interface ConnectedProps
{
	locale: ILocales;
}

export class IntlContainer extends React.PureComponent<ConnectedProps, {}> {
	public componentDidMount() { }

	public render()
	{
		return (
			<div>
				<IntlProvider
					locale="en"
					messages={getLocales(this.props.locale)}
				>
					{this.props.children}
				</IntlProvider>
			</div>
		);
	}
}

const mapStateToProps = (state: IApplicationState) =>
{
	return {
		locale: state.app.locale,
	};
};

const mapActionsToProps = dispatch =>
{
	return {
		actions: bindActionCreators(
			{},
			dispatch
		),
	};
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(IntlContainer);
