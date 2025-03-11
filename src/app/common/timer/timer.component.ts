import {Component, inject, Input, OnDestroy, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {isPlatformServer} from '@angular/common';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit, OnDestroy {

  @Input() time: number = 0;

  protected timer = signal(0);

  private interval: any;

  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if(isPlatformServer(this.platformId)) return;
    const timeArray: number[] | undefined = [];
    for(let i =   1; i <= this.time; i++) {
      timeArray.push(i);
    }

     this.interval = setInterval(() => {
      this.timer.set((<number>timeArray.pop()))
    },1000)
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
