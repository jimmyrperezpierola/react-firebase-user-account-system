import * as React from 'react';
import * as style from './form-errors.css';
import ErrorIcon from '@material-ui/icons/Error';

interface FormErrorProps {
    formErrors: any;
}

export class FormErrors extends React.Component<FormErrorProps> {
    public render() {
        return (
            <div className={style.formErrors}>
                {
                    Object.keys(this.props.formErrors).map((fieldName, i) => {
                        if (this.props.formErrors[fieldName].length > 0) {
                            return (
                                <p key={i} className={style.row}>
                                    <ErrorIcon style={{ marginRight: 5 }}/>
                                    {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} {this.props.formErrors[fieldName]}
                                </p>)        
                        } else {
                            return '';
                        }
                    })
                }
            </div>
        );
    }
}
