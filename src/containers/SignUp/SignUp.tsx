import * as React from 'react';
import { Button, Form, FormErrors, FormInput, Textbox, FormLabel, Title } from '../../components';
import { createAccount } from '../../redux/actions/authActions';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ROUTES } from '../../models/routes';
import { navigateTo } from '../../redux/actions/navActions';

interface Props {
    user: any;
    createAccount: (firstName: string, lastName: string, email: string, password: string) => any;
    navigateTo: (route: ROUTES) => any;
}

interface State {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    formErrors: { email: string; password: string; };
    firstNameValid: boolean;
    lastNameValid: boolean;
    emailValid: boolean;
    passwordValid: boolean;
    formValid: boolean;
    isLoading: boolean;
}

export class SignUp extends React.Component<Props, State> {
    public constructor(props: any) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            formErrors: { email: '', password: '' },
            firstNameValid: false,
            lastNameValid: false,
            emailValid: false,
            passwordValid: false,
            formValid: false,
            isLoading: false,
        }
        this.updateState = this.updateState.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleCreateAccount = this.handleCreateAccount.bind(this);
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
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        
        switch(fieldName) {
            case 'firstName':
                if (value.length > 0) { firstNameValid = true; } else { firstNameValid = false; };
                break;
            case 'lastName':
                if (value.length > 0) { lastNameValid = true; } else { lastNameValid = false; };
                break;
            case 'email':
                if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) { emailValid = true; } else { emailValid = false; };
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 8;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            firstNameValid: firstNameValid,
            lastNameValid: lastNameValid,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    private validateForm() {
        this.setState({formValid: this.state.firstNameValid &&
            this.state.lastNameValid && this.state.emailValid && this.state.passwordValid});
    }

    private handleCreateAccount() {
        this.setState({ isLoading: true });
        let { firstName, lastName, email, password } = this.state;
        this.props.createAccount(firstName, lastName, email, password);
    } 

    public render() {
        return <>
            <Form>
                <Title>Create Account</Title>
                <FormInput>
                    <FormLabel>First Name</FormLabel>
                    <Textbox name="firstName" value={this.state.firstName} onChange={this.updateState} />
                </FormInput>
                <FormInput>
                    <FormLabel>Last Name</FormLabel>
                    <Textbox name="lastName" value={this.state.lastName} onChange={this.updateState} />
                </FormInput>
                <FormInput>
                    <FormLabel>Email Address</FormLabel>
                    <Textbox
                        name="email"
                        value={this.state.email}
                        onChange={this.updateState}
                        showError={this.state.formErrors['email'] ? true : false}
                    />
                </FormInput>
                <FormInput>
                    <FormLabel>Password (at least 8 characters)</FormLabel>
                    <Textbox
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.updateState}
                        showError={this.state.formErrors['password'] ? true : false}
                    />
                </FormInput>
                <FormErrors formErrors={this.state.formErrors} />
                <FormInput>
                    <p>By continuing you agree to our terms of service.</p>
                </FormInput>
                <FormInput>
                    <Button
                        onClick={() => this.handleCreateAccount()}
                        disabled={!this.state.formValid}
                        isLoading={this.state.isLoading}>
                        Continue
                    </Button>
                </FormInput>
            </Form>
        </>;
    }
}

export const SignUpContainer = connect(null, (dispatch: Dispatch<Action>) => bindActionCreators({
    createAccount: (firstName: string, lastName: string, email: string, password: string) => createAccount(firstName, lastName, email, password),
    navigateTo: (route: ROUTES) => navigateTo(route),
}, dispatch))(SignUp);