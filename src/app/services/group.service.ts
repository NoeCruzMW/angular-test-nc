import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Group } from '../models/Group';


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }


  getAllGroups():Observable<Group[]>{
    return this.http.get(`${this.baseUrl}/groups/noe_cruz`).pipe(map((res:any)=>res.data.groups))
  }

}
