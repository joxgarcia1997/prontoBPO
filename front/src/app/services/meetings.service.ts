import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserA } from '../models/UserA';
import { Meet } from '../models/Meet';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  
  API_URI = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getMeets(){
    return this.http.get(this.API_URI+'/meetings/all/');
  }

  getMeetings(id:string){
    return this.http.get(this.API_URI+'/meetings/'+id);
  }


  saveMet(meet : Meet){
    return this.http.post(this.API_URI+'/meetings', meet);
  }
  
  deleteMeet(id : number){
    return this.http.delete(this.API_URI+'/meetings/'+id);
  }

  getAvailables(data : UserA){
    return this.http.post(this.API_URI+'/meetings/availables', data);
  }

}
