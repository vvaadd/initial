import {Attribute, Directive} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";

@Directive({
    selector: '[validateEqual][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EqualToValidator, multi: true
    }]
})

export class EqualToValidator implements Validator {

    constructor(@Attribute("validateEqual") public validateEqual: string) {
    }

    validate(c: AbstractControl): { [key: string]: any } {
        let v = c.value;
        let e = c.root.get(this.validateEqual);

        // subscribe to future changes in password
        e.valueChanges.subscribe((val: string) => {
                if (val != v) c.setErrors({validateEqual: false});
                else c.setErrors(null);
            }
        );

        if (e && v !== e.value) return {validateEqual: false};
        return null;
    }
}