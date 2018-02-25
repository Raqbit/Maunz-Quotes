export default class Quote {
  public title: string;
  public submitter: string;
  public quote: string;
  public approved: boolean;
  public timestamp: number;

  constructor(title, quote, submitter) {
    this.title = title;
    this.quote = quote;
    this.submitter = submitter;
  }
}
