import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatiereService } from 'src/app/shared/matiere.service';
import { Assignment } from '../assignment.model';
import { Matiere } from '../matiere.model';

@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css']
})
export class EditAssigmentComponent implements OnInit {
  assignment: Assignment;

  // pour le formulaire
  nom = '';
  dateDeRendu = null;
  matiere: Matiere;
  note : number;
  rendu = false;
  matieres: Matiere[] = [];
  @ViewChild('selectMatieres') selectMatieres;
  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private matiereService: MatiereService,
    // tslint:disable-next-line:variable-name
    private _formBuilder: FormBuilder,
    private toast: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    // ici on montre comment on peut récupérer les parametres http
    // par ex de :
    // http://localhost:4200/assignment/1/edit?nom=Michel%20Buffa&metier=Professeur&responsable=MIAGE#edition

    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    this.getAssignmentById();

  }
  loadMatieres(): void {
    this.spinner.show();
    this.matiereService.getMatieres().subscribe(
      (matieres) => {
        this.matieres = matieres;
        this.findMatiere();
        this.spinner.hide();
      },
      error => {
        this.toast.error(error, 'Erreur de chargement des matières');
        this.spinner.hide();
      }
    );
  }
  findMatiere(){
    this.matieres.forEach(mat =>{
      console.log(mat);
      if(mat.nom==this.matiere.nom){
        this.matiere = mat;
        console.log("matiere selected:");
        console.log(this.matiere);
        return;
      }
    })
  }
  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;

      this.nom = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.rendu = assignment.rendu;
      this.note = assignment.note;
      this.matiere = assignment.matiere
      this.loadMatieres();

    });
  }


  onSubmit(event) {
    // on va modifier l'assignment
    if ((!this.nom) || (!this.dateDeRendu)) { return; }

    this.assignment.nom = this.nom;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.matiere = this.matiere;
    this.assignment.note = this.note;
    this.assignment.rendu = this.rendu;
    console.log("assignement modifie");
    console.log(this.assignment);
    this.spinner.show();
    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log(message);
        this.toast.success("Modification du devoir reussi");
        this.spinner.hide();
        // et on navigue vers la page d'accueil
        this.router.navigate(['/home']);
      },error =>{
        console.log("error edit assignement:");
        console.log(error.error);
        this.toast.error(error.error.message, "Erreur de validation");
        this.spinner.hide();
      });

  }
}
