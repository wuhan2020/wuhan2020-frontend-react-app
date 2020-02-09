import * as React from 'react';
import styles from '../../../styles/elements/travelhotel/travelHotel.module.scss';
import Card from '../Card';
import { ITravelHotel } from '../../../types/interfaces';
import { History } from 'history';
import { Icon, Row } from 'antd';
import Message from '../../../components/Message';
import moment from 'moment';
import { isMobile } from '../../../utils/deviceHelper';
import Button from '../Button';
import { GAODE_SEARCH_PREFIX } from '../../../constants/globals';

interface TravelHotelProps {
	travelhotel: ITravelHotel;
	history: History;
}

export default class TravelHotelCard extends React.PureComponent<TravelHotelProps, {}> {
  onViewMap = (address: string) => {
    window.open(`${GAODE_SEARCH_PREFIX}${address}`);
	}
	
	render() {
		const { travelhotel } = this.props;
		return (
			<Card className={styles.elementsTravelHotelCard}>
				<div className={styles.contentWrapper}>
					<Row className={styles.lineInfo}>
						<div className={styles.name}>{travelhotel.name}</div>
					</Row>
					<Row style={{ marginBottom: '10px'}} className={styles.lineInfo + ' ' + styles.greyFont}>
						{travelhotel.city ?
						<div style={{ marginRight: '20px' }}>
							{travelhotel.city.split('-').map((el, index) => <span key={`city_${index}`}>{el}</span>)}
						</div>
						: null}
						{
							travelhotel.date ? <div>
								{Message('POSTED_AT')}{moment(travelhotel.date).fromNow()}
								</div>
							: null
						}

					</Row>
					{travelhotel.address && travelhotel.address !== '-' ? <Row type='flex' style={{ fontSize: '16px', marginBottom: '10px' }}>
						<div className={styles.addressWrapper}>
							<Icon type="bank" style={{ marginRight: '19px' }} />
							<span style={{ marginRight: '10px' }}>{travelhotel.address}</span>
						</div>
						<Button type='link' className={styles.viewMap} onClick={() => this.onViewMap(travelhotel.address || '')}>{Message('VIEW_MAP')}</Button>
					</Row> : null}
					{
						travelhotel.contacts ?
							<Row style={{ fontSize: '16px' }}>
							<Icon type="phone" style={{ marginRight: '19px' }} />
							{travelhotel.contacts[0] && travelhotel.contacts[0].name ? (
								<span style={{ marginRight: '10px' }}>{travelhotel.contacts[0].name}</span>
							) : null}
							{!isMobile && travelhotel.contacts[0] ? <span>{travelhotel.contacts[0].tel}</span> : null}
							{isMobile && travelhotel.contacts[0] ? <Button type='link' href={`tel:${travelhotel.contacts[0].tel}`}>{travelhotel.contacts[0].tel}</Button> : null}
							</Row>
						: null
					}

				</div>
			</Card>
		);
	}
}
