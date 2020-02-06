import * as React from "react";
import styles from "../../../styles/elements/travelhotel/travelHotel.module.scss";
import Card from "../Card";
import { ITravelHotel } from "../../../types/interfaces";
import { History } from "history";
import { Icon, Row } from "antd";
import Message from "../../../components/Message";
import moment from "moment";
import { isMobile } from "../../../utils/deviceHelper";
import Button from "../Button";
import { GAODE_SEARCH_PREFIX } from "../../../constants/globals";

interface TravelHotelProps {
  travelhotel: ITravelHotel;
  history: History;
}

export default class TravelHotelCard extends React.PureComponent<
  TravelHotelProps,
  {}
> {
  openMap = () => {
    const { travelhotel } = this.props;
    const { address = "", province = "", city = "", name = "" } = travelhotel;

    if (address && address !== "-") {
      window.open(`${GAODE_SEARCH_PREFIX}${address}`);
    } else if (name && name !== "-") {
      const address = [province, city, name].join(" ");
      window.open(`${GAODE_SEARCH_PREFIX}${address}`);
    }
  };

  openPanel = () => {
  }

  render() {
    const { travelhotel } = this.props;
    return (
      <Card className={styles.elementsTravelHotelCard}>
        <div className={styles.contentWrapper}>
          <Row className={styles.lineInfo}>
            <div className={styles.name}>{travelhotel.name}</div>
            <Icon type="right-circle" onClick={this.openPanel}/>
          </Row>
          <Row className={styles.lineInfo + " " + styles.greyFont}>
            {travelhotel.city ? (
              <div style={{ marginRight: "20px" }}>
                {travelhotel.city.split("-").map(el => (
                  <span>{el}</span>
                ))}
              </div>
            ) : null}
            {travelhotel.date ? (
              <div>
                {moment(new Date(travelhotel.date)).format('YYYY年MM月DD日')}
              </div>
            ) : null}
          </Row>
          <Row style={{ fontSize: "16px", marginBottom: "10px" }}>
            <Icon type="bank" style={{ marginRight: "19px" }} />
            <span style={{ marginRight: "10px" }}>{travelhotel.address}</span>
            <span className={styles.viewMap} onClick={this.openMap}>
              查看地图
            </span>
          </Row>
          {travelhotel.contacts ? (
            <Row className={styles.telLine + ' ' + styles.telLineOpen}>
              <Icon type="phone" style={{ marginRight: "19px" }} />
              {travelhotel.contacts[0].name ? (
                <span style={{ marginRight: "10px" }}>
                  travelhotel.contacts[0].name
                </span>
              ) : null}
              <span>{travelhotel.contacts[0].tel}</span>
            </Row>
          ) : null}
          <Row style={{ fontSize: "16px", color: '#000',}}>
            <div style={{marginBottom: '10px'}}>免费可接待一线医护人员</div>
            <div className={styles.freeContact}>
              <div className={styles.contactProfile + ' ' + styles.contactPosition}>
                <Icon type="user" className={styles.freeContactIcon}/>
                <div>
                  <div className={styles.cardPanel}>可接待</div>
                  <div>人</div>
                </div>
              </div>
              <div className={styles.contactProfile}>
                <Icon type="home" className={styles.freeContactIcon}/>
                <div>
                  <div className={styles.cardPanel}>可提供房间</div>
                  <div>人</div>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Card>
    );
  }
}
