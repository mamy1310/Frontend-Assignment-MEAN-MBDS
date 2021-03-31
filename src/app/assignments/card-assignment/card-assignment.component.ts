import { Component, OnInit } from '@angular/core';
import {Assignment} from '../assignment.model';

@Component({
  selector: 'app-card-assignment',
  templateUrl: './card-assignment.component.html',
  styleUrls: ['./card-assignment.component.css']
})
export class CardAssignmentComponent implements OnInit {
  assignment: Assignment;

  constructor() { }

  ngOnInit(): void {
  }

}
