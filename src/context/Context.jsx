import React, {createContext, useEffect, useReducer} from 'react';
import Config from 'react-native-config';

const API_BASE_URL = Config.API_BASE_URL;
const gameData = require('../assets/categories.json');

const initialState = {
  games: [],
  currentGame: null,
  currentGameScore: [],
  globalScore: [],
};

const SET_GAMES = 'SET_GAMES';
const SET_CURRENT_GAME = 'SET_CURRENT_GAME';
const SET_GLOBAL_SCORE = 'SET_GLOBAL_SCORE';
const SET_CURRENT_GAME_SCORE = 'SET_CURRENT_GAME_SCORE';

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

  const fetchGlobalScore = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/games/global-games-rank`,
      );

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        return;
      }

      const data = await response.json();
      dispatch({type: 'SET_GLOBAL_SCORE', payload: data});

    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    dispatch({type: SET_GAMES, payload: gameData});
    fetchGlobalScore();
  }, []);

  return (
    <GameContext.Provider value={{state, dispatch}}>
      {children}
    </GameContext.Provider>
  );
};
