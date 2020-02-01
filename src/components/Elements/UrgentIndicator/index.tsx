import * as React from "react";
import '../../../styles/elements/card/index.scss';

export default class UrgentIndicator extends React.PureComponent<{}, {}>
{
	render()
	{
    return <div style={{width: "15px", height: "15px", backgroundColor: "#FF6440"}} />;
	}
}