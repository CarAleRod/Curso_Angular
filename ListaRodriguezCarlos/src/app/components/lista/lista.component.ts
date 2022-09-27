import { Component, OnInit } from '@angular/core';
import { I_alumno } from 'src/app/model/ListaAlumnos';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  public listaAlumnos:Array<I_alumno>=[
    { 
      nombre:"Julio",
      apellido:"Sambrano",
      edad:22,
      subscripciones:["Angular","React","Node"],
      genero:"M",
      activo: true,
      fechaIngreso: new Date("2021/3/22"),
    }, { 
      nombre:"Mario",
      apellido:"Vros",
      edad:62,
      subscripciones:["Java","Javascript"],
      genero:"M",
      activo: true,
      fechaIngreso: new Date("2020/7/27"),
    }, { 
      nombre:"nina",
      apellido:"brava",
      edad:42,
      subscripciones:["Node","MongoDB","Express"],
      genero:"F",
      activo: true,
      fechaIngreso: new Date(2020, 3, 7),
    }, { 
      nombre:"modesto",
      apellido:"rico",
      edad:53,
      subscripciones:["Visual Studio Code","Javascript"],
      genero:"M",
      activo: true,
      fechaIngreso: new Date(2022, 2, 12),
    }, { 
      nombre:"Julieta",
      apellido:"Rada",
      edad:35,
      subscripciones:["C#","SQL Server"],
      genero:"F",
      activo: true,
      fechaIngreso: new Date(2022, 2, 15),
    }, { 
      nombre:"Cesar",
      apellido:"Poo",
      edad:34,
      subscripciones:["Diseño 4D","Virtual Transpolation"],
      genero:"M",
      activo: false,
      fechaIngreso: new Date(2021, 9, 5),
    }, { 
      nombre:"Jorge",
      apellido:"Salinas",
      edad:27,
      subscripciones:["Java","MongoDB","Angular"],
      genero:"M",
      activo: true,
      fechaIngreso: new Date(2022, 5, 9),
    }
  ]
  
  constructor() { 
    this.listaAlumnos.sort(function(a, b){
        if (a.apellido.toLowerCase()> b.apellido.toLowerCase()){
          return 1;
        }else if(a.apellido.toLowerCase()<b.apellido.toLowerCase()){
          return -1;
        } 
        if (a.nombre.toLowerCase()>b.nombre.toLowerCase()){
          return 1;
        }
        return -1;
        
    });
  }

  ngOnInit(): void {
  }

}
