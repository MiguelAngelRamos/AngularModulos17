import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { IStudent } from "../interface/student";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly API_URL: string = environment.api;

  constructor(private http: HttpClient) {}

  getStudents():Observable<IStudent[]> {
    return this.http.get<IStudent[]>(`${this.API_URL}/students`);
  }

  getStudentById(id:number):Observable<IStudent> {
    return this.http.get<IStudent>(`${this.API_URL}/students/${id}`);
  }

}
