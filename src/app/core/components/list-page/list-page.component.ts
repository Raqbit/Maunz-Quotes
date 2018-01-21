import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'mq-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

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
