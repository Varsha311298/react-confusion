import * as ActionTypes from './ActionTypes';
import {DISHES} from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';

//Action Object
export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating, 
        author: author, 
        comment: comment
    }
    
});
//Redux thunk
//returns a function = (dispatch) => is an inner function
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    // setTimeout(() => {
    //     dispatch(addDishes(DISHES));  // this action adds the dishes
    // }, 2000);

    return fetch(baseUrl + 'dishes')
        .then(response => { // receive a response from the server, but the response is an error
            if (response.ok)
            {
                return response;
            }
            else {
                var error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {   // get nothing from the server
            var errmess = new Error(error.message);
            throw error;
        }
        )
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type:ActionTypes.ADD_DISHES,
    payload:dishes
});


export const fetchComments = () => (dispatch) => {

    return fetch(baseUrl + 'comments')
        .then(response => { 
        if (response.ok)
        {
            return response;
        }
        else {
            var error = new Error('Error' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {   
        var errmess = new Error(error.message);
        throw error;
     })
     .then(response => response.json())
     .then(comments => dispatch(addComments(comments)))
     .catch(error => dispatch(commentsFailed(error.message)));;
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type:ActionTypes.ADD_COMMENTS,
    payload:comments
});


export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(response => { 
            if (response.ok)
            {
                return response;
            }
            else {
                var error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {   
            var errmess = new Error(error.message);
            throw error;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch( error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type:ActionTypes.ADD_PROMOS,
    payload:promos
});
