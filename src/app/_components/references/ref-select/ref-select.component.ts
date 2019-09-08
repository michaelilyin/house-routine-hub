import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';
import {MatSelect} from '@angular/material';

@Component({
  selector: 'app-ref-select',
  templateUrl: './ref-select.component.html',
  styleUrls: ['./ref-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RefSelectComponent),
      multi: true
    },
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => RefSelectComponent)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RefSelectComponent<T> extends MatFormFieldControl<T> implements OnInit, AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {

  @ViewChild("select", {read: MatSelect, static: true})
  public select: MatSelect;

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  readonly stateChanges: Subject<void> = new Subject();

  constructor() {
    super();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.select.stateChanges.subscribe(this.stateChanges);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.stateChanges.next();
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  writeValue(obj: T): void {
    this.select.writeValue(obj);
  }

  registerOnChange(fn: any): void {
    this.select.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    this.select.registerOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.select.setDisabledState(isDisabled);
  }

  readonly autofilled: boolean;
  readonly controlType: string;

  onContainerClick(event: MouseEvent): void {
    this.select.onContainerClick()
  }

  setDescribedByIds(ids: string[]): void {
    this.select.setDescribedByIds(ids);
  }
}
