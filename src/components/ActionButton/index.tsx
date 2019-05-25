import * as React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { ROUTES } from '../../models/routes';
import { navigateTo } from '../../redux/actions/navActions';
import * as style from './action-button.css';
import * as classNames from 'classnames';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';

interface Props {
    to: ROUTES;
    showBackIcon?: boolean;
    disabled?: boolean;
    navigateTo: (route: ROUTES) => any;
}

export class ActionButtonView extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    public handleClick(e: React.MouseEvent) {
        e.preventDefault();
        if (!this.props.disabled) { this.props.navigateTo(this.props.to); }
    }
    public render() {
        return (
            <button
                className={classNames({ [style.button]: true, [style.disabled]: this.props.disabled })}
                disabled={this.props.disabled}
                onClick={this.handleClick}>
                { this.props.showBackIcon ? <KeyboardBackspace /> : null }
                <label>{this.props.children}</label>
            </button>
        )
    }
}

export const ActionButton = connect(null, (dispatch: Dispatch<Action>) => bindActionCreators({
    navigateTo: (route: ROUTES) => navigateTo(route),
}, dispatch))(ActionButtonView);

