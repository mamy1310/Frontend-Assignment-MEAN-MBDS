import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  // passé sous forme d'attribut HTML
  assignmentTransmis: Assignment;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,  private toast: ToastrService,
    private spinner: NgxSpinnerService,public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAssignmentById();
  }

  getAssignmentById(): void {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignmentTransmis = assignment;
    });
  }

  onAssignmentRendu(): void {
    this.assignmentTransmis.rendu = true;

    this.assignmentsService
      .updateAssignment(this.assignmentTransmis)
      .subscribe((reponse) => {
        console.log(reponse.message);
        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(['/home']);
      }, error => {
        console.log('error edit assignement:');
        console.log(error.error);
        this.toast.error(error.error.message, 'Erreur de validation');
        this.spinner.hide();
      });

    // this.assignmentTransmis = null;
  }

  onDelete(): void {
    this.assignmentsService
      .deleteAssignment(this.assignmentTransmis)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // on cache l'affichage du détail
        this.assignmentTransmis = null;
        this.toast.success('Devoir supprimé');
        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(['/home']);
      });
  }

  onClickEdit(): void {
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit']);
  }

  rendreAssignement(): void {
    console.log(this.assignmentTransmis.rendu);
    this.openDialog(this.assignmentTransmis);
  }
  openDialog(assigment): void {
    assigment.rendu=!assigment.rendu;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {assignement: assigment}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result == undefined){
        console.log("annulation"+  this.assignmentTransmis.rendu);
        return;
      }
      result.rendu = !result.rendu;
      this.assignmentsService.updateAssignment(result)
      .subscribe(message => {
        console.log(message);
        this.toast.success('Modification du devoir reussi');
        this.spinner.hide();
        // et on navigue vers la page d'accueil
      }, error => {
        console.log('error edit assignement:');
        console.log(error.error);
        this.toast.error(error.error.message, 'Erreur de validation');
        this.spinner.hide();
      });
    });
  }


}
