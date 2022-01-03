import { UsuarioExistenteService } from './usuario-existente.service';
import { NovoUsuarioService } from './novo-usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { minusculoValidator } from './minusculo.validator';
import { usuarioSenhaIguaisValidator } from './usuario-senha-iguais.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css'],
})
export class NovoUsuarioComponent implements OnInit {
  novoUsuarioForm!: FormGroup;

  constructor(
    private novoUsuarioService: NovoUsuarioService,
    private formBuilder: FormBuilder,
    private usuarioExistenteService: UsuarioExistenteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        fullName: ['', [Validators.required, Validators.minLength(4)]],
        userName: [
          '',
          [minusculoValidator],
          [this.usuarioExistenteService.usuarioExistente()],
        ],
        password: ['', [Validators.required]],
      },
      {
        validators: [usuarioSenhaIguaisValidator],
      }
    );
  }

  cadastrarUsuario() {
    if (this.novoUsuarioForm.valid) {
    const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
    this.novoUsuarioService.cadastrarUsuario(novoUsuario).subscribe(() => {
      this.router.navigate(['']);
    },
    (error) => {
      console.log(error)
    })
    }
  }
}
