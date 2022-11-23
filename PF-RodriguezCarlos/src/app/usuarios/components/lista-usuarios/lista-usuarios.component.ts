import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { I_Sesion } from 'src/app/core/models/sesion';
import { cargarMenuActivo } from 'src/app/core/state/sesion.actions';
import { I_Usuario } from '../../models/usuario';
import { I_UsuarioState } from '../../models/usuario.state';
import {
  agregarUsuario,
  cargarUsuarios,
  editarUsuario,
  eliminarUsuario,
} from '../../state/usuarios.actions';
import { selectUsuarios } from '../../state/usuarios.selectors';
import { DatosUsuarioDialogComponent } from '../datos-usuario-dialog/datos-usuario-dialog.component';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})
export class ListaUsuariosComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  subscripcion!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnas: string[] = ['usuario', 'esAdmin', 'acciones'];
  dataSource: MatTableDataSource<I_Usuario> =
    new MatTableDataSource<I_Usuario>();

  constructor(
    private storeUsuarios: Store<I_UsuarioState>,
    private storeSesion: Store<I_Sesion>,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.storeSesion.dispatch(cargarMenuActivo({ menuActivo: 'Usuarios' }));
    this.actualizarLista();

    this.dataSource.filterPredicate = function (
      usuario: I_Usuario,
      filtro: string
    ) {
      return usuario.usuario
        .toLocaleLowerCase()
        .includes(filtro.toLocaleLowerCase());
    };
  }

  actualizarLista() {
    this.subscripcion = this.storeUsuarios.select(selectUsuarios).subscribe({
      next: (usuarios: I_Usuario[]) => {
        this.dataSource.data = usuarios;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editar(id: number) {
    let position = this.dataSource.data.findIndex(
      (usuario) => usuario.id == id
    );
    let usuarioData = this.dataSource.data[position];

    let dialog = this.dialog.open(DatosUsuarioDialogComponent, {
      width: '50%',
      height: '80%',
      data: usuarioData,
    });
    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        const newData: I_Usuario = {
          ...res,
          id: id,
        };
        this.storeUsuarios.dispatch(editarUsuario({ usuario: newData }));
      }
    });
  }

  borrar(id: number) {
    this.storeUsuarios.dispatch(eliminarUsuario({ id: id }));
  }
  openDialog() {
    let dialog = this.dialog.open(DatosUsuarioDialogComponent, {
      width: '50%',
      height: '80%',
    });

    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        let newId: number = this.obtenerProximoId();
        let newData = {
          ...res,
          id: newId,
        };
        this.storeUsuarios.dispatch(agregarUsuario({ usuario: newData }));
      }
    });
  }

  filtrar(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }

  obtenerProximoId() {
    let maxId: number = 0;
    this.dataSource.data.forEach((usuario) => {
      if (usuario.id > maxId) {
        maxId = usuario.id;
      }
    });
    return maxId + 1;
  }
}
