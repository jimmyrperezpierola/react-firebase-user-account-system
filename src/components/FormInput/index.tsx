import * as React from 'react';
import * as style from './form-input.css';

export class FormInput extends React.Component<{}> {
    public render() {
        return <div className={style.formInput}>
            {this.props.children}
        </div>;
    }
}
