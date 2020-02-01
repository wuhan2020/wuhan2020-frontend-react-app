import * as React from "react";
import styles from '../../../styles/elements/nav/index.module.scss';
import { IconLogo, IconLogoOrange } from "../../../components/Icons";
import Button from "../Button";
import Message from "../../../components/Message";
import { RouteComponentProps, withRouter } from "react-router";
import { URLS } from "../../../constants/urls";
import MenuItem from "../Menu/Item";
import { PROJECT_HOMEPAGE } from "../../../constants/globals";
import Menu from "../Menu";
import { Icon, Dropdown } from "antd";

interface Props extends RouteComponentProps<{}, {}> {

}

interface State {
  collapsed: boolean;
}

class Nav extends React.PureComponent<Props, State>
{
  state: State = {
    collapsed: false,
  };
  renderHomeNav = () => {
    return (
      <div className={styles.elementsNav}>
        <div className={styles.wrapper}>
          <div className={styles.column}>
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
  onContributeClick = () => {
    window.open(PROJECT_HOMEPAGE);
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

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
      /*
      {
        name: Message('HOTEL'),
        link: URLS.HOTELS,
      },
      {
        name: Message('PRODUCTION'),
        link: URLS.PRODUCTION,
      },
      */
      {
        name: Message('DONATE'),
        link: URLS.DONATE,
      },
      {
        name: Message('FREE_CONSULTATION'),
        link: URLS.FREE_CONSULTATION,
      },
      {
        name: Message('TRAVEL_HOTEL'),
        link: URLS.TRAVEL_HOTEL,
      },
    ];

    const mobileMenu = (
      <Menu
        onClick={this.handleMenuClick}>
        {items.map((item) => {
          return <MenuItem key={item.link}>{item.name}</MenuItem>;
        })}
      </Menu>
    )
    return (
      <div className={`${styles.elementsNav} ${styles.transparent}`}>
        <div onClick={() => this.props.history.push(URLS.HOME)} className={styles.left}>
          <IconLogoOrange />
        </div>
        <div className={styles.right}>
          <Menu
            selectedKeys={[this.props.location.pathname]}
            onClick={this.handleMenuClick} mode='horizontal'>
            {items.map((item) => {
              return <MenuItem key={item.link}>{item.name}</MenuItem>;
            })}
          </Menu>
          <Button onClick={this.onContributeClick} theme='white' type='primary'>{Message('WANNA_CONTRIBUTE')}</Button>
        </div>
        <div className={styles.mobileMenu}>
          <Dropdown overlay={mobileMenu} trigger={['click']}>
            <Button
              icon='menu'
              type='ghost'
              onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
            </Button>
          </Dropdown>
        </div>
      </div>
    )
  }

	render()
	{
    const isHomePage = this.props.location.pathname === '/';
    // @todo - use the commented out one when homepage is ready
    return this.renderGlobalNav();
		// return isHomePage ? this.renderHomeNav() : this.renderGlobalNav();
	}
}

export default withRouter(Nav);

/* Add this button back when needed
          <Button theme='white' type='primary'>{Message('NEED_HELP')}</Button> */