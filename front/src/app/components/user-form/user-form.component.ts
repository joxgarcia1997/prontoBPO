import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { Meet } from 'src/app/models/Meet';

import { UsersService } from '../../services/users.service';
import { MeetingsService } from '../../services/meetings.service'

declare var toastr:any;


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @HostBinding('class') clases = 'row';

  meetings: any = [];

  user : User = {
    id : 0,
    nombre: '',
  };

  meet : Meet = {
    meeting_id: 0,
    meeting_time: '',
    free_time: '',
    user_id: 0
  };


  constructor(private meetService : MeetingsService, private userService : UsersService,private route : Router, private activaRoute : ActivatedRoute) { }

  ngOnInit() {
    this.getMettings();
  }

  getMettings(){
    const params = this.activaRoute.snapshot.params;
    if(params.id){
      this.userService.getUser(params.id).subscribe(
        res =>{
          this.user = res;
        },
        err => console.log(err),
      )
      
      this.meetService.getMeetings(params.id).subscribe(
        res => {
          this.meetings = res;
        },
        err => console.error(err),
      );
    }
  };

  addMeeting(event){    
    // Opciones para obtener el horario y la hora en la que se desocupa
    var timeAux = this.ampm(this.meet.meeting_time);
    var meetingT = new Date();
    
    meetingT.setHours(timeAux[0]);
    meetingT.setMinutes(timeAux[1]);
    meetingT.setMilliseconds(timeAux[2]);
    
    var freeT = new Date(meetingT.getTime() + 30*60000);

    this.meet.free_time =this.getFreeTime(freeT);
    
    // Preparo la data 
    delete this.meet.meeting_id;
    this.meet.user_id = this.user.id;

    this.meetService.saveMet(this.meet).subscribe(
      res => {
        this.Succes();
        this.getMettings();
      },
      err => console.error(err),
    )
    // Limpio input y focus
    var input = document.getElementById('time');
    input.value = '';
    input.focus();

    console.log(this.meet);


  }

  
  eraseMeet(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var idMeeting = idAttr.nodeValue;
    
    this.meetService.deleteMeet(idMeeting).subscribe(
      res => {
        this.info();
        this.getMettings();
      },
      err => console.error(err),
    )
  }

  getFreeTime(freeT){
    var hours = freeT.getHours();
    var minutes = freeT.getMinutes();
    var time = hours+":"+minutes;
    return time;
  }

  ampm(time) {
    if (time.value !== "") {
      var hours = time.split(":")[0];
      var minutes = time.split(":")[1];
      var displayTime = [
        hours,
        minutes,
        "00"
      ];
      return displayTime;
    }
  }

  
  Succes(){
    toastr.success("Succes!","New Meeting Created");
  }

  
  Warning(msg:string){
    toastr.warning("Succes!",msg);
  }

  
  info(){
    toastr.info("Info","User Erased");
  }


}
