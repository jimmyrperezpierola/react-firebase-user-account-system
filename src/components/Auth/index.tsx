import * as React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { ROUTES } from '../../models/routes';
import { navigateTo } from '../../redux/actions/navActions';
import * as PropTypes from 'prop-types';
import { AppState } from '../../models/app-state';

interface Props {
  user: any;
  navigateTo: (route: ROUTES) => any;
}

export const requireAuth = (ComposedComponent: any)  => {
  class Authentication extends React.Component<Props> {
    static contextTypes = {
      router: PropTypes.object
    };

    componentWillMount() {
      if (this.props.user.firebaseUser === null) {
        this.props.navigateTo(ROUTES.LOGIN);
      }
    }

    componentWillUpdate(nextProps: any) {
      if (!nextProps.user.firebaseUser) {
        this.props.navigateTo(ROUTES.LOGIN);
      }
    }

    render() {
      if (this.props.user.firebaseUser) {
        return <ComposedComponent {...this.props} />;
      }
      return null;
    }
  }

  function mapStateToProps(state: AppState) {
    return { user: state.firebaseUser };
  }

  return connect(mapStateToProps, (dispatch: Dispatch<Action>) => bindActionCreators({
    navigateTo: (route: ROUTES) => navigateTo(route),
  }, dispatch))(Authentication);
}
