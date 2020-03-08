import * as React from "react";
import '../../../styles/elements/input/index.scss';
import { Input as AntDInput } from "antd";
import { InputProps as AntDInputProps, SearchProps as AntDSearchProps } from "antd/lib/input";

const { Search: AntDSearch } = AntDInput;

interface InputProps extends AntDInputProps {

}

export default class Input extends React.PureComponent<InputProps, {}>
{
  render()
  {

    return React.cloneElement(<AntDInput />, {...this.props});
  }
}

interface SearchProps extends AntDSearchProps {

}

export class Search extends React.PureComponent<SearchProps, {}> {
  render()
  {

    return React.cloneElement(<AntDSearch />, {...this.props});
  }
}
