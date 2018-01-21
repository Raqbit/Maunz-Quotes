import {Action} from '@ngrx/store';
import {Quote} from '../models/quote';
import {Guild} from '../models/guild';

export enum QuoteActionTypes {
  GuildChange = '[Quotes] GUILD_CHANGE',
  QuoteAdded = '[Quotes] QUOTE_ADDED',
  QuoteRemoved = '[Quotes] QUOTE_REMOVED'
}

export class GuildChange implements Action {
  readonly type = QuoteActionTypes.GuildChange;

  constructor(public payload: {newGuild: Guild}) {}
}

export class QuoteAdded implements Action {
  readonly type = QuoteActionTypes.QuoteAdded;

  constructor(public payload: {newQuote: Quote}) {}
}

export class QuoteRemoved implements Action {
  readonly type = QuoteActionTypes.QuoteRemoved;

  constructor(public payload: {quoteID: string}) {}
}

export type QuotesAction =
  | GuildChange
  | QuoteAdded
  | QuoteRemoved;
