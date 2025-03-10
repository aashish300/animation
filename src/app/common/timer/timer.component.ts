import {Component, Input, OnInit, signal} from '@angular/core';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit {

  @Input() time: number = 0;

  protected timer = signal(0);


  ngOnInit() {
    const timeArray: number[] | undefined = [];
    for(let i = 1; i <= this.time; i++) {
      timeArray.push(i);
    }

    const interval = setInterval(() => {
      this.timer.set(<number>timeArray.pop());
      if(timeArray.length <= 0) {
        clearInterval(interval);
      }
    },1000)
  }

}
