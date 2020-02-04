import * as React from "react";
import styles from '../../../styles/elements/donate/card.module.scss';
import Card from "../Card";
import { IContact, IDonate, IDonateBankAccount } from "../../../types/interfaces";
import { Row, Col, Icon, Tooltip, message } from "antd";
import Message from "../../Message";
import Button from '../../Elements/Button';
import { copyStringToClipboard } from "../../../utils/stringHelper";
import { injectIntl, IntlShape } from "react-intl";

interface ConnectedProps {
	intl: IntlShape;
}

interface DonateCardProps {
  donate: IDonate;
}

interface DonateCardState {
  expanded: boolean;
}

class DonateCard extends React.PureComponent<DonateCardProps, {}> {
  public props: ConnectedProps & DonateCardProps;

  state: DonateCardState = {
    expanded: false,
  };

  constructor(props) {
    super(props);
  }

  onToggleExpand = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  renderContactList() {
    const { donate } = this.props;
    const { expanded } = this.state;
    if (!donate.contacts || donate.contacts.length <= 0) {
      return <div className={styles.contact}>{Message('NO_CONTACT')}</div>;
    }
    return donate.contacts.map((contact: IContact, i: number) => {
      if (!expanded && i > 0) {
        return;
      }
      return <div className={styles.contact} key={`donate_${donate.id}_contact_${i}`}>
        <Icon type="mobile" style={{fontSize: '20px'}} />
        {contact.name && <span>{contact.name}</span>}
        {contact.tel && <Button type='link' theme='black' href={`tel:${contact.tel}`}>{contact.tel}</Button>}
      </div>;
    });
  }

  onBankAccountClick = (str: string) => {
    copyStringToClipboard(str);
    message.success(this.props.intl.formatMessage({ id: 'COPIED_TO_CLIPBOARD' }));
  }

  renderExpandSection() {
    const { donate } = this.props;
    const { expanded } = this.state;
    if (!expanded) {
      return;
    }
    if (!donate.bankAccounts || donate.bankAccounts.length <= 0) {
      return <div>{Message('NO_BANK_ACCOUNT')}</div>;
    }
    return <div className={styles.expandList}>
      {
        donate.bankAccounts.map((bankAccount: IDonateBankAccount) => {
          return <section className={styles.expandListSection}>
            <div className={styles.expandItem}>
              <div className={styles.expandItemLabel}>{Message('BANK_ACCOUNT_BRANCH')}</div>
              <div className={styles.expandItemValue}>{bankAccount.bank}</div>
            </div>
            <div className={`${styles.expandItem} ${styles.clickable}`} onClick={() => this.onBankAccountClick(bankAccount.number)}>
              <div className={styles.expandItemLabel}>{Message('BANK_ACCOUNT_NUMBER')}</div>
              <div className={styles.expandItemValue}>{bankAccount.number}</div>
            </div>
            <div className={styles.expandItem}>
              <div className={styles.expandItemLabel}>{Message('BANK_ACCOUNT_NAME')}</div>
              <div className={styles.expandItemValue}>{bankAccount.name}</div>
            </div>
          </section>;
        })
      }
      {
        donate.remark && <section className={styles.expandListSection}>
          <div className={styles.expandItem}>
            <div className={styles.expandItemLabel}>{Message('DONATE_REMARK')}</div>
            <div className={styles.expandItemValue}>{donate.remark}</div>
          </div>
        </section>
      }
    </div>;
  }

  render() {
    const { donate } = this.props;
    return (
      <Card className={styles.elementsDonateCard} key={`donate_${donate.id}`}>
        <div className={styles.contentWrapper}>
          <Row gutter={16}>
            <Col md={14} xs={24}>
            <Button style={{padding: 0}} type='link' target='_blank' theme='black' className={styles.title} href={donate.name}>    {donate.name}</Button>
              <div className={styles.subtitle}>{donate.date || Message('POSTED_JUST_NOW')}</div>
              <div className={styles.contactList}>{this.renderContactList()}</div>
            </Col>
            <Col md={10} xs={24}>
              <div style={{marginBottom: '12px'}}>{Message('DONATE_METHODS_TITLE')}</div>
              <div className={styles.donateMethodList}>
                {
                  donate.bankAccounts && donate.bankAccounts.length > 0 &&
                  <div className={styles.donateMethod}>
                    <div><Icon type="bank" style={{fontSize: '24px'}} /></div>
                    <div className={styles.donateMethodName}>{Message('BANK_TRANSFER')}</div>
                  </div>
                }
                {
                  donate.wechat &&
                  <Tooltip placement="top" title={donate.wechat}>
                    <div className={styles.donateMethod}>
                      <div><Icon type="wechat" style={{fontSize: '24px', color: '#0aba08'}} /></div>
                      <div className={styles.donateMethodName}>{Message('WECHAT')}</div>
                    </div>
                  </Tooltip>
                }
              </div>
            </Col>
          </Row>

          <section className={styles.expand}>
            <Button type='link' theme='main' onClick={this.onToggleExpand}>
              {this.state.expanded ? Message('COLLAPSE_DONATE_INFO') : Message('EXPAND_DONATE_INFO')}
            </Button>
          </section>

          {
            this.renderExpandSection()
          }
        </div>
      </Card>
    );
  }
}

export default injectIntl(DonateCard as any) as any;