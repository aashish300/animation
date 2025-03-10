import {Component, Input, OnDestroy, OnInit, signal} from '@angular/core';

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


  ngOnInit() {
    const timeArray: number[] | undefined = [];
    for(let i = 1; i <= this.time; i++) {
      timeArray.push(i);
    }

    this.interval = setInterval(() => {
      this.timer.set(<number>timeArray.pop());
    },1000)
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
