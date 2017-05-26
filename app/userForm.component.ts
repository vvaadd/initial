import {Component} from '@angular/core';
import {User} from "./model/User";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {LoginService} from "./services/LoginService";

@Component({
    templateUrl: 'app/userForm.component.html',
    styles: [`
        input.ng-touched.ng-invalid {
            background-color: #ffe8f1;
        }
    `]
})

export class UserFormComponent {
    user: User = new User();

    constructor(private http: Http,
                private router: Router,
                private loginService: LoginService) {
    }

    onSubmit() {
        this.http.post("users", this.user).subscribe(res => {
            this.loginService.login({
                username: this.user.name,
                password: this.user.password
            }).subscribe(res => {
                if (res) {
                    this.router.navigateByUrl("/");
                }
            });
        });
    }
}