import {ChangeDetectionStrategy, Component, forwardRef, OnInit, Optional} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-ref-select',
  templateUrl: './ref-select.component.html',
  styleUrls: ['./ref-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RefSelectComponent)
    }, {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => RefSelectComponent)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RefSelectComponent<T> extends MatFormFieldControl<T> implements OnInit, ControlValueAccessor {

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor(@Optional() private _ngControl: NgControl) {
    super();
  }

  ngOnInit() {
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  readonly autofilled: boolean;
  readonly controlType: string;

  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {
  }

  readonly stateChanges: Observable<void> = new BehaviorSubject(null);

  get ngControl(): NgControl | null {
    return this._ngControl;
  }
}
