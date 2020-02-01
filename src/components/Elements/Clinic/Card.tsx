import * as React from "react";
import styles from '../../../styles/elements/clinic/card.module.scss';
import Card from "../Card";
import { IClinic } from "../../../types/interfaces";
import { Row } from "antd";
import UrgentIndicator from "../UrgentIndicator";
import Button from "../Button";
import Message from "../../../components/Message";
import { History } from "history";
import { getClinicUrl } from "../../../constants/urls";

interface ClinicCardProps {
  clinic: IClinic;
  history: History;
}

export default class ClinicCard extends React.PureComponent<ClinicCardProps, {}>
{
  onViewDetailClick = () => {
    this.props.history.push(getClinicUrl(this.props.clinic.city, this.props.clinic.id));
  }

	render()
	{
    const URGENT_THRESHOLD = 100;
    const {clinic} = this.props;

    return (
      <Card className={styles.elementsClinicCard}>
        <div className={styles.contentWrapper}>
          <div className={styles.name}>{clinic.name}</div>
          {clinic.supplies.length > 0 && clinic.supplies.map((supply, index) => {
            if (index < 3) {
              return (
                <Row key={`supply_${index}`} type='flex' style={{marginBottom: '20px', alignItems: 'center'}}>
                  {supply.value > URGENT_THRESHOLD ? <UrgentIndicator /> : <div style={{width: '15px', height: '15px'}}></div>}
                  <div className={styles.supplyName}>{supply.key}</div>
                  <Button disabled fakeDisabled={true} shape='round' style={{width: '90px'}} type='ghost'>{supply.value === 1 ? Message('UNLIMITED') : supply.value}</Button>
                </Row>
              )
            }
          })}
          {clinic.supplies.length - 3 > 0 && <div className={styles.otherSupplies}>+{clinic.supplies.length - 3 }{Message('OTHER_SUPPLIES')}</div>}
          {clinic.supplies.length === 0 && <div style={{flex: '1 1 auto'}} />}
          <Button
            onClick={this.onViewDetailClick}
            className={styles.viewDetailBtn}
            type='ghost'
            shape='round'>
              {Message('VIEW_DETAIL')}
            </Button>
        </div>
      </Card>
    );
	}
}