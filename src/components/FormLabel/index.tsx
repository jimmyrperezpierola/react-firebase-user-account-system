import * as React from 'react';
import * as style from './form-label.css';

export class FormLabel extends React.Component<{}> {
    public render() {
        return <div className={style.formLabelContainer}>
            <label className={style.formLabel}>{this.props.children}</label>
        </div>;
    }
}
