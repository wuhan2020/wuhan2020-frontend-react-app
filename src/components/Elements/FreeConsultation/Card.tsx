import * as React from "react";
import styles from '../../../styles/elements/free-consultation/card.module.scss';
import Card from "../Card";
import { IFreeConsultation } from "../../../types/interfaces";
import Message from "../../../components/Message";
import moment from "moment";
import Button from "../Button";
import { Icon } from "antd";
import { isMobile } from "../../../utils/deviceHelper";

interface FreeConsultationCardProps {
    data: IFreeConsultation;
}

export default class FreeConsultationCard extends React.PureComponent<FreeConsultationCardProps, {}>
{

  formatTels(contacts: Array<{ tel: string}>): string {
    return contacts.map(contact => contact.tel).filter(tel => tel).join(", ")
  }

	render()
	{
        const { data } = this.props;
    return (
      <Card className={styles.elementsFreeConsultationListCard}>
          <div className={styles.main}>
            <section className={styles.generalInfo}>
              <div className={styles.title}>{data.name}</div>
              <div className={styles.date}>{moment(data.date).fromNow()}</div>
              <div className={styles.detail}>{data.remark}</div>
            </section>
            <section className={styles.contactInfo}>
                <div className={styles.infoItem}>
                  <Icon type="desktop" />
                  <Button type='link' href={data.url} target='_blank'>{Message('VIEW_OFFICIAL_INFO')}</Button>
                </div>
                {data.contacts[0] && data.contacts[0].tel ? <div className={styles.infoItem}>
                  <Icon type="mobile" />
                  <div className={styles.phone}>{data.contacts.length > 0 ? this.formatTels(data.contacts as Array<{ tel: string}>) : ""}</div>
                  {isMobile ? <Button type='link' href={`tel:${data.contacts[0].tel}`}>{Message('DIAL_PHONE')}</Button> : null}
                </div> : null}
            </section>
          </div>
      </Card>
    );
	}
}