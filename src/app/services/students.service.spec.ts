import { TestBed } from '@angular/core/testing';
import { StudentService } from './students.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
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


})
