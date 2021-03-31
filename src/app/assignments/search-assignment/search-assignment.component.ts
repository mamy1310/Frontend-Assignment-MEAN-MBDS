import { Component, OnInit } from '@angular/core';
import {Assignment} from '../assignment.model';

@Component({
  selector: 'app-search-assignment',
  templateUrl: './search-assignment.component.html',
  styleUrls: ['./search-assignment.component.css']
})
export class SearchAssignmentComponent implements OnInit {

  searchResults: Assignment[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
