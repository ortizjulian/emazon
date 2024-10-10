import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    })
      .compileComponents();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
