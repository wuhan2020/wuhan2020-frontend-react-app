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
							{travelhotel.city.split('-').map((el) => <span >{el}</span>)}
						</div>
						: null}
						{
							travelhotel.date ? <div>
								{Message('POSTED_AT')}{moment(travelhotel.date).fromNow()}
								</div>
							: null
						}

					</Row>
					<Row type='flex' style={{ fontSize: '16px', marginBottom: '10px' }}>
						<div className={styles.addressWrapper}>
							<Icon type="bank" style={{ marginRight: '10px' }} />
							<span style={{ marginRight: '10px' }}>{travelhotel.address}</span>
						</div>
						<Button type='link' className={styles.viewMap} onClick={() => this.onViewMap(travelhotel.address || '')}>{Message('VIEW_MAP')}</Button>
					</Row>
					{
						travelhotel.contacts ?
							<Row style={{ fontSize: '16px' }}>
							<Icon type="phone" style={{ marginRight: '10px' }} />
							{
								travelhotel.contacts.filter(contact => contact.name).map((contact, index) => {
									return (
										<span key={`travel_hotel_contact_name_${index}`} style={{ marginRight: index !== 0 ? '0' : '10px' }}>{contact.name}</span>
									)
								})
							}
							{
								travelhotel.contacts.filter(contact => contact.tel).map((contact, index)  => {
									return isMobile ? <span  style={{ marginRight: index !== 0 ? '0' : '10px' }} key={`travel_hotel_contact_tel_${index}_mobile`}>{contact.tel}</span> : <Button key={`travel_hotel_contact_tel_${index}_no_mobile`} style={{ marginRight: index !== 0 ? '0' : '10px' }} type='link' href={`tel:${contact.tel}`}>{contact.tel}</Button>
								})				
							}
			
							</Row>
						: null
					}

				</div>
			</Card>
		);
	}
}
