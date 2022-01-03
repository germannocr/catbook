import { NovoUsuarioService } from './novo-usuario.service';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { first, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioExistenteService {
  constructor(private novoUsuarioService: NovoUsuarioService) {}

  usuarioExistente() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        switchMap((nomeUsuario) =>
          this.novoUsuarioService.verificaUsuarioExistente(nomeUsuario)
        ),
        map((usuarioExistente) =>
          usuarioExistente ? { usuarioExistente: true } : null
        ),
        first()
      );
    };
  }
}
