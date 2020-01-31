import * as React from "react";
import styles from '../../../styles/elements/footer/index.module.scss';
import Message from "../../../components/Message";
import { URLS } from "../../../constants/urls";
import { Row, Col } from "antd";
import Button from "../Button";

export default class Footer extends React.PureComponent<{}, {}>
{
	render()
	{
    const items: any[] = [
      {
        name: Message('CLINIC'),
        link: URLS.CLINICS
      },
      {
        name: Message('HOTEL'),
        link: URLS.HOTELS
      },
      {
        name: Message('LOGISTICS'),
        link: URLS.LOGISTICS
      },
      {
        name: Message('PRODUCTION'),
        link: URLS.PRODUCTION
      },
      {
        name: Message('DONATE'),
        link: URLS.DONATE
      },
      {
        name: Message('PREVENTION_AND_TREATMENT'),
        link: URLS.PREVENTION_AND_TREATMENT
      },
      {
        name: Message('FREE_CONSULTATION'),
        link: URLS.FREE_CONSULTATION
      },
      {
        name: Message('NEWS_FEED'),
        link: URLS.NEWS_FEED
      },
      {
        name: Message('OPEN_SOURCE_PROJ'),
        link: URLS.OPEN_SOURCE_PROJ
      },
    ]
		return (
			<div className={styles.elementsFooter}>
        <div className={styles.title}>{Message('VIEW_DATA')}</div>
        <Row type='flex' justify='center'>
          {items.map((item) => {
            return <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} lg={2} sm={8}>
              <Button className='grey' href={item.link} type='link'>{item.name}</Button>
            </Col>
          })}
        </Row>
      </div>
		)
	}
}