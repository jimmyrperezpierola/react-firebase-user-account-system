import * as React from 'react';
import * as style from './button.css';
import { ClipLoader } from 'react-spinners';
import * as classNames from 'classnames';

interface Props {
    type?: 'button' | 'submit' | 'reset' | undefined;
    disabled?: boolean;
    isLoading?: boolean;
    onClick: () => any;
}

export class Button extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    public handleClick(e: React.MouseEvent) {
        e.preventDefault();
        if (!this.props.disabled || this.props.isLoading) { this.props.onClick(); }
    }

    public render() {
        return <button
            type={this.props.type}
            onClick={this.handleClick}
            disabled={this.props.disabled}
            className={classNames({ [style.button]: true, [style.disabled]: this.props.disabled || this.props.isLoading })}
        >
            {this.props.isLoading ?
            <ClipLoader
                sizeUnit={"px"}
                size={20}
                color={'#000'}
                loading={this.props.isLoading}
            /> : this.props.children}
        </button>;
    }
}