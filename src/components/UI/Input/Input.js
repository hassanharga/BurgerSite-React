import React from 'react';

import './Input.css'


const Input = (props) => {
    let inputElement = null;
    let inputClass = ['InputElement'];
    if(props.inValid && props.shouldValidate && props.touched) {
        inputClass.push('Invalid');
    }
    switch (props.elementType) {
        case 'input':
            inputElement = <input className={inputClass.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case 'select':
            inputElement =
                <select className={inputClass.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            break;
        case 'textarea':
            inputElement = <textarea className={inputClass.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        default:
            inputElement = <input className={inputClass.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
    }
    return (
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;