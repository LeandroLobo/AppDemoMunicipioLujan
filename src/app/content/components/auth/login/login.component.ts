import { FirebaseDatabaseService } from 'src/app/content/service/firebase-database.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginStorageService } from './../services/login-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService]
})
export class LoginComponent implements OnInit{

    valCheck: string[] = ['remember'];

    password!: string;
    user!: string;

    constructor(private loginStorage: LoginStorageService, private router: Router, private messageService: MessageService, private firebase: FirebaseDatabaseService) {}

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.

    }
    login() {
        if(this.user === 'admin' && this.password === '1234') {
            this.loginStorage.setIsAuthenticated(true);
            this.router.navigateByUrl('');
        } else {
            this.firebase.login(this.user, this.password).then((userCredential) => {
                this.loginStorage.setIsAuthenticated(true);
                this.router.navigateByUrl('');
                const user = userCredential.user;
                console.log(user);
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                this.messageService.add({severity:'warn', summary:'Acceso Denegado', detail:'El Usuario y/o la contraseña son incorrectos.'});
              });
        }
    }
}
