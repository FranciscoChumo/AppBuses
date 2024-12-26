import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IbusPage } from './ibus.page';

describe('IbusPage', () => {
  let component: IbusPage;
  let fixture: ComponentFixture<IbusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IbusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
