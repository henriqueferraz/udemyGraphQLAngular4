import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginQuery } from '../../shared/querys/querys';

interface LoginResponse {
  login: User;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public nome: string;
  public senha: string;
  public formError: boolean;

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit() {}

  login(): any {
    this.apollo
      .watchQuery<LoginResponse>({
        query: loginQuery,
        variables: { nome: this.nome, senha: this.senha }
      })
      .subscribe(({ data }) => {
        if (data.login) {
          this.router.navigate(['/']);
        } else {
          this.formError = true;
        }
      });
  }
}

interface User {
  nome: string;
  senha: string;
}
