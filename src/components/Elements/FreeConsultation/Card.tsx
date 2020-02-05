import * as React from "react";
import styles from '../../../styles/elements/free-consultation/card.module.scss';
import Card from "../Card";
import { IFreeConsultation } from "../../../types/interfaces";
import Message from "../../../components/Message";

interface FreeConsultationCardProps {
    data: IFreeConsultation;
}

export default class FreeConsultationCard extends React.PureComponent<FreeConsultationCardProps, {}>
{
	render()
	{
        const { data } = this.props;
    return (
      <Card className={styles.elementsFreeConsultationListCard}>
          <div className="title">
              {data.name}
          </div>
          <div className="date">
            {data.date}
          </div>
          <div className="detail">
            ""
          </div>
          <div className="info-phone">
              <a className="info" href={data.url}>查看官方信息</a>
              <div className="phone">{data.contacts.length > 0 ? data.contacts[0].tel : ""}</div>
          </div>
      </Card>
    );
	}
}