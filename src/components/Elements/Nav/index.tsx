import * as React from "react";
import styles from '../../../styles/elements/nav/index.module.scss';
import { IconLogo } from "../../../components/Icons";
import Button from "../Button";
import Message from "../../../components/Message";
import { RouteComponentProps, withRouter } from "react-router";
import { Menu } from "antd";
import { URLS } from "../../../constants/urls";
import MenuItem from "../Menu/Item";

interface Props extends RouteComponentProps<{}, {}> {

}

class Nav extends React.PureComponent<Props, {}>
{
  renderHomeNav = () => {
    return (
      <div className={styles.elementsNav}>
        <div className={styles.wrapper}>
          <div className={styles.column}>
            <Button type="link">{Message('NEED_HELP')}</Button>
          </div>
          <div className={styles.column}>
            <IconLogo />
          </div>
          <div className={styles.column}>
            <Button type="link">{Message('WANNA_CONTRIBUTE')}</Button>
          </div>
        </div>
      </div>
    );
  }

  handleMenuClick = (e) => {
    this.props.history.push(e.key);
  }

  renderGlobalNav = () => {
    const items: any[] = [
      {
        name: Message('CLINIC'),
        link: URLS.CLINICS,
      },
      {
        name: Message('LOGISTICS'),
        link: URLS.LOGISTICS,
      },
      {
        name: Message('HOTEL'),
        link: URLS.HOTELS,
      },
      {
        name: Message('PRODUCTION'),
        link: URLS.PRODUCTION,
      },
      {
        name: Message('DONATE'),
        link: URLS.DONATE,
      },
      {
        name: Message('FREE_CONSULTATION'),
        link: URLS.FREE_CONSULTATION,
      },
    ];
    return (
      <div className={`${styles.elementsNav} ${styles.transparent}`}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <Menu selectedKeys={[this.props.location.pathname]} onClick={this.handleMenuClick} mode='horizontal'>
            {items.map((item) => {
              return <MenuItem key={item.link}>{item.name}</MenuItem>;
            })}
          </Menu>
          <Button type='primary'>{Message('NEED_HELP')}</Button>
          <Button type='primary'>{Message('WANNA_CONTRIBUTE')}</Button>
        </div>
      </div>
    )
  }

	render()
	{
    const isHomePage = this.props.location.pathname === '/';
		return isHomePage ? this.renderHomeNav() : this.renderGlobalNav();
	}
}

export default withRouter(Nav);