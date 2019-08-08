import React from 'react';

import './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
    let x = null;
    if (props.ingredients) {
        x = <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
        <Button btnType='Danger' clicked={props.ckeckoutCanceled}>CANCEL</Button>
        <Button btnType='Success' clicked={props.ckeckoutContinued}>CONTINUE</Button>
    </div>
    }
    return (
        <div className='CheckoutSummary'>
            <h1>We hope it tasted well</h1>
            {x}
        </div>
    )
}

export default CheckoutSummary;