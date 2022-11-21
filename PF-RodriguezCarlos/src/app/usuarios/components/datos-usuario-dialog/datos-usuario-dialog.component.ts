import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { I_Usuario } from '../../models/usuario';

@Component({
  selector: 'app-datos-usuario-dialog',
  templateUrl: './datos-usuario-dialog.component.html',
  styleUrls: ['./datos-usuario-dialog.component.css'],
})
export class DatosUsuarioDialogComponent implements OnInit {
  formulario!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DatosUsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: I_Usuario
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.formulario = this.formBuilder.group({
        usuario: [this.data.usuario, [Validators.required]],
        clave: [this.data.clave, [Validators.required]],
        esAdmin: [this.data.esAdmin, [Validators.required]],
      });
    } else {
      this.formulario = this.formBuilder.group({
        usuario: ['', [Validators.required]],
        clave: ['', [Validators.required]],
        esAdmin: [false, [Validators.required]],
      });
    }
  }

  guardar() {
    if (this.dialogRef) {
      this.dialogRef.close(this.formulario.value as I_Usuario);
    }
  }
}
