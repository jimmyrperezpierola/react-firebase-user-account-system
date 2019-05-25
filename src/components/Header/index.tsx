import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { AppState, ROUTES } from '../../models';
import { navigateTo, clearBannerText } from '../../redux/actions/navActions';
import CloseIcon from '@material-ui/icons/Close';

interface Props {
  user: any;
  bannerText?: string;
  onDismiss?: () => any;
  navigateTo: (route: ROUTES) => any;
}

export class HeaderView extends React.Component<Props> {

  render() {
    return (
      <div className={style.headerParent}>
        { this.props.bannerText ?
        <div className={style.banner}>
          <label>{this.props.bannerText}</label>
          { this.props.onDismiss ? <CloseIcon className={style.icon} 
          onClick={this.props.onDismiss}/> : null }
        </div> : null
        }
        <header className={style.header}>
          <h1 onClick={() => this.props.navigateTo(ROUTES.BASE)}>Site Name</h1>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return { bannerText: state.layout.bannerText };
}

export const Header = connect(mapStateToProps, (dispatch: Dispatch<Action>) => bindActionCreators({
  navigateTo: (route: ROUTES) => navigateTo(route),
  onDismiss: () => clearBannerText(),
}, dispatch))(HeaderView);
