import * as React from 'react';
import * as style from './title.css';

export class Title extends React.Component<{}> {
    public render() {
        return <>
            <h1 className={style.title}>{this.props.children}</h1>
        </>;
    }
}
