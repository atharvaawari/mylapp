import React, {createContext, useEffect, useReducer} from 'react';

const gameData = require('../assets/categories.json');

const initialState = {
  games: [],
  currentGame: null,
  currentGameScore: [],
  globalScore:[],
};

const SET_GAMES = 'SET_GAMES';
const SET_CURRENT_GAME = 'SET_CURRENT_GAME';
const SET_GLOBAL_SCORE ='SET_GLOBAL_SCORE';
const SET_CURRENT_GAME_SCORE ='SET_CURRENT_GAME_SCORE';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_GAMES:
      return {...state, games: action.payload};
    case SET_CURRENT_GAME:
      return {...state, currentGame: action.payload};
    case SET_CURRENT_GAME_SCORE:
      return {...state, currentGameScore: action.payload};
    case SET_GLOBAL_SCORE:
      return {...state, globalScore: action.payload};
    default:
      return state;
  }
};

export const GameContext = createContext();

export const GameProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({type: SET_GAMES, payload: gameData});
  }, []);

  return (
    <GameContext.Provider value={{state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
