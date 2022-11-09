import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaCursosComponent } from './lista-cursos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';

describe('ListaCursosComponent', () => {
  let component: ListaCursosComponent;
  let fixture: ComponentFixture<ListaCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      declarations: [ListaCursosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
