const SET_USER = 'SET_USER'
const LOGOUT_USER = "LOGOUT_USER"

const defaultState = {
   currentUser: {},
   isAuth: false
}

export const userReducer = (state = defaultState, action) => {
    switch(action.type) {
        case SET_USER: {
            return {
               ...state,
               currentUser: action.payload,
               isAuth: true
            }
        }
        case LOGOUT_USER: {
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        }
         
        default:
            return state
    }
}


export const setUser = user => ({type: SET_USER, payload: user})
export const logout = user => ({type: LOGOUT_USER})