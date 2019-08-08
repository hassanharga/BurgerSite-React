import React from "react";
import {connect} from 'react-redux';
import axios from '../../../axios-orderes';
import './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderBuilderActions from '../../../store/actions/index';


class ContactData extends React.Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }
    orderHandler = (ev) => {
        ev.preventDefault();
        const formData = {};
        for (let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };
        this.props.onOrderBurger(order, this.props.token);
        // console.log(this.props.price);
    }
    inputChangehandler = (ev, inputId) => {
        const updatedOrderedForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderedForm[inputId]
        };
        updatedFormElement.value = ev.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderedForm[inputId] = updatedFormElement;
        let validForm = true;
        for (let ele in updatedOrderedForm) {
            validForm = updatedOrderedForm[ele].valid && validForm ;
        }
        // console.log(validForm);
        this.setState({ orderForm: updatedOrderedForm, formIsValid: validForm });
        // console.log(ev.target.value);
    } 
    checkValidity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }
    
    render() {
        let formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
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
                <Button btnType='Success' disabled={!this.state.formIsValid} > ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className='ContactData'>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(orderBuilderActions.purchaseBurger(orderData, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));