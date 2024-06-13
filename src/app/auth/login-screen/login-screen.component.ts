import { Component } from '@angular/core';
import { CardFormComponent } from '../../components/card-form/card-form.component';
import { TextInputComponent } from '../../components/text-input/text-input.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ModalBaseComponent } from '../../components/modal-base/modal-base.component';
import { NgIf } from '@angular/common';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { connectionStrings } from '../../api/ConnectionStrings';
import { UserLogin } from '../../api/interfaces/UserLogin';
import { TokenObject } from '../../api/interfaces/TokenObject';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [CardFormComponent, TextInputComponent, ModalBaseComponent, SpinnerComponent, NgIf],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'
})
export class LoginScreenComponent {
  isModalOpen: boolean = false;
  isLoading: boolean = false;
  email: string = "";
  password: string = "";
  tokenObj: TokenObject | null = null;
  error: HttpErrorResponse | null = null;
  errorTitle: string = "";
  errorMessage: string = "";

  constructor(private http: HttpClient) {

  }
  
  getEmail(value: string): void {
    this.email = value;
  }
  
  getPassword(value: string): void {
    this.password = value;
  }

  setModalClose() {
    this.isModalOpen = false;
  }
    
  onFormFilled() {
    this.isLoading = true;
    this.isModalOpen = true;

    const user: UserLogin = {
      email: this.email,
      password: this.password
    }; 

    const tokenRes = this.http.post<TokenObject>(connectionStrings.login, user)
      .pipe(catchError(err => {
          this.error = err
          return [];
        }));
    
    this.isLoading = false;

    if (this.error === null) {
      tokenRes.forEach(t => {
        sessionStorage.setItem("token", t.token);
        this.tokenObj = t;
      });
      this.isModalOpen = false;
      return;
    }

    if (this.error.error.message === 'INVALID_CREDENTIALS') {
      this.errorTitle = "No se pudo iniciar sesión";
      this.errorMessage = "Credenciales Incorrectas, Intente iniciar sesión otra vez o crea una cuenta";
    }

    console.log(this.error); 
  }

}
