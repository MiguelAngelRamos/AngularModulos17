import {Component} from "@angular/core";
import {IStudent} from "../../interface/student";
import {StudentService} from "../../services/students.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
})
export class StudentComponent {
 student!: IStudent;
 id!: string;
 constructor(private readonly studentService: StudentService,
             private activatedRoute: ActivatedRoute) {
 }

 ngOnInit() {
   this.activatedRoute.params.subscribe(params =>{
     this.id = params['id'];
     this.studentService.getStudentById(Number(this.id))
          .subscribe((student: IStudent) => this.student= student);
   })
 }
}
