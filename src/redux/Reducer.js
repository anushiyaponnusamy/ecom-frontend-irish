import { combineReducers } from 'redux';
import productSearchReducer from './Redux';

const rootReducer = combineReducers({
    search: productSearchReducer,
    // Add more reducers here if you have additional slices
});

export default rootReducer;
