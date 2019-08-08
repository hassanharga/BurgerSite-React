import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
const orderSumary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
        return (<li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}: {props.ingredients[igKey]}</span></li>)
    })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delecious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            <p>Continue To Ckeckout?</p>
            <Button btnType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType='Success'clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSumary;