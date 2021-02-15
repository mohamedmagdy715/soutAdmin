import {  Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AdminAuthService } from './services/admin-auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'soutAdmin';
  showSide : boolean  ;
  //@ViewChild ('sideBar')  sideBar : ElementRef | undefined;


  constructor(private adminAuth : AdminAuthService,
              private auth : AngularFireAuth) {
    this.showSide=false;
    console.log(this.showSide);
  }
  
  ngOnInit(): void {
  //   this.adminAuth.currentAdminName.subscribe(message => {
  //     //console.log(message);
  //    if (message != ''){
  //     this.showSide = true;
  //    }else{
  //     this.showSide = false;
  //    }
  //  })
  this.auth.onAuthStateChanged((admin)=>{
    if (admin){
      this.showSide = true;
    }
    else 
    this.showSide = false;
  })
  }
}
