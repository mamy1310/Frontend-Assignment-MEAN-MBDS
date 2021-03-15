import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {ToastrService} from 'ngx-toastr';
import {Assignment} from '../assignment.model';
import {NgxSpinnerService} from "ngx-spinner";

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
  nom = '';
  dateDeRendu = null;
  matiere = null;
  matieres = [
    {
      nom: 'JEE',
      image: 'jee.png',
      nom_prof: '',
      photo_prof: '',
    }, {
      nom: 'Big data',
      image: 'big_data.png',
      nom_prof: '',
      photo_prof: '',
    }
  ];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isLinear: false;

  constructor(private assignmentsService: AssignmentsService,
              private router: Router,
              // tslint:disable-next-line:variable-name
              private _formBuilder: FormBuilder,
              private toast: ToastrService,
              private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.initStepper();
  }

  onSubmit(event): void {
    this.spinner.show();
    if ((!this.nom) || (!this.dateDeRendu)) { return; }

    const nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nom;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.matiere = {
      image: this.matiere.image,
      nom: this.matiere.nom,
      photo_prof: this.matiere.photo_prof,
      nom_prof: this.matiere.nom_prof
    };

    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        // console.log(reponse.message);

         // et on navigue vers la page d'accueil qui affiche la liste
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

}
