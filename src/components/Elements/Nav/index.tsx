import * as React from "react";
import styles from '../../../styles/elements/nav/index.module.scss';
import { IconLogo } from "../../../components/Icons";
import Button from "../Button";
import Message from "../../../components/Message";

export default class Nav extends React.PureComponent<{}, {}>
{
	render()
	{
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
		)
	}
}