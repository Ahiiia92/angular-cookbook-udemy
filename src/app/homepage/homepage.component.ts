import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
