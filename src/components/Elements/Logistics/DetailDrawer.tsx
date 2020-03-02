import * as React from 'react';
import { ILogistic } from '../../../types/interfaces';
import Message from '../../../components/Message';
import styles from '../../../styles/elements/logistics/detaildrawer.module.scss';
import monent from 'moment';
import { Drawer, Row, Col } from 'antd';
import Button from '../../Elements/Button';

interface IDetailDrawerState {
  data?: ILogistic;
  visible: boolean;
}

const originState = {
  id: 0,
  name: '',
  from: '',
  dest: '',
  contacts: [
    {
      name: '',
      tel: '',
    },
  ],
  date: '',
  allowPersonal: '',
  url: '',
  remark: '',
  area: '',
  telRemark: '',
  website: '',
  orderUrl: '',
  customService: '',
  noticeTitle: '',
  noticeContent: '',
  greenPath: '',
};

class DetailDrawer extends React.Component<{}, IDetailDrawerState> {
  public state = {
    data: originState,
    visible: false,
  };

  show = (data: ILogistic): void => {
    if (this.state.visible) {
      this.setState(
        {
          visible: false,
        },
        () => {
          this.setState({
            data,
            visible: true,
          });
        }
      );
    } else {
      this.setState({
        data,
        visible: true,
      });
    }
  };

  onCloseClick = () => {
    this.setState({
      visible: false,
    });
  };

  onOrderClick = () => {
    const { orderUrl } = this.state.data;
    window.open(orderUrl);
  };

  render() {
    const { data, visible } = this.state;
    return (
      <Drawer
        width={640}
        placement="right"
        closable={true}
        visible={visible}
        onClose={this.onCloseClick}
        bodyStyle={{ height: 'calc(100% - 55px)', overflow: 'auto' }}
        title={Message('LOGISTICS_DETAIL_TITLE')}
        className={styles.elementsLogisticsDetailDrawer}
      >
        <div className={styles.detail}>
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
          {
            <Row type="flex">
              <Col span={12} className={styles.detailRow}>
                <span className={styles.detailTitle}>{Message('SOURCE_URL')}</span>
                <span className={styles.noticeTitle}>{data.noticeTitle}</span>
                <span className={styles.noticeTime}>
                  {monent(data.date).format('YYYY年MM月DD日')}
                </span>
              </Col>
              <Col span={6} className={styles.detailRow}>
                <span className={styles.detailTitle}>{Message('CONTACT_METHODS')}</span>
                {data.contacts[0] &&
                  data.contacts[0].tel.split(';').map(t => (
                    <span style={{ color: 'black' }} key={t}>
                      {t}
                    </span>
                  ))}
                <a href={data.customService} target="_blank">
                  {Message('ONLINE_SERVICES')}
                </a>
              </Col>
              <Col span={6} className={styles.detailRow}>
                <span className={styles.detailTitle}>{Message('IS_ALLOW_PERSONAL')}</span>
                <span style={{ color: 'black', fontWeight: 600 }}>{data.allowPersonal}</span>
              </Col>
            </Row>
          }
        </div>
        <div className={styles.website}>
          <Col span={12}>
            <Button type="link" href={data.website} target="_blank">
              {Message('OFFICIAL_WEBSITE')}
            </Button>
          </Col>
          <Col span={12}>
            <span>{Message('REMARK_INFO')}</span>
            <span className={styles.remark}>{data.remark}</span>
          </Col>
        </div>

        <div className={styles.notice}>
          <div style={{ marginBottom: 20 }}>{data.noticeTitle}</div>
          <div>{data.noticeContent}</div>
        </div>

        <div className={styles.order}>
          <Button type="primary" onClick={this.onOrderClick}>
            {Message('ORDER')}{' '}
          </Button>
        </div>
      </Drawer>
    );
  }
}

export default DetailDrawer;
