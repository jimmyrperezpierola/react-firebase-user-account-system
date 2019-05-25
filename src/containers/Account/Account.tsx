import * as React from 'react';
import { Button, Form, FormInput, Title } from '../../components';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { signOut } from '../../redux/actions/authActions';
import { ROUTES } from '../../models/routes';
import { navigateTo } from '../../redux/actions/navActions';

interface Props {
    signOut: () => any;
    navigateTo: (route: ROUTES) => any;
    user: any;
}

export class AccountView extends React.Component<Props> {
    public render() {
        let { firebaseUser: user } = this.props.user;
        return <>
            <Form>
                <Title>Account</Title>
                <div style={{fontSize: '1em', marginTop: '-25px'}}>{user.email}</div>
                <hr/>
                <FormInput>
                    <Button onClick={() => this.props.navigateTo(ROUTES.CHANGE_EMAIL)}>Change Email</Button>
                </FormInput>
                <FormInput>
                    <Button onClick={() => this.props.navigateTo(ROUTES.CHANGE_PASSWORD)}>Change Password</Button>
                </FormInput>
                <FormInput>
                    <Button onClick={() => this.props.signOut()}>Log Out</Button>
                </FormInput>
            </Form>
        </>;
    }
}

export const AccountContainer = connect(null, (dispatch: Dispatch<Action>) => bindActionCreators({
    signOut: () => signOut(),
    navigateTo: (route: ROUTES) => navigateTo(route),
}, dispatch))(AccountView);
