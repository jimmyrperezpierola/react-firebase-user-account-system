import * as React from 'react';
import * as style from './textbox.css';
import * as classNames from 'classnames';

export namespace Textbox {
    export interface Props {
        autoFocus?: boolean;
        type?: string;
        value: string;
        name: string;
        errorMsg?: string;
        showError?: boolean;
        onSave?: (text: string) => void;
        onChange: (e: React.FormEvent<HTMLInputElement>) => any;
        onKeyPress?: (e: React.FormEvent<HTMLInputElement>) => any;
    }

    export interface State {
        text: string;
    }
}

export class Textbox extends React.Component<Textbox.Props, Textbox.State> {
    constructor(props: Textbox.Props, context?: any) {
        super(props, context);
        this.state = { text: this.props.value || '' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
        const text = event.currentTarget.value.trim();
        if (event.which === 13) {
          if (this.props.onSave) { this.props.onSave(text); }
        }
      }
    
      handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ text: event.target.value });
        this.props.onChange(event);
      }

    public render() {
        return <>
          <input
            autoFocus={this.props.autoFocus}
            type={this.props.type}
            name={this.props.name}
            value={this.state.text}
            onChange={this.handleChange}
            onKeyPress={this.props.onKeyPress}
            onKeyDown={this.handleSubmit}
            className={classNames({ [style.textbox]: true, [style.error]: this.props.errorMsg || this.props.showError })}
        />
        { this.props.errorMsg ?
        <div className={style.validation}>
          {this.props.errorMsg}
        </div> : null }
      </>
    }
}
