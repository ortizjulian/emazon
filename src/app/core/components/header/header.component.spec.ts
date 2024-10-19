import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: { params: of({}) },
                },
            ],
            imports: [RouterModule]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should toggle isMenuOpen and add/remove active class on nav-links', () => {
        expect(component.isMenuOpen).toBe(false);
        component.toggleMenu();
        expect(component.isMenuOpen).toBe(true);
    });
});
