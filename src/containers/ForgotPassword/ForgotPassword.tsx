import * as React from 'react';
import { ActionButton, Button, Form, FormErrors, FormInput, Textbox, FormLabel, Title } from '../../components';
import { ROUTES } from '../../models';
import { sendPasswordResetEmail } from '../../redux/actions/authActions';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, Action} from 'redux';

interface Props{
    sendPasswordResetEmail: (email: string) => any; 
}
interface State {
    email: string;
    formErrors: { email: string; };
    emailValid: boolean;
    formValid: boolean;
    isLoading: boolean;
}

export class ForgotPassword extends React.Component<Props, State> {

    public constructor(props: any){
        super(props);
        this.state = {
            email: '',
            formErrors: { email: '' },
            emailValid: false,
            formValid: false,
            isLoading: false,
        }
        this.updateState = this.updateState.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
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
        let emailValid = this.state.emailValid;
        
        switch(fieldName) {
            case 'email':
                if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) { emailValid = true; } else { emailValid = false; };
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
        }, this.validateForm);
    }

    private validateForm() {
        this.setState({ formValid: this.state.emailValid });
    }

    private handleResetPassword() {
        this.props.sendPasswordResetEmail(this.state.email);
    }

    public render() {
        return <>
            <Form>
                <ActionButton
                    disabled={false}
                    to={ROUTES.LOGIN}
                    navigateTo={() => undefined}
                    showBackIcon={true}>
                    Back
                </ActionButton>
                <Title>Forgot Password</Title>
                <FormInput>
                    <FormLabel>Email</FormLabel>
                    <Textbox name="email" value="" onChange={this.updateState} />
                </FormInput>
                <FormErrors formErrors={this.state.formErrors} />
                <FormInput>
                    <Button onClick={this.handleResetPassword}
                        disabled={!this.state.formValid || this.state.isLoading}>Reset Password</Button>
                </FormInput>
            </Form>
        </>;
    }
}

export const ForgotPasswordContainer = connect(null, (dispatch: Dispatch<Action>) => bindActionCreators({
    sendPasswordResetEmail: (email: string) => sendPasswordResetEmail(email),
}, dispatch))(ForgotPassword);
