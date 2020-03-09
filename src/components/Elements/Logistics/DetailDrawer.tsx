import * as React from 'react';
import { ILogistic } from '../../../types/interfaces';
import Message from '../../../components/Message';
import styles from '../../../styles/elements/logistics/detaildrawer.module.scss';
import monent from 'moment';
import { Drawer, Icon } from 'antd';
import Button from '../../Elements/Button';
import { isMobile } from '../../../utils/deviceHelper';

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
        {
          /** 名称 */
          <div className={styles.title}>
            <div>
              <span className={styles.name}>{data.name}</span>
              {data.greenPath === '是' && (
                <span className={styles.greenChannel}>{Message('GREEN_CHANNEL')}</span>
              )}
            </div>
            {isMobile && (
              <Icon
                type="phone"
                style={{ fontSize: 18, padding: 4 }}
                onClick={() => {
                  data.contacts[0].tel && window.open(`tel:${data.contacts[0].tel.split(';')[0]}`);
                }}
              />
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
        <div className={isMobile ? styles.mbDetail1 : styles.pcDetail1}>
          {
            /** 数据来源 */
            <div className={styles.source}>
              <span>{Message('SOURCE_URL')}</span>
              <div>
                <span className={styles.noticeTitle}>{data.noticeTitle}</span>
                <span className={styles.noticeTime}>
                  {monent(data.date).format('YYYY年MM月DD日')}
                </span>
              </div>
            </div>
          }
          {/** 联系方式 */
          !isMobile && (
            <div className={styles.contact}>
              <span>{Message('CONTACT_METHODS')}</span>
              {data.contacts[0] &&
                data.contacts[0].tel.split(';').map(t => <span key={t}>{t}</span>)}
              <a href={data.customService} target="_blank">
                {Message('ONLINE_SERVICES')}
              </a>
            </div>
          )}
          {
            /** 个人捐赠 */
            <div className={styles.personal}>
              <span>{Message('IS_ALLOW_PERSONAL')}</span>
              <span style={{ color: 'black', fontWeight: 600 }}>{data.allowPersonal}</span>
            </div>
          }
        </div>
        {!isMobile && <div className={styles.divider} />}
        <div className={isMobile ? styles.mbDetail2 : styles.pcDetail2}>
          {
            /** 官网 */
            <div className={styles.website}>
              <span>{Message('OFFICIAL_WEBSITE')}</span>
              <a type="link" href={data.website} target="_blank">
                {data.website}
              </a>
            </div>
          }
          {
            /** 备注*/
            <div className={styles.remark}>
              <span>{Message('REMARK_INFO')}</span>
              <span>{data.remark}</span>
            </div>
          }
        </div>
        <div className={styles.divider} />
        {
          /** 通知 */
          <div className={styles.notice}>
            {/** */ !isMobile && <div style={{ marginBottom: 20 }}>{data.noticeTitle}</div>}
            <div dangerouslySetInnerHTML={{ __html: data.noticeContent }}></div>
          </div>
        }
        <div className={styles.order}>
          {data.orderUrl && (
            <Button type="primary" onClick={this.onOrderClick}>
              {Message('ORDER')}
            </Button>
          )}
        </div>
      </Drawer>
    );
  }
}

export default DetailDrawer;
