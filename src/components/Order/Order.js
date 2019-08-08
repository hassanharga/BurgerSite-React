import React from 'react';

import './Order.css';

const Order = (props) => {
    const ingredients = [];
    for (let ing in props.ingredients) {
        ingredients.push({
            name: ing, amount: props.ingredients[ing]
        })
    }
    const ingredientsOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}> {ig.name} ({ig.amount}) </span>
    })
    return (
        <div className='Order'>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong> </p>
        </div>
    )
}

export default Order;