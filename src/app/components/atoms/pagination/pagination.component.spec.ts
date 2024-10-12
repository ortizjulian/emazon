import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pagesToShow correctly', () => {
    component.totalPages = 10;
    component.currentPage = 1;
    component.setPagesToShow();
    expect(component.pagesToShow).toEqual([1, 2, 3, 4, 5]);
  });

  it('should show total pages when hits end correctly', () => {
    component.totalPages = 10;
    component.currentPage = 10;
    component.setPagesToShow();
    expect(component.pagesToShow).toEqual([6, 7, 8, 9, 10]);
  });

  it('should emit pageChange when onPageChange is called', () => {
    jest.spyOn(component.pageChange, 'emit');
    component.totalPages = 5;
    component.onPageChange(2);
    expect(component.currentPage).toBe(2);
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should not emit pageChange if page is out of range', () => {
    jest.spyOn(component.pageChange, 'emit');
    component.totalPages = 5;

    component.onPageChange(0);
    expect(component.currentPage).toBe(1);
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('should change to next page', () => {
    component.totalPages = 5;
    component.currentPage = 1;
    component.nextPage();
    expect(component.currentPage).toBe(2);
  });

  it('should not change to next page if already on the last page', () => {
    component.totalPages = 5;
    component.currentPage = 5;
    component.nextPage();
    expect(component.currentPage).toBe(5);
  });

  it('should change to previous page', () => {
    component.totalPages = 5;
    component.currentPage = 3;
    component.previousPage();
    expect(component.currentPage).toBe(2);
  });

  it('should not change to previous page if already on the first page', () => {
    component.totalPages = 5;
    component.currentPage = 1;
    component.previousPage();
    expect(component.currentPage).toBe(1);
  });
});
