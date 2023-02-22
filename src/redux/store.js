import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import createSagaMiddleware from '@redux-saga/core';
import sagaAction from './sagaAction';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({ 
    reducer: reducer,
    middleware:()=>[sagaMiddleware]
  })
sagaMiddleware.run(sagaAction);
export default store;