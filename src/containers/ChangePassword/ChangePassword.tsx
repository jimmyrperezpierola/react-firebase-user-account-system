import * as React from 'react';
import { Button, Form, FormInput, FormErrors, Textbox, FormLabel, Title, ActionButton } from '../../components';
import { updatePassword } from '../../redux/actions/authActions';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ROUTES } from '../../models/routes';
import { navigateTo } from '../../redux/actions/navActions';

interface Props {
    user: any;
    updatePassword: (Password: string) => any;
    navigateTo: (route: ROUTES) => any;
}
interface State {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    formErrors: { currentPassword: string; newPassword: string; confirmPassword: string; };
    currentPasswordValid: boolean;
    newPasswordValid: boolean;
    confirmPasswordValid: boolean;
    formValid: boolean;
    isLoading: boolean;
}

export class ChangePassword extends React.Component<Props, State> {
    public constructor(props: Props){
        super(props);
        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            formErrors: { currentPassword: '', newPassword: '', confirmPassword: '' },
            currentPasswordValid: false,
            newPasswordValid: false,
            confirmPasswordValid: false,
            formValid: false,
            isLoading: false,
        }
        this.updateState = this.updateState.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
    }

    private updateState(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>){
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        this.setState({
            ...this.state,
            [e.currentTarget.name]: e.currentTarget.value
        }, () => { this.validateField(name, value) });
    }

    private validateField(fieldName: string, value: string) {
        let fieldValidationErrors = this.state.formErrors;
        let currentPasswordValid = this.state.currentPasswordValid;
        let newPasswordValid = this.state.newPasswordValid;
        let confirmPasswordValid = this.state.confirmPasswordValid;
        
        switch(fieldName) {
            case 'currentPassword':
                currentPasswordValid = value.length >= 8;
                fieldValidationErrors.currentPassword = currentPasswordValid ? '': ' is too short';
                break;
            case 'newPassword':
                newPasswordValid = value.length >= 8;
                fieldValidationErrors.newPassword = newPasswordValid ? '': ' is too short';
                break;
            case 'confirmPassword':
                confirmPasswordValid = this.state.confirmPassword === this.state.newPassword;
                fieldValidationErrors.confirmPassword = confirmPasswordValid ? '': ' must be the same as the new password';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            currentPasswordValid: currentPasswordValid,
            newPasswordValid: newPasswordValid,
            confirmPasswordValid: confirmPasswordValid,
        }, this.validateForm);
    }

    private validateForm() {
        this.setState({ formValid: this.state.currentPasswordValid &&
            this.state.newPasswordValid && this.state.confirmPasswordValid });
    }

    private handleUpdatePassword() {
        this.props.updatePassword(this.state.confirmPassword);
    }

    public render() {
        return <>
            <Form onSubmit={this.handleUpdatePassword}>
                <ActionButton
                    disabled={false}
                    to={ROUTES.ACCOUNT}
                    navigateTo={() => undefined}
                    showBackIcon={true}>
                    Back
                </ActionButton>
                <Title>Change Password</Title>
                <FormInput>
                    <FormLabel>Current Password</FormLabel>
                    <Textbox name="currentPassword" value={this.state.currentPassword} 
                    onChange={this.updateState} type="password" />
                </FormInput>
                <FormInput>
                    <FormLabel>New Password</FormLabel>
                    <Textbox name="newPassword" value={this.state.newPassword} 
                    onChange={this.updateState} type="password" />
                </FormInput>
                <FormInput>
                    <FormLabel>Confirm Password</FormLabel>
                    <Textbox name="confirmPassword" value={this.state.confirmPassword} 
                    onChange={this.updateState} type="password" />
                </FormInput>
                <FormErrors formErrors={this.state.formErrors} />
                <FormInput>
                    <Button onClick={this.handleUpdatePassword}
                        isLoading={this.state.isLoading}
                        disabled={!this.state.formValid || this.state.isLoading}>Change Password</Button>
                </FormInput>
            </Form>
        </>;
    }
}

export const ChangePasswordContainer = connect(null, (dispatch: Dispatch<Action>) => bindActionCreators({
    updatePassword: (password: string) => updatePassword(password),
    navigateTo: (route: ROUTES) => navigateTo(route),
}, dispatch))(ChangePassword);
