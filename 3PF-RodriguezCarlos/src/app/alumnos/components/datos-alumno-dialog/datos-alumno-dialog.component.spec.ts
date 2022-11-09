import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatosAlumnoDialogComponent } from './datos-alumno-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { I_Alumno } from '../../models/alumno';
import { of } from 'rxjs';

describe('DatosAlumnoDialogComponent (alta)', () => {
  let component: DatosAlumnoDialogComponent;
  let fixture: ComponentFixture<DatosAlumnoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [DatosAlumnoDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: DatosAlumnoDialogComponent },
        { provide: MAT_DIALOG_DATA, useValue: null },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosAlumnoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('El formulario se mantiene invalido cuando no ingreso el nombre', () => {
    const formulario = component.formulario;
    const apellido = formulario.controls['apellido'];
    apellido.setValue('Rodriguez');
    const edad = formulario.controls['edad'];
    edad.setValue(24);
    const genero = formulario.controls['genero'];
    genero.setValue('M');

    expect(formulario.valid).toBeFalse();
  });

  it('El formulario se mantiene invalido cuando no ingreso el apellido', () => {
    const formulario = component.formulario;
    const nombre = formulario.controls['nombre'];
    nombre.setValue('Carlos');
    const edad = formulario.controls['edad'];
    edad.setValue(24);
    const genero = formulario.controls['genero'];
    genero.setValue('M');

    expect(formulario.valid).toBeFalse();
  });

  it('El formulario se mantiene invalido cuando no ingreso la edad', () => {
    const formulario = component.formulario;
    const apellido = formulario.controls['apellido'];
    apellido.setValue('Rodriguez');
    const nombre = formulario.controls['nombre'];
    nombre.setValue('Carlos');
    const genero = formulario.controls['genero'];
    genero.setValue('M');

    expect(formulario.valid).toBeFalse();
  });

  it('El formulario se mantiene invalido cuando no ingreso el género', () => {
    const formulario = component.formulario;
    const apellido = formulario.controls['apellido'];
    apellido.setValue('Rodriguez');
    const nombre = formulario.controls['nombre'];
    nombre.setValue('Carlos');
    const edad = formulario.controls['edad'];
    edad.setValue(24);

    expect(formulario.valid).toBeFalse();
  });

  it('El formulario se mantiene valido cuando ingreso los 4 campos requeridos', () => {
    const formulario = component.formulario;
    const apellido = formulario.controls['apellido'];
    apellido.setValue('Rodriguez');
    const nombre = formulario.controls['nombre'];
    nombre.setValue('Carlos');
    const edad = formulario.controls['edad'];
    edad.setValue(24);
    const genero = formulario.controls['genero'];
    genero.setValue('M');

    expect(formulario.valid).toBeTrue();
  });

  it('El valor del formulario devuelve el objeto correcto', () => {
    const formulario = component.formulario;
    const apellido = formulario.controls['apellido'];
    apellido.setValue('Rodriguez');
    const nombre = formulario.controls['nombre'];
    nombre.setValue('Carlos');
    const edad = formulario.controls['edad'];
    edad.setValue(24);
    const genero = formulario.controls['genero'];
    genero.setValue('M');

    const mockAlumno = {
      nombre: 'Carlos',
      apellido: 'Rodriguez',
      edad: 24,
      genero: 'M',
    };
    expect(formulario.value).toEqual(mockAlumno);
  });
});

describe('DatosAlumnoDialogComponent (modificación)', () => {
  let component: DatosAlumnoDialogComponent;
  let fixture: ComponentFixture<DatosAlumnoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [DatosAlumnoDialogComponent],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: DatosAlumnoDialogComponent },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            nombre: 'Willy',
            apellido: 'Botsford',
            edad: 52,
            genero: 'M',
            fechaDeIngreso: '2022-10-30T22:46:07.783Z',
            id: '1',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosAlumnoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('El valor del formulario devuelve el objeto correcto', () => {
    const formulario = component.formulario;

    const mockAlumno = {
      nombre: 'Willy',
      apellido: 'Botsford',
      edad: 52,
      genero: 'M',
      fechaDeIngreso: '2022-10-30T22:46:07.783Z',
    };
    expect(formulario.value).toEqual(mockAlumno);
  });
});

class DatosAlumnosDialogMock {
  result!: I_Alumno;

  setResult(val: I_Alumno) {
    this.result = val;
  }

  open() {}
  close() {
    return of(this.result);
  }
  afterClosed() {
    return of(this.result);
  }
}

describe('DatosAlumnoDialogComponent (close)', () => {
  let component: DatosAlumnoDialogComponent;
  let fixture: ComponentFixture<DatosAlumnoDialogComponent>;
  let datosAlumnosDialogMock = new DatosAlumnosDialogMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [DatosAlumnoDialogComponent],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: datosAlumnosDialogMock },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            nombre: 'Willy',
            apellido: 'Botsford',
            edad: 52,
            genero: 'M',
            fechaDeIngreso: new Date('2022-10-30T22:46:07.783Z'),
            id: 1,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosAlumnoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('El dialogo se cierra correctamente', (done: DoneFn) => {
    const formulario = component.formulario;
    const boton = fixture.debugElement.query(By.css('#btnGuardar'));
    datosAlumnosDialogMock.setResult({
      nombre: 'Willy',
      apellido: 'Botsford',
      edad: 52,
      genero: 'M',
      fechaDeIngreso: new Date('2022-10-30T22:46:07.783Z'),
      id: 1,
    });
    boton.nativeElement.click();
    component.dialogRef.afterClosed().subscribe((data) => {
      let result = {
        ...formulario.value,
        id: 1,
      };
      expect(data).toEqual(result);
      done();
    });
  });
});
