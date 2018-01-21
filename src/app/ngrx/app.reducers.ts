import {ActionReducerMap} from '@ngrx/store';
import * as fromQuotes from '../core/ngrx/quotes.reducer';

export interface AppState {
  quotes: fromQuotes.QuotesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  quotes: fromQuotes.quotesReducer
};
