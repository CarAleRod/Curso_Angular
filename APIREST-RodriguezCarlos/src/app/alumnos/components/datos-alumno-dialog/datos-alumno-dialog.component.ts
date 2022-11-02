import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { I_Alumno } from '../../models/alumno';

@Component({
  selector: 'app-datos-alumno-dialog',
  templateUrl: './datos-alumno-dialog.component.html',
  styleUrls: ['./datos-alumno-dialog.component.css'],
})
export class DatosAlumnoDialogComponent implements OnInit {
  formulario!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DatosAlumnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: I_Alumno
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.formulario = this.formBuilder.group({
        nombre: [this.data.nombre, [Validators.required]],
        apellido: [this.data.apellido, [Validators.required]],
        edad: [
          this.data.edad,
          [Validators.required, Validators.pattern('^[0-9]*$')],
        ],
        genero: [this.data.genero, [Validators.required]],
        fechaDeIngreso: [this.data.fechaDeIngreso, []],
      });
    } else {
      this.formulario = this.formBuilder.group({
        nombre: ['', [Validators.required]],
        apellido: ['', [Validators.required]],
        edad: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        genero: ['', [Validators.required]],
      });
    }
  }

  guardar() {
    this.dialogRef.close(this.formulario.value as I_Alumno);
  }
}
