import React from "react";
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';

import './Auth.css';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';;

class Auth extends React.Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }
    inputChangehandler = (ev, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: ev.target.value,
                valid: this.checkValidity(ev.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    submitHandler = (event) => {
        event.preventDefault();
        // console.log(this.state.controls.email.value, this.state.controls.password.value);
        this.props.onInitAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        })
    }
    render() {
        let formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = (
            <form onSubmit={this.submitHandler}>
                {formElements.map(element => (
                    <Input
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        inValid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        touched={element.config.touched}
                        value={element.config.value}
                        changed={(event) => { this.inputChangehandler(event, element.id) }} />
                ))}
                <Button btnType='Success' >SUBMIT</Button>
            </form>

        );
        if (this.props.loading) {
            form = <Spinner />
        }
        let errorMsg = null;
        if (this.props.error) {
            errorMsg = (
                <p> {this.props.error.message} </p>
            )
        }
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to='/' />
        }
        return (
            <div className='Auth'>
                {authRedirect}
                {errorMsg}
                {form}
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType='Danger' >Switch To {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);