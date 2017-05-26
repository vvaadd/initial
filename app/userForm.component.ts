import {Component} from '@angular/core';
import {User} from "./model/User";
import {Http} from "@angular/http";
import {Router} from "@angular/router";

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

    constructor(private http: Http, private router: Router) {
    }

    onSubmit() {
        this.http.post("users", this.user).subscribe(res => {
            this.router.navigateByUrl("");
        });
    }
}