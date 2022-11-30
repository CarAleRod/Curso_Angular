import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { reducer } from 'src/app/core/state/sesion.reducer';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { usuariosReducer } from '../../state/usuarios.reducer';

import { ListaUsuariosComponent } from './lista-usuarios.component';

describe('ListaUsuariosComponent', () => {
  let component: ListaUsuariosComponent;
  let fixture: ComponentFixture<ListaUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        SharedModule,
        StoreModule.forRoot({
          usuarios: usuariosReducer,
          sesion: reducer,
        }),
      ],
      declarations: [ListaUsuariosComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
