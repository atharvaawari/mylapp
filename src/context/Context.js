import React, {createContext, useEffect, useReducer, useMemo} from 'react';

const gameData = require('../assets/categories.json');

const initialState = {
  games: [],
  currentGame: null,
};

const SET_GAMES = 'SET_GAMES';
const SET_CURRENT_GAME = 'SET_CURRENT_GAME';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_GAMES:
      return {...state, games: action.payload};
    case SET_CURRENT_GAME:
      return {...state, currentGame: action.payload};
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

  const filteredCurrentGame  = useMemo(() => {
    return state.games.filter(game => game.slug  !== state.currentGame?.slug );
  }, [state.currentGame]);

  return (
    <GameContext.Provider value={{state, dispatch, filteredCurrentGame }}>
      {children}
    </GameContext.Provider>
  );
};
