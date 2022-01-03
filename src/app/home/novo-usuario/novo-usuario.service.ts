import { NovoUsuario } from './novo-usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {

  constructor(private httpClient: HttpClient) { }

  url = 'http://localhost:3000/user/'

  cadastrarUsuario(novoUsuario: NovoUsuario): Observable<any> {
    return this.httpClient.post(`${this.url}signup`, novoUsuario)
  }

  verificaUsuarioExistente(nomeUsuario: string) {
    return this.httpClient.get(`${this.url}exists/${nomeUsuario}`)
  }
}
