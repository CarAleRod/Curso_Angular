import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IAlumno } from 'src/app/model/i-alumno';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  
  @Output() agregarAlumno:EventEmitter<IAlumno>=new EventEmitter<IAlumno>();

  formulario=this.formBuilder.group({
    nombre:['',[Validators.required]],
    apellido:['',[Validators.required]],
    edad:['',[Validators.required,Validators.pattern('^[0-9]*$')]],
    email:['',[Validators.email]]
  })
  constructor(
    private formBuilder:FormBuilder
  ) { }
  ngOnInit(): void {
  }

  enviarForm(){
    this.agregarAlumno.emit(this.formulario.value as unknown as IAlumno);
  }

}
