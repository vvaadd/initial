import {Component} from "@angular/core";
import {LoginService, LoginUser} from "./services/LoginService";
import {Router} from "@angular/router";

@Component({
    selector: 'login-form',
    templateUrl: 'app/loginForm.component.html'
})

export class LoginFormComponent {
    userForm: LoginUser = new LoginUser();
    failedLogin: boolean;

    constructor(private loginService: LoginService, private router: Router) {
        this.loginService.userLogin$.subscribe(user => this.userForm = user || new LoginUser());
    }

    get loggedIn() {
        return this.loginService.loggedIn;
    }

    login() {
        this.loginService.login(this.userForm)
            .subscribe(res => res ? this.onSuccessLogin() : this.onFailLogin());
    }

    logout() {
        this.loginService.logout().subscribe(res => this.onLogout());
    }


    onSuccessLogin() {
        this.router.navigateByUrl("/");
    }

    onFailLogin() {
        this.failedLogin = true;
        setTimeout(() => this.failedLogin = false, 1000);
    }

    onLogout() {
        this.router.navigateByUrl("/");
    }
}