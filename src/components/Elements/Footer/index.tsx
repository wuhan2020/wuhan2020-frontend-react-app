import * as React from "react";
import styles from '../../../styles/elements/footer/index.module.scss';
import Message from "../../../components/Message";
import { URLS } from "../../../constants/urls";
import { Row, Col } from "antd";
import Button from "../Button";
import { withRouter, RouteComponentProps } from "react-router";
import { IconMainIcon } from "../../../components/Icons";

interface Props extends RouteComponentProps {

}
class Footer extends React.PureComponent<Props, {}>
{
	render()
	{
    const items: any[] = [
      {
        name: Message('CLINIC'),
        link: URLS.CLINICS
      },
      /*
      {
        name: Message('HOTEL'),
        link: URLS.HOTELS
      },
      */
      {
        name: Message('LOGISTICS'),
        link: URLS.LOGISTICS
      },
      /*
      {
        name: Message('PRODUCTION'),
        link: URLS.PRODUCTION
      },
      */
      {
        name: Message('DONATE'),
        link: URLS.DONATE
      },
      /*
      {
        name: Message('PREVENTION_AND_TREATMENT'),
        link: URLS.PREVENTION_AND_TREATMENT
      },
      */
      {
        name: Message('FREE_CONSULTATION'),
        link: URLS.FREE_CONSULTATION
      },
      /*
      {
        name: Message('NEWS_FEED'),
        link: URLS.NEWS_FEED
      },
      */
      {
        name: Message('TRAVEL_HOTEL'),
        link: URLS.TRAVEL_HOTEL,
      },
      {
        name: Message('OPEN_SOURCE_PROJ'),
        link: URLS.OPEN_SOURCE_PROJ
      },
    ];
		return (
			<div className={styles.elementsFooter}>
        <Row type='flex' justify='space-between' style={{width: '100%'}}>
          <IconMainIcon width={100} height={100} />
          <div className={styles.siteMap}>
            <Row className={styles.siteMapItemWrapper} type='flex'>
              {items.map((item, index) => {
                return <Button
                  style={{flex: '0 0 auto'}}
                  key={`footer_item_${index}`}
                  className='grey'
                  onClick={() => item.link === URLS.OPEN_SOURCE_PROJ ? window.open(item.link): this.props.history.push(item.link)}
                  type='link'>{item.name}</Button>
              })}
            </Row>
          </div>
        </Row>
      </div>
		)
	}
}

export default withRouter(Footer);