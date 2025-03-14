import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  signal,
  ViewChild
} from '@angular/core';
import {isPlatformServer} from '@angular/common';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit, OnDestroy, AfterViewInit {

  private changeDetectorRef = inject(ChangeDetectorRef);

  protected timer = signal(10);

  @Input() time: number = 0;
  @ViewChild('circle') circle!: any;

  @Output() isTimerComplete = new EventEmitter<boolean>();

  private interval: any;


  private platformId = inject(PLATFORM_ID);

  private isServer = isPlatformServer(this.platformId);

  ngOnInit() {
  }

  ngAfterViewInit() {
    if(this.isServer) return;
    const timeArray: number[] | undefined = [];
    for(let i =   0; i <= this.time; i++) {
      timeArray.push(i);
    }

    const initialTime = this.timer();

    const strokeLength = this.circle.nativeElement.getTotalLength();
    this.circle.nativeElement.style.strokeDasharray = strokeLength;

    const updateTimer = () => {
      this.timer.set((<number>timeArray.pop()));
      const progress = (this.timer()/initialTime);
      if(!isNaN(progress)) {
        this.circle.nativeElement.style.strokeDashoffset = strokeLength - progress*strokeLength;
        if(strokeLength === strokeLength-progress*strokeLength) {
          setTimeout(() => {
            this.isTimerComplete.emit(true);
          },1000)
        }
        this.changeDetectorRef.detectChanges();
      }
    };

    updateTimer();
    this.interval = setInterval(updateTimer, 1000);

  }


  ngOnDestroy() {
    clearInterval(this.interval);
  }
}

