import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Report } from '../../models/report';
import { FireService } from '../../services/fire.service';
import { SoutplayerService } from '../../services/soutplayer.service';
import { Observable, Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { ReportBlockService } from '../../services/report-block.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild ('audio')    audio : ElementRef | undefined;
  @ViewChild ('slider')   slider : ElementRef | undefined;
  @ViewChild ('auddur')   auddur : ElementRef | undefined;
  @ViewChild ('audtime')  audtime : ElementRef | undefined;
  @ViewChild ('vol')      vol : ElementRef | undefined;
  @ViewChild ('volicon')  volicon : ElementRef | undefined;

  subs : Subscription[] =[];
  reports : Report[] = [];
  myimg : any[] = [];
  myaudio : any[] = [];
  meta: Observable<any> | undefined;


  constructor(private soutPlayer : SoutplayerService,
              private fire : FireService,
              private storage : AngularFireStorage,
              private report_block : ReportBlockService,
              private router : Router) {
   }

  ngOnInit(): void {
    this.subs.push(this.fire.getCollection('Reports').subscribe((resp)=>{
      this.reports = resp;

      this.reports.forEach(report => {
        // const ref = this.storage.refFromURL(report.image);
        // this.myimg.push(ref.getDownloadURL());
        this.myimg.push(report.image);
        // const ref2 = this.storage.refFromURL(report.audio);
        // this.myaudio.push(ref2.getDownloadURL());
        // this.meta = ref2.getMetadata();
        // this.meta.subscribe((resp)=>{
          
        // // console.log(resp);
        // })
      });
      
    }));


    ///////////////////////////playGround///////////////////
    // this.fire.getCollection('Users/Ouo7bBHraiMYfEO8asaBCNtKJGo2/bookmarks').subscribe((resp)=>{
    //   console.log(resp);
    // })
  }

  ngAfterViewInit(): void {

     this.soutPlayer.start(this.audio,this.slider,this.auddur,this.audtime,this.vol,this.volicon);

  }

  playAudio(){
    this.soutPlayer.playAudio(this.audio);
  }

  pauseAudio(){
    this.soutPlayer.pauseAudio(this.audio);
  }

  goToBlock(id : any){
    console.log(id);
    this.report_block.setId(id);
    this.router.navigate(['/block']);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }


}
