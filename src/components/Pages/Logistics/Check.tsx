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
          <React.Fragment>
            <div className={styles.code}>
              <img
                src={`${CDN_PREFIX}/static/qrcode-kuaidi100-lite-app.png`}
                alt="kuaidi100"
                width={175}
                height={175}
              />
              <span>{Message('SCAN_TO_KUAIDI_100')}</span>
            </div>
            <div className={styles.code}>
              <img
                src={`${CDN_PREFIX}/static/qrcode-help.png`}
                alt="help"
                width={175}
                height={175}
              />
              <span>{Message('LOGISTICS_HELP')}</span>
            </div>
          </React.Fragment>
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
                src={`${CDN_PREFIX}/static/qrcode-help.png`}
                alt="help"
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
