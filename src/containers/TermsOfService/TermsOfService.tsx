import * as React from 'react';
import { Form, FormInput, Title } from '../../components';

export class TermsOfServiceContainer extends React.Component<{}> {
    public render() {
        return <>
            <Form>
                <Title>Terms of Service</Title>
                <FormInput>
                    <p>This is the terms of service.</p>
                </FormInput>
            </Form>
        </>;
    }
}
