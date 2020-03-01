import * as React from 'react';
import Iframe from 'react-iframe';
import styles from '../../../styles/pages/logistics/check.module.scss';
import { isMobile } from '../../../utils/deviceHelper';
import Message from '../../../components/Message';
import { CDN_PREFIX } from '../../../constants/globals';

class LogisticsCheck extends React.Component<{}, {}> {
  render() {
    return (
      <div className={styles.pageLogisticsCheck}>
        {isMobile ? (
          <React.Fragment></React.Fragment>
        ) : (
          <React.Fragment>
            <Iframe
              url="https://www.kuaidi100.com/frame/index.html"
              width="960px"
              height="880px"
              frameBorder={0}
            ></Iframe>
            <div className={styles.code}>
              <img
                src={`${CDN_PREFIX}/static/kuaidi100-lite-app.png`}
                alt="kuaidi100"
                width={175}
                height={175}
              />
              <span>{Message('LOGISTICS_HELP')}</span>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default LogisticsCheck;
