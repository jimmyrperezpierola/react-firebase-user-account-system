import * as React from 'react';
import { ActionButton, Button, Form, FormInput, Textbox, FormLabel, FormErrors, Title } from '../../components';
import { updateEmail } from '../../redux/actions/authActions';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ROUTES } from '../../models/routes';
import { navigateTo } from '../../redux/actions/navActions';

interface Props {
    user: any;
    updateEmail: (email: string) => any;
    navigateTo: (route: ROUTES) => any;
}
interface State {
    email: string;
    formErrors: { email: string; };
    emailValid: boolean;
    formValid: boolean;
    isLoading: boolean;
}

export class ChangeEmail extends React.Component<Props,State> {
    public constructor(props: Props){
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
        this.handleUpdateEmail = this.handleUpdateEmail.bind(this);
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

    private handleUpdateEmail() {
        this.props.updateEmail(this.state.email);
    }

    public render() {
        return <>
            <Form onSubmit={this.handleUpdateEmail}>
                <ActionButton
                    disabled={false}
                    to={ROUTES.ACCOUNT}
                    navigateTo={() => undefined}
                    showBackIcon={true}>
                    Back
                </ActionButton>
                <Title>Change Email</Title>
                <FormInput>
                    <FormLabel>Email</FormLabel>
                    <Textbox name="email" value={this.state.email} onChange={this.updateState} />
                </FormInput>
                <FormErrors formErrors={this.state.formErrors} />
                <FormInput>
                    <Button onClick={this.handleUpdateEmail}
                        isLoading={this.state.isLoading}
                        disabled={!this.state.formValid || this.state.isLoading}>Change Email</Button>
                </FormInput>
            </Form>
        </>;
    }
}

export const ChangeEmailContainer = connect(null, (dispatch: Dispatch<Action>) => bindActionCreators({
    updateEmail: (email: string) => updateEmail(email),
    navigateTo: (route: ROUTES) => navigateTo(route),
}, dispatch))(ChangeEmail);
