import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AssignmentsService} from 'src/app/shared/assignments.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {ToastrService} from 'ngx-toastr';
import {Assignment} from '../assignment.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatiereService} from '../../shared/matiere.service';
import {Matiere} from '../matiere.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class AddAssignmentComponent implements OnInit {
  // Pour les champs du formulaire
  nom: string = null;
  dateDeRendu = null;
  matiere: Matiere;
  matieres: Matiere[] = [];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isLinear: false;

  constructor(private assignmentsService: AssignmentsService,
              private matiereService: MatiereService,
              private router: Router,
              // tslint:disable-next-line:variable-name
              private _formBuilder: FormBuilder,
              private toast: ToastrService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.initStepper();
    this.loadMatieres();
  }

  onSubmit(event): void {
    this.spinner.show();
    if ((!this.nom) || (!this.dateDeRendu)) {
      return;
    }

    const nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nom;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.matiere = {
      image: this.matiere.image,
      nom: this.matiere.nom,
      image_prof: this.matiere.image_prof,
      nom_prof: this.matiere.nom_prof
    };

    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        this.router.navigate(['/home']);
        this.toast.success(reponse.message, 'Info');
        this.spinner.hide();
      });
  }

  initStepper(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  loadMatieres(): void {
    this.spinner.show();
    this.matiereService.getMatieres().subscribe(
      (matieres) => {
        this.matieres = matieres;
        this.spinner.hide();
      },
      error => {
        this.toast.error(error, 'Erreur de chargement des matières');
        this.spinner.hide();
      }
    );
  }

}
