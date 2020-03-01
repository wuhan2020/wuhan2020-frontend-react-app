import * as React from 'react';
import Iframe from 'react-iframe';
import styles from '../../../styles/pages/logistics/check.module.scss';

class LogisticsCheck extends React.Component<{}, {}> {
  render() {
    return (
      <div className={styles.pageLogisticsCheck}>
        <Iframe
          url="https://www.kuaidi100.com/frame/index.html"
          width="960px"
          height="880px"
          frameBorder={0}
        ></Iframe>
      </div>
    );
  }
}

export default LogisticsCheck;
