import {QuoteActionTypes, QuotesAction} from './quotes.actions';
import {Guild} from '../models/guild';
import {Quote} from '../models/quote';

export interface QuotesState {
  currGuild: Guild;
  quotes: Quote[];
}

const initialState: QuotesState = {
  currGuild: {guildName: 'Test Guild', guildID: '1'},
  quotes: []
};

export function quotesReducer(state: QuotesState, action: QuotesAction) {
  switch (action.type) {
    case QuoteActionTypes.GuildChange: {
      return {
        ...state,
        quotes: [],
        currGuild: action.payload.newGuild
      };
    }
    case QuoteActionTypes.QuoteAdded: {
      return {
        ...state,
        quotes: [...state.quotes, action.payload.newQuote]
      };
    }
    case QuoteActionTypes.QuoteRemoved: {
      return {
        ...state,
        quotes: state.quotes.filter(quote => action.payload.quoteID === quote.quoteID)
      };
    }
    default: {
      return state;
    }
  }
}
