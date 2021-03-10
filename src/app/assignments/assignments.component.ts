import {Component, OnInit} from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  assignments: Assignment[];
  totalDocs: number;
  page = 1;
  limit = 10;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;

  // on injecte le service de gestion des assignments
  pageEvent: PageEvent;
  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit(): void {

    /*this.assignmentsService.getAssignments()
      .subscribe(assignments => {
        this.assignments = assignments;
        console.log('données reçues');
      });*/
    this.loadAssignments();
  }

  onDeleteAssignment(event): void {
    // event = l'assignment à supprimer

    // this.assignments.splice(index, 1);
    this.assignmentsService.deleteAssignment(event)
      .subscribe(message => {
        console.log(message);
      });
  }

  onPaginatorChanged(event: PageEvent): void {
    this.loadAssignments(event);
  }

  loadAssignments(event?: PageEvent): void {

    if (event) {
      this.pageEvent = event;
      this.page = event.pageIndex + 1;
      this.limit = event.pageSize;
    }
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
      .subscribe(assignments => {
        this.assignments = assignments.docs;
        this.totalDocs = assignments.totalDocs;
        this.limit = event?.pageSize || assignments.limit;
        this.page = event?.pageIndex + 1 || assignments.page;
        this.totalPages = assignments.totalPages;
        this.pagingCounter = assignments.pagingCounter;
        this.hasPrevPage = assignments.hasPrevPage;
        this.hasNextPage = assignments.hasNextPage;
        this.prevPage = assignments.prevPage;
        this.nextPage = assignments.nextPage;
        console.log('données reçues');
      });
  }

  getPageSizeOption(): number[] {
    const option = [];
    let counter = 0;
    while (counter + 25 < this.totalDocs) {
      counter += 25;
      option.push(counter);
    }
    option.push(this.totalDocs);
    return option;
  }
}
