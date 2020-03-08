import * as React from 'react';
import styles from '../../../styles/elements/logistics/card.module.scss';
import Card from '../Card';
import { ILogistic } from '../../../types/interfaces';
import Message from '../../../components/Message';
import moment from 'moment';
import Button from '../Button';
import { Icon } from 'antd';
import { isMobile } from '../../../utils/deviceHelper';

interface LogisticsCardProps {
  data: ILogistic;
  onClick: (data: ILogistic) => void;
}

export default class LogisticsCard extends React.PureComponent<LogisticsCardProps, {}> {
  handleOnDetailClick = () => {
    const { onClick, data } = this.props;
    onClick(data);
  };
  render() {
    const { data } = this.props;
    const [contact] = data.contacts;
    return (
      <Card className={styles.elementsLogisticsListCard}>
        <div className={styles.main}>
          <div className={styles.mainContent}>
            {
              /** 名称 */
              <div className={styles.title}>
                <span className={styles.name}>{data.name}</span>
                {data.greenPath === '是' && (
                  <span className={styles.greenChannel}>{Message('GREEN_CHANNEL')}</span>
                )}
              </div>
            }
            {
              /** 路径 */
              <section className={styles.route}>
                <div className={styles.routeItem}>
                  <span>{data.from}</span>
                  <span>{Message('SEND_FROM')}</span>
                </div>
                <div className={styles.arrow} />
                <div className={styles.routeItem}>
                  <span>{data.dest}</span>
                  <span>{Message('SEND_TO')}</span>
                </div>
              </section>
            }
            {/** 电话 */
            contact && contact.tel && (
              <div className={styles.infoItem}>
                <Icon type="mobile" />
                {isMobile ? (
                  <div>
                    {contact.tel.split(';').map(tel => (
                      <div key={tel} className={styles.mobilePhoneItem}>
                        <span className={styles.phone} onClick={() => window.open(`tel:${tel}`)}>
                          {tel}
                        </span>
                        <Button type="link" href={`tel:${tel}`}>
                          {Message('DIAL_PHONE')}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.phone}>{contact.tel}</div>
                )}
              </div>
            )}
            {
              /** 公告 */
              <div className={styles.notice}>
                <span className={styles.source}>{Message('SOURCE')}</span>
                <span className={styles.content}>{data.noticeTitle}</span>
                <span className={styles.time}>{moment(data.date).format('YYYY年MM月DD日')}</span>
              </div>
            }
          </div>
          {
            /** 官网详情 */
            <div className={styles.officialInfo}>
              <Button theme="white" type="primary" onClick={this.handleOnDetailClick}>
                {Message('VIEW_OFFICIAL_INFO')}
              </Button>
            </div>
          }
        </div>
      </Card>
    );
  }
}
