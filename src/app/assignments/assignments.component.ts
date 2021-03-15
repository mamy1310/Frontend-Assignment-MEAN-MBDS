import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {AfterViewInit, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs/operators';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import {MatTab} from '@angular/material/tabs';
import {MatProgressBar} from '@angular/material/progress-bar';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit, AfterViewInit {
  // assignments: Assignment[];
  assignmentsRendu: Assignment[];
  assignmentsNonRendu: Assignment[];
  page = 1;
  limit = 30;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  @ViewChild('scrollerNonRendu') scrollerNonRendu: CdkVirtualScrollViewport;
  @ViewChild('matTabGroup') matTab: MatTab;

  // on injecte le service de gestion des assignments
  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    console.log('AVANT AFFICHAGE');
    // on regarde s'il y a page= et limit = dans l'URL
    this.getAssignments(true);
    this.getAssignments(false);
  }

  getAssignments(rendu: boolean): void {
    this.spinner.show();
    this.assignmentsService
      .getAssignmentsPagine(this.page, this.limit, rendu)
      .subscribe((data) => {
        if (rendu) {
          this.assignmentsRendu = data.docs;
        } else {
          this.assignmentsNonRendu = data.docs;
        }
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        console.log('données reçues');
        this.spinner.hide();
      });
  }

  getPlusDAssignmentsPourScrolling(rendu: boolean): void {
    this.spinner.show();
    this.assignmentsService
      .getAssignmentsPagine(this.page, this.limit, rendu)
      .subscribe((data) => {
        // au lieu de remplacer this.assignments par les nouveaux assignments récupérés
        // on va les ajouter à ceux déjà présents...
        if (rendu) {
          this.assignmentsRendu = this.assignmentsRendu.concat(data.docs);
        } else {
          this.assignmentsNonRendu = this.assignmentsNonRendu.concat(data.docs);
        }
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        console.log('données reçues');
        this.spinner.hide();
      });
  }

  ngAfterViewInit(): void {
    this.loadScrollerListener(this.scroller, true);
    this.loadScrollerListener(this.scrollerNonRendu, false);
  }

  loadScrollerListener(scroller: CdkVirtualScrollViewport, rendu): void {
    scroller.elementScrolled()
      .pipe(
        map((event) => {
          return scroller.measureScrollOffset('bottom');
        }),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 200),
        throttleTime(200)
      )
      .subscribe((dist) => {
        this.ngZone.run(() => {
          if (this.hasNextPage) {
            this.page = this.nextPage;
            this.getPlusDAssignmentsPourScrolling(rendu);
          }
        });
      });
  }

  onDeleteAssignment(event): void {
    // event = l'assignment à supprimer

    // this.assignments.splice(index, 1);
    this.assignmentsService.deleteAssignment(event).subscribe((message) => {
      console.log(message);
    });
  }

  premierePage(): void {
    this.router.navigate(['/home'], {
      queryParams: {
        page: 1,
        limit: this.limit,
      },
    });
  }

  pageSuivante(): void {
    /*
    this.page = this.nextPage;
    this.getAssignments();*/
    this.router.navigate(['/home'], {
      queryParams: {
        page: this.nextPage,
        limit: this.limit,
      },
    });
  }

  pagePrecedente(): void {
    this.router.navigate(['/home'], {
      queryParams: {
        page: this.prevPage,
        limit: this.limit,
      },
    });
  }

  dernierePage(): void {
    this.router.navigate(['/home'], {
      queryParams: {
        page: this.totalPages,
        limit: this.limit,
      },
    });
  }

  onTabChanged(event): void {
    this.page = 1;
    this.getAssignments(event === 0);
  }
}
