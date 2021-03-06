"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var User_1 = require("./model/User");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var LoginService_1 = require("./services/LoginService");
var UserFormComponent = (function () {
    function UserFormComponent(http, router, loginService) {
        this.http = http;
        this.router = router;
        this.loginService = loginService;
        this.user = new User_1.User();
    }
    UserFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.http.post("users", this.user).subscribe(function (res) {
            _this.loginService.login({
                username: _this.user.name,
                password: _this.user.password
            }).subscribe(function (res) {
                if (res) {
                    _this.router.navigateByUrl("/");
                }
            });
        });
    };
    return UserFormComponent;
}());
UserFormComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/userForm.component.html',
        styles: ["\n        input.ng-touched.ng-invalid {\n            background-color: #ffe8f1;\n        }\n    "]
    }),
    __metadata("design:paramtypes", [http_1.Http,
        router_1.Router,
        LoginService_1.LoginService])
], UserFormComponent);
exports.UserFormComponent = UserFormComponent;
//# sourceMappingURL=userForm.component.js.map