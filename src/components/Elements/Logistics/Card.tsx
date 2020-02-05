import * as React from "react";
import styles from '../../../styles/elements/logistics/card.module.scss';
import Card from "../Card";
import { ILogistic } from "../../../types/interfaces";
import Message from "../../../components/Message";
import moment from "moment";
import Button from "../Button";
import { Icon } from "antd";
import { isMobile } from "../../../utils/deviceHelper";

interface LogisticsCardProps {
    data: ILogistic;
}

export default class LogisticsCard extends React.PureComponent<LogisticsCardProps, {}>
{
	render()
	{
        const { data } = this.props;
    return (
      <Card className={styles.elementsLogisticsListCard}>
          <div className={styles.main}>
              <div className={styles.name}>{data.name}</div>
              <section className={styles.route}>
                <div className={styles.routeItem}>
                  <Icon style={{color: '#7ed322'}} theme='filled' type="check-square" />
                  <div className={styles.text}>{data.from}</div>
                </div>
                <div className={styles.routeItem}>
                  <Icon style={{color: '#7ed322'}} theme='filled' type="check-square" />
                  <div className={styles.text}>{data.dest}</div>
                </div>
              </section>
              <div className={styles.infoItem}>
                <Icon type="desktop" />
                <Button type='link' href={data.url} target='_blank'>{Message('VIEW_OFFICIAL_INFO')}</Button>
              </div>
              {data.contacts[0] && data.contacts[0].tel ? <div className={styles.infoItem}>
                <Icon type="mobile" />
                <div className={styles.phone}>{data.contacts.length > 0 ? data.contacts[0].tel : ""}</div>
                {isMobile ? <Button type='link' href={`tel:${data.contacts[0].tel}`}>{Message('DIAL_PHONE')}</Button> : null}
              </div> : null}
          </div>
      </Card>
    );
	}
}