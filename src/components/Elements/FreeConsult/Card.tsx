import * as React from "react";
import styles from "../../../styles/elements/freeconsult/card.module.scss";
import Card from "../Card";
import { IFreeConsultation } from "../../../types/interfaces";
import { Row, Icon } from "antd";
import UrgentIndicator from "../UrgentIndicator";
import Button from "../Button";
import Message from "../../../components/Message";
import { History } from "history";
import { getConsultationUrl } from "../../../constants/urls";

interface FreeConsultCardProps {
  freeconsult: IFreeConsultation;
  history: History;
}

export default class FreeConsultationCard extends React.PureComponent<
  FreeConsultCardProps,
  {}
> {
  onViewDetailClick = () => {
    this.props.history.push(getConsultationUrl(this.props.freeconsult.id));
  };

  render() {
    const URGENT_THRESHOLD = 100;
    const { freeconsult } = this.props;

    return (
      <Card className={styles.elementsClinicCard}>
        <div className={styles.contentWrapper}>
          <div className={styles.name}>{freeconsult.name}</div>
          <div className={styles.date}>
            {Message("PUBLISHED_ON")}
            {freeconsult.date}
          </div>
          <div className={styles.remark}>{freeconsult.remark}</div>
          <div className={styles.details}>
            <Icon type="desktop" />{" "}
            <a
              onClick={this.onViewDetailClick}
              className={styles.viewDetailLink}
              type="ghost"
            >
              {Message("VIEW_CONSULTATION_DETAILS")}
            </a>
          </div>

          {freeconsult.contacts.forEach(element => {
            return (
              <div className={styles.contact}>
                <Icon type="mobile" />
                <div>{element.name}</div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  }
}
