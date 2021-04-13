import { Component, OnInit } from '@angular/core';
import {Assignment} from '../assignment.model';
import {AssignmentsService} from '../../shared/assignments.service';

@Component({
  selector: 'app-search-assignment',
  templateUrl: './search-assignment.component.html',
  styleUrls: ['./search-assignment.component.css']
})
export class SearchAssignmentComponent implements OnInit {

  searchResults: Assignment[] = [];
  toSearch: Assignment;

  constructor(private as: AssignmentsService) { }

  ngOnInit(): void {
    this.toSearch = {
      id: null,
      rendu: null,
      matiere: null,
      nom: '',
      dateDeRendu: new Date()
    };
  }

  onSearchSubmit(): void {
    this.as.searchAssignments(this.toSearch).subscribe(data => console.log(data));
  }

}
