import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { I_Alumno } from 'src/app/alumnos/models/alumno';
import { AlumnosService } from 'src/app/alumnos/services/alumnos.service';
import { I_Curso } from 'src/app/cursos/models/curso';
import { I_CursoState } from 'src/app/cursos/models/curso.state';
import { selectCursos } from 'src/app/cursos/state/cursos.selectors';
import { I_Inscripcion } from '../../models/inscripcion';
import { I_InscripcionConNombre } from '../../models/InscripcionConNombre';

@Component({
  selector: 'app-datos-inscripcion-dialog',
  templateUrl: './datos-inscripcion-dialog.component.html',
  styleUrls: ['./datos-inscripcion-dialog.component.css'],
})
export class DatosInscripcionDialogComponent implements OnInit {
  formulario!: FormGroup;
  alumnosInsc!: I_Alumno[];
  cursosInsc!: I_Curso[];
  cursosSubscription: Subscription;
  alumnosSubscription: Subscription;
  constructor(
    private storeCursos: Store<I_CursoState>,
    private alumnosService: AlumnosService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DatosInscripcionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: I_InscripcionConNombre
  ) {
    this.cursosSubscription = this.storeCursos
      .select(selectCursos)
      .subscribe(
        (cursos: I_Curso[]) =>
          (this.cursosInsc = cursos.filter(
            (curso) => curso.inscripcionAbierta == true
          ))
      );

    this.alumnosSubscription = this.alumnosService
      .obtenerAlumnos()
      .subscribe((alumnos: I_Alumno[]) => (this.alumnosInsc = alumnos));
  }

  ngOnInit(): void {
    if (this.data) {
      this.formulario = this.formBuilder.group({
        cursoId: [this.data.cursoId, [Validators.required]],
        alumnoId: [this.data.alumnoId, [Validators.required]],
      });
    } else {
      this.formulario = this.formBuilder.group({
        cursoId: ['', [Validators.required]],
        alumnoId: ['', [Validators.required]],
      });
    }
  }

  guardar() {
    this.dialogRef.close(this.formulario.value as I_Inscripcion);
  }
}
