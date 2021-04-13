import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {AfterViewInit, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs/operators';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import {MatTab} from '@angular/material/tabs';
import {MatProgressBar} from '@angular/material/progress-bar';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
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
  isAdmin = false;
  searchQuery = '';

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  @ViewChild('scrollerNonRendu') scrollerNonRendu: CdkVirtualScrollViewport;
  @ViewChild('matTabGroup') matTab: MatTab;

  // on injecte le service de gestion des assignments
  constructor(
    private assignmentsService: AssignmentsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private spinner: NgxSpinnerService, private toast: ToastrService, public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('AVANT AFFICHAGE');
    // on regarde s'il y a page= et limit = dans l'URL
    this.getAssignments(true);
    this.getAssignments(false);

    this.authService.checkUser();
    this.authService.getEmitted()
      .subscribe(item => this.isAdmin = item);
  }

  getAssignments(rendu: boolean): void {
    this.spinner.show();
    this.assignmentsService
      .getAssignmentsPagine(this.page, this.limit, rendu,this.searchQuery)
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
  search(): void{
      console.log("SearchQuery:"+this.searchQuery);
      this.getAssignments(true);
      this.getAssignments(false);
  }
  getPlusDAssignmentsPourScrolling(rendu: boolean): void {
    this.spinner.show();
    this.assignmentsService
      .getAssignmentsPagine(this.page, this.limit, rendu,this.searchQuery)
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
  onDelete(assignmentTransmis): void {
    this.assignmentsService
      .deleteAssignment(assignmentTransmis)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // on cache l'affichage du détail
        this.toast.success('Devoir supprimé');
        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(['/home']);
      });
  }

  onClickEdit(assignmentTransmis): void {
    this.router.navigate(['/assignment', assignmentTransmis.id, 'edit']
      );
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

  // tslint:disable-next-line:typedef
  drop(event: CdkDragDrop<string[]>) {
    console.log('event drop');
    console.log(event);
    if (event.previousContainer === event.container) {
      console.log('same');
    } else {
      console.log('not same');
    }
  }
  // tslint:disable-next-line:typedef
  dropDrag(event: CdkDragDrop<any>, assignement: Assignment){
    console.log('event drag drop');
    console.log(event);
    if (this.authService.isAdmin){
        const x = event.distance.x;
        if (assignement.rendu && x >= 50){
          // edit non rendu
          this.openDialog(assignement);
        }else if (!assignement.rendu && x <= 0){
          this.openDialog(assignement);
        }
    }
    event.item.reset();
  }

  openDialog(assigment): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {assignement: assigment}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      result.rendu = !result.rendu;
      this.assignmentsService.updateAssignment(result)
      .subscribe(message => {
        console.log(message);
        this.toast.success('Modification du devoir reussi');
        this.spinner.hide();
        // et on navigue vers la page d'accueil
        this.getAssignments(!result.rendu);
      }, error => {
        console.log('error edit assignement:');
        console.log(error.error);
        this.toast.error(error.error.message, 'Erreur de validation');
        this.spinner.hide();
      });
    });
  }
}
