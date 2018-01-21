import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'mq-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent implements OnInit {

  public guildID: string;
  public quoteID: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMapSnap => {
      this.guildID = paramMapSnap.get('guildid');
      this.quoteID = paramMapSnap.get('quoteid');
    });
  }

}
