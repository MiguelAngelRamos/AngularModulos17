import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from './home.component';
import { StudentService } from "../../services/students.service";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { IStudent } from '../../interface/student';

describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStudentsService: any;
  let mockRouter: any;

  beforeEach(() => {
    mockStudentsService = { getStudents: jasmine.createSpy('getStudents').and.returnValue(of([]))};
    mockRouter = { navigate: jasmine.createSpy('navigate')};

    TestBed.configureTestingModule( {
      declarations: [HomeComponent],
      providers: [
        {provide: StudentService, useValue: mockStudentsService},
        {provide: Router, useValue: mockRouter}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should call getCharacters on ngOnInit', () => {
    // Test para verificar que se llama a getCharacters en ngOnInit.
    expect(mockStudentsService.getStudents).toHaveBeenCalled();
    // Verifica que el método getCharacters del servicio mock ha sido llamado.
  });
  it('should display students', () => {

    const testStudents: IStudent[] = [
      {id: 1, name: 'Student A', age: 20},
      {id: 2, name: 'Student B', age: 22},
    ];

    mockStudentsService.getStudents.and.returnValue(of(testStudents));
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    // HTML

    expect(compiled.querySelector('table').textContent).toContain('Student A');
    expect(compiled.querySelector('table').textContent).toContain('Student B');


  })
});
