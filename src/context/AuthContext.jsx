import {createContext, useContext, useEffect, useReducer} from 'react';
import {getData, storeData} from '../utils/asyncStorage';




export const AuthContext = createContext();

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_USER = 'SET_USER';
const SET_GUEST = 'SET_GUEST';


const authReducers = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, user: action.payload, isAuthenticated: true, isGuest: false};
    case LOGOUT:
      return {...state, user: null, isAuthenticated: false};
    case SET_USER:
      return {...state, user: action.payload, isAuthenticated: true};
    case SET_GUEST:
      return { ...state, isGuest: true };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
};


export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducers, initialState);

  useEffect(()=>{
    const checkAuthentication = async ()=> {
      const userData = await getData('user');
      if(userData) {
        dispatch({type: 'SET_USER', payload: userData });
      }else{
        dispatch({ type: 'SET_GUEST' });
      }
    };

    checkAuthentication();
  }, [])

  const login = async (user) => {
    await storeData('user', user); 
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = async () => {
    await storeData('user', null); 
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);