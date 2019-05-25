import * as React from 'react';
import { ActionButton, Button, Form, FormErrors, FormInput, Textbox, FormLabel, Title } from '../../components';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { signIn, signOut } from '../../redux/actions/authActions';
import { setBannerText } from '../../redux/actions/navActions';
import { ROUTES } from '../../models/routes';
import { navigateTo } from '../../redux/actions/navActions';
import * as qs from 'query-string';
interface Props {
    location: any;
    user: any;
    signIn: (email: string, password: string) => any;
    signOut: () => any;
    navigateTo: (route: ROUTES) => any;
    setBannerText: (bannerText: string) => any;
}

interface State {
    email: string;
    password: string;
    isLoading: boolean;
    formErrors: { email: string; password: string; };
    emailValid: boolean;
    passwordValid: boolean;
    formValid: boolean;
}

export class Login extends React.Component<Props, State> {
    public constructor(props: Props){
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false,
        }
        this.updateState = this.updateState.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    public componentDidMount(){
        let queryValues = qs.parse(this.props.location.search);
        let verifiedEmail: boolean = (queryValues) ? (queryValues.verifiedEmail == "true") : false;
        let resetPassword: boolean = (queryValues) ? (queryValues.resetPassword == "true") : false;
        if(verifiedEmail){
            this.props.setBannerText('Email verified successfully.');
        }
        if(resetPassword){
            this.props.setBannerText('Password changed successfully.')
        }
    }

    private updateState(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>){
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        this.setState({
            ...this.state,
            [e.currentTarget.name]: e.currentTarget.value
        }, () => { this.validateField(name, value) });

    }

    private handleLogin() {
        this.props.signIn(this.state.email, this.state.password);
    }

    private validateField(fieldName: string, value: string) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        
        switch(fieldName) {
            case 'email':
                if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) { emailValid = true; } else { emailValid = false; };
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    private validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    public render() {
        return <>
            <Form onSubmit={this.handleLogin}>
                <Title>Log in</Title>
                <FormInput>
                    <FormLabel>Email</FormLabel>
                    <Textbox
                        name="email"
                        value={this.state.email}
                        onChange={this.updateState}
                        showError={this.state.formErrors['email'] ? true : false}
                    />
                </FormInput>
                <FormInput>
                    <FormLabel>Password</FormLabel>
                    <Textbox
                        name="password"
                        value={this.state.password}
                        type="password"
                        onChange={this.updateState}
                        showError={this.state.formErrors['password'] ? true : false}
                    />
                </FormInput>
                <FormErrors formErrors={this.state.formErrors} />
                <FormInput>
                    <Button
                        disabled={!this.state.formValid || this.state.isLoading}
                        onClick={this.handleLogin}
                        isLoading={this.state.isLoading}
                        type="submit"
                    >
                        Login
                    </Button>
                </FormInput>
                <FormInput>
                    <Button onClick={() => this.props.navigateTo(ROUTES.SIGNUP)}>Create Account</Button>
                </FormInput>
                <FormInput>
                    <ActionButton
                        to={ROUTES.FORGOT_PASSWORD}
                        navigateTo={() => undefined}>
                        Forgot password?
                    </ActionButton>
                </FormInput>
            </Form>
        </>;
    }
}

export const LoginContainer = connect(null, (dispatch: Dispatch<Action>) => bindActionCreators({
    signIn: (email: string, password: string) => signIn(email, password),
    signOut: () => signOut(),
    navigateTo: (route: ROUTES) => navigateTo(route),
    setBannerText: (bannerText: string) => setBannerText(bannerText),
}, dispatch))(Login);
