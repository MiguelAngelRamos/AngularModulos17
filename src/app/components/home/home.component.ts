import { Component } from "@angular/core";
import { IStudent } from "../../interface/student";
import { StudentService } from '../../services/students.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  public students!: IStudent[];

  constructor(private readonly studentService: StudentService,
              private router: Router) {}

  ngOnInit():void {
    this.studentService.getStudents().subscribe((students: IStudent[]) => {
      this.students = students;
      console.log(this.students);
    });
  }

  irStudent(id: number) {
    this.router.navigate(['/students', id]);
  }

}
