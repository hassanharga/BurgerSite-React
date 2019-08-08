import * as actionTypes from './actionTypes';
import axios from '../../axios-orderes';

export const addIngredients = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredients = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    };
};
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
    return dispatch => {
        axios
            .get('https://codiles-my-burger.firebaseio.com/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data))
            })
            .catch(err => {
                dispatch(fetchIngredientsFailed())
                // console.log(err)
            });
    }
}