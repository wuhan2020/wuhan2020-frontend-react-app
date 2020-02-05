import * as React from "react";
import styles from '../../../styles/elements/clinic/card.module.scss';
import Card from "../Card";
import { IClinic } from "../../../types/interfaces";
import { Row, Col } from "antd";
import UrgentIndicator from "../UrgentIndicator";
import Button from "../Button";
import Message from "../../../components/Message";
import { History } from "history";
import { getClinicUrl } from "../../../constants/urls";

interface ClinicCardProps {
  clinic: IClinic;
  onViewDetailClick: (clinic: IClinic) => void;
}

export default class ClinicCard extends React.PureComponent<ClinicCardProps, {}>
{
  onViewDetailClick = () => {
    this.props.onViewDetailClick && this.props.onViewDetailClick(this.props.clinic);
  }

	render()
	{
    const URGENT_THRESHOLD = 100;
    const {clinic} = this.props;

    return (
      <Card className={styles.elementsClinicCard} bodyStyle={{padding: '20px'}}>
        <div className={styles.contentWrapper}>
          <div className={styles.name}>{clinic.name}</div>
          <div className={styles.subtitle}>
            <div>{clinic.province} {clinic.city}</div>
          </div>
          {clinic.supplies.length > 0 && clinic.supplies.map((supply, index) => {
            if (index < 3) {
              return (
                <Row key={`supply_${index}`} type='flex' justify='space-between' style={{marginBottom: '20px', alignItems: 'center'}}>
                  <div className={styles.supplyName}>{supply.key}</div>
                  <div>{supply.value === 1 ? Message('UNLIMITED') : supply.value}</div>
                </Row>
              )
            }
          })}
          {clinic.supplies.length - 3 > 0 && <div className={styles.otherSupplies}>+{clinic.supplies.length - 3 }{Message('OTHER_SUPPLIES')}</div>}
          {clinic.supplies.length === 0 && <div style={{flex: '1 1 auto'}} />}
          <Button
            onClick={this.onViewDetailClick}
            style={{alignSelf: 'center', width: '89px', height: '28px', fontSize: '12px', marginTop: '26px', marginBottom: '6px'}}
            type='primary' block={false}>
              {Message('VIEW_DETAIL')}
            </Button>
        </div>
      </Card>
    );
	}
}