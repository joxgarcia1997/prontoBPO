import { Component, OnInit, HostBinding } from '@angular/core';

import { User } from 'src/app/models/User';
import { UserA } from 'src/app/models/UserA';

import { UsersService } from '../../services/users.service';
import { MeetingsService  } from '../../services/meetings.service';

declare var toastr:any;

import { $ } from 'protractor';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  @HostBinding('class') clases = 'row';
  users: any = [];
  usersA : any = [];
  meetings: any = [];

  available: UserA = {
    start : '',
    end : ''
  }
  user : User = {
    id : 0,
    nombre: '',
  };

  edit : boolean = false;

  constructor(private userService : UsersService, private meet : MeetingsService) { }

  ngOnInit() {
    this.getUsers();
    this.getAllMeetings();
  }

  getAllMeetings(){
    this.meet.getMeets().subscribe(
      res => {
        this.meetings = res;
      },
      err => console.log(err),
    )
  }

  getUsers(){
    this.userService.getUsers().subscribe(
      res => {
        this.users = res;
      },
      err => console.error(err),
    );
  };


  deleteUser(id : string){
    this.userService.deleteUser(id).subscribe(
      res => {
        console.log(res);
        this.getUsers();
        this.info();
        //this.getAvailableUsers();
      },
      err => console.error(err),
    )
  }

  saveNewUser(){
    delete this.user.id;
    this.userService.saveUser(this.user).subscribe(
      res => {
        if(res.status != "error"){
          this.Succes();

        }else{
          this.Warning("User Name Already in Use");
        }
        this.getUsers();
        var input = document.getElementById('nameInput');
        input.value = '';
        input.focus();
      },
      err => {
        console.log("error");
      }
    )
  }

  getAvailableUsers(){
    this.meet.getAvailables(this.available).subscribe(
      res => {
        this.usersA = res;
      },
      err => {
        console.log("error");
      }  
    )
  }

  Succes(){
    toastr.success("Succes!","New User Created");
  }

  
  Warning(msg:string){
    toastr.warning("Warning!",msg);
  }

  
  info(){
    toastr.info("Info","Meeting Erased");
  }
}
