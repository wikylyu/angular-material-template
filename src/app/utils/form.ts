import { AbstractControl, FormGroup } from '@angular/forms';

export const validateNonEmptyString = (control: AbstractControl) => {
  if (!control.value || !control.value.trim()) {
    return { error: 'this field is required' };
  }
  return null;
};

export const validateArrayLength = (control: AbstractControl) => {
  if (!control.value || control.value.length === 0) {
    return { error: 'this field is required' };
  }
  return null;
};

export const validateFormGroup = (formGroup: FormGroup) => {
  for (const i of Object.keys(formGroup.controls)) {
    formGroup.controls[i].markAsDirty();
    formGroup.controls[i].updateValueAndValidity();
  }

  for (const i of Object.keys(formGroup.controls)) {
    if (!formGroup.controls[i].valid && !formGroup.controls[i].disabled) {
      return null;
    }
  }

  return formGroup.getRawValue();
};
