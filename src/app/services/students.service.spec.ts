import { TestBed } from '@angular/core/testing';
import { StudentService } from './students.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { IStudent } from '../interface/student';
import { environment } from '../../environments/environment';
describe('StudentService', () => {
  // variable para mantener una instancia del servicio
  let service: StudentService;
  // variable para el controlador que permite manejar las solicitudes HTTP "simuladas"
  let httpTestingController: HttpTestingController;

 beforeEach(() => {
  // Se ejecuta antes de cada prueba
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [StudentService]
  });

  service = TestBed.inject(StudentService);
  httpTestingController = TestBed.inject(HttpTestingController);
 });

 afterEach(() => {
  // Se ejecuta despues de cada prueba
  httpTestingController.verify(); // Verifica que no haya solicitudes HTTP pendientes
 });

 //* Test Unitarios

 it('getStudents should return an array of students', () => {

  const testStudents: IStudent [] = [
    { id: 1, name: 'Student A', age: 20 },
    { id: 2, name: 'Student B', age: 22 },
  ];

  service.getStudents().subscribe( (students:IStudent[]) => {
    //* Verificamos que la respuesta del servicio coincida con los datos de prueba
    expect(students).toEqual(testStudents);
  });

  const req: TestRequest = httpTestingController.expectOne(environment.api + '/students');
  expect(req.request.method).toEqual('GET');
  req.flush(testStudents);

 });

 it('getStudentById should return a single student', () => {
  const testStudent: IStudent = { id: 1, name: 'Student A', age: 20};

  service.getStudentById(1).subscribe((student: IStudent) => {
    expect(student).toEqual(testStudent);
  });

  const req: TestRequest = httpTestingController.expectOne(environment.api + '/students' + '/1');
  expect(req.request.method).toEqual('GET');
  req.flush(testStudent);

 });


})
