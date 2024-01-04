import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from './home.component';
import { StudentService } from "../../services/students.service";
import {RouterTestingModule} from "@angular/router/testing";
import {IStudent} from "../../interface/student";
import {of} from "rxjs";
import {Router} from "@angular/router";


describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let studentServiceMock: jasmine.SpyObj<StudentService>;

  let router: Router;

  beforeEach(async () => {
    studentServiceMock = jasmine.createSpyObj('StudentService', ['getStudents'])

    await TestBed.configureTestingModule( {
      declarations: [HomeComponent],
      imports: [RouterTestingModule],
      providers: [ { provide: StudentService, useValue: studentServiceMock}]
    }).compileComponents();
  });

  beforeEach(()=> {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getStudents on StudentService', () => {
    const students: IStudent[] = [{id: 1, name: 'Sofia', age: 27}];
    studentServiceMock.getStudents.and.returnValue(of(students));
    fixture.detectChanges();
    expect(studentServiceMock.getStudents).toHaveBeenCalled();
  });

  it('should render students', () => {
    const students: IStudent[] = [{id: 1, name: 'Sofia', age: 27}];
    studentServiceMock.getStudents.and.returnValue(of(students));
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tbodyElement = compiled.querySelector('table tbody');
    expect(tbodyElement).not.toBeNull();
    expect(tbodyElement?.textContent).toContain('Sofia');
    // expect(compiled.querySelector('table tbody').textContent).toContain('Sofia');
  });

  it('should navigate to student detail on Student', () => {
    const studentId:number = 1;
    const navigateSpy = spyOn(router, 'navigate');

    component.irStudent(studentId);

    expect(navigateSpy).toHaveBeenCalledWith(['/students', studentId]);

  });

  it('should  call irStudent on button click', async () => {

    const students: IStudent[] = [{id: 1, name: 'Sofia', age: 27}];
    studentServiceMock.getStudents.and.returnValue(of(students));
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      const button = fixture.nativeElement.querySelector('button.btn-success');
      expect(button).not.toBeNull();
      const studentSpy = spyOn(component, 'irStudent');
      button.click();
      expect(studentSpy).toHaveBeenCalledWith(1);
    })

  });

});
