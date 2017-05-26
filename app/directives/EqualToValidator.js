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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EqualToValidator = EqualToValidator_1 = (function () {
    function EqualToValidator(validateEqual) {
        this.validateEqual = validateEqual;
    }
    EqualToValidator.prototype.validate = function (c) {
        var v = c.value;
        var e = c.root.get(this.validateEqual);
        // subscribe to future changes in password
        e.valueChanges.subscribe(function (val) {
            if (val != v)
                c.setErrors({ validateEqual: false });
            else
                c.setErrors(null);
        });
        if (e && v !== e.value)
            return { validateEqual: false };
        return null;
    };
    return EqualToValidator;
}());
EqualToValidator = EqualToValidator_1 = __decorate([
    core_1.Directive({
        selector: '[validateEqual][ngModel]',
        providers: [{
                provide: forms_1.NG_VALIDATORS,
                useExisting: EqualToValidator_1, multi: true
            }]
    }),
    __param(0, core_1.Attribute("validateEqual")),
    __metadata("design:paramtypes", [String])
], EqualToValidator);
exports.EqualToValidator = EqualToValidator;
var EqualToValidator_1;
//# sourceMappingURL=EqualToValidator.js.map