import * as React from 'react';
import * as style from './form.css';

interface Props {
    onSubmit?: () => any;
}

export class Form extends React.Component<Props> {
    public render() {
        return <form className={style.form} onSubmit={this.props.onSubmit}>
            {this.props.children}
        </form>;
    }
}