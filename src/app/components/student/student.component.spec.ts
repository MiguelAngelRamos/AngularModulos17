import {ComponentFixture, TestBed } from "@angular/core/testing";
import { StudentComponent } from './student.component';
import {StudentService} from "../../services/students.service";
import {of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {IStudent} from "../../interface/student";
describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let mockStudentService: jasmine.SpyObj<StudentService>;
  let mockActiveRoute;

  beforeEach(() => {
    mockStudentService = jasmine.createSpyObj(['getStudentById']);

    mockActiveRoute = {
      params: of({id: '123'})
    }

    TestBed.configureTestingModule({
      declarations: [StudentComponent],
      providers: [
        { provide: StudentService, useValue: mockStudentService },
        { provide: ActivatedRoute, useValue: mockActiveRoute }
      ]
    });

    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get student id from route params and fetch student data', () => {
    const testStudent: IStudent = { id: 123, name: 'Catalina', age: 28};
    mockStudentService.getStudentById.and.returnValue(of(testStudent));
    fixture.detectChanges(); // ngOnInit

    expect(component.id).toBe('123');

    expect(mockStudentService.getStudentById).toHaveBeenCalledWith(123);

    expect(component.student).toEqual(jasmine.objectContaining(testStudent));


  });
});

