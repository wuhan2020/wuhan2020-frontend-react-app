import * as React from "react";
import styles from "../../../styles/elements/free-consultation/card.module.scss";
import Card from "../Card";
import { IFreeConsultation } from "../../../types/interfaces";
import Message from "../../Message";
import { Icon } from "antd";

interface FreeConsultationCardProps {
  data: IFreeConsultation;
}

export default class FreeConsultationCard extends React.PureComponent<
  FreeConsultationCardProps,
  {}
> {
  render() {
    const { data } = this.props;
    console.log(data);
    const date_list = data.date.split("T")[0].split("-") ?? "刚刚发布";
    const date = date_list[0]
      .concat("年")
      .concat(date_list[1], "月", date_list[2],"日")
    return (
      <Card className={styles.elementsFreeConsultationListCard}>
        <div className={styles.title}>{data.name}</div>
        <div className={styles.date}>
          {Message("PUBLISHED_ON")}
          {date}
        </div>
        <div className={styles.details}>{data.remark}</div>
        <div className={styles.info_phone}>
          <Icon
            type="desktop"
            className={styles.Icon}
            style={{ marginTop: ".2rem" }}
          />
          <a className={styles.info} href={data.url}>
            查看官方信息
          </a>
          <div className={styles.phone}>
            <Icon type="mobile" className={styles.Icon} />
            {data.contacts.length > 0 ? data.contacts[0].tel : ""}
          </div>
        </div>
      </Card>
    );
  }
}
