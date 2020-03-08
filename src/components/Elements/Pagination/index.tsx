import * as React from 'react';
import '../../../styles/elements/pagination/index.scss';
import { Pagination as AntDPagination } from 'antd';
import { PaginationProps as AntDPaginationProps } from 'antd/lib/pagination';

interface PaginationProps extends AntDPaginationProps {}

export default class Pagination extends React.PureComponent<PaginationProps, {}> {
  render() {
    return React.cloneElement(<AntDPagination />, { ...this.props });
  }
}
