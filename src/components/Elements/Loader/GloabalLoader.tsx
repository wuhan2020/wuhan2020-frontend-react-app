import * as React from "react";
import '../../../styles/elements/loader/globalLoader.scss';
import { Spin } from "antd";

interface CardProps {
  size?: 'small' | 'default' | 'large',
}

export default class GlobalLoader extends React.PureComponent<CardProps, {}>
{
	render()
	{
    return (
      <div className='globalLoader'>
        <Spin wrapperClassName='wrapper' size={this.props.size || 'default'} />
      </div>
    );
	}
}