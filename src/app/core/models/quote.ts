export class Quote {
  public quoteID: string;
  public title: string;
  public submitter: string;
  public quote: string;
  public timestamp: number;
  public approved: boolean;

  constructor(title, quote, submiter) {
  }
}
