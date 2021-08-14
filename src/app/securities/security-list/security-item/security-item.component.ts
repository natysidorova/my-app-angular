import { Component, OnInit, Input } from '@angular/core';

import { Security } from '../../security.model';

@Component({
  selector: 'app-security-item',
  templateUrl: './security-item.component.html',
  styleUrls: ['./security-item.component.css']
})
export class SecurityItemComponent implements OnInit {
  @Input() security: Security;
  @Input() index: number;
  constructor() { }

  ngOnInit(): void {
  }

}
