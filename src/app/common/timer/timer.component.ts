import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal, ViewChild
} from '@angular/core';
import {isPlatformServer} from '@angular/common';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  private changeDetectorRef = inject(ChangeDetectorRef);

  protected timer = signal(10);

  @Input() time: number = 0;
  @ViewChild('circle') circle!: any;

  private interval: any;

  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
  }

  ngAfterViewInit() {
    if(isPlatformServer(this.platformId)) return;
    const timeArray: number[] | undefined = [];
    for(let i =   1; i <= this.time; i++) {
      timeArray.push(i);
    }

    const initalTime = this.timer();

    const strokeLength = this.circle.nativeElement.getTotalLength();
    this.circle.nativeElement.style.strokeDasharray = strokeLength;
    this.interval = setInterval(() => {
      this.timer.set((<number>timeArray.pop()));
      const progress = (this.timer()/initalTime);
      if(!isNaN(progress)) {
        this.circle.nativeElement.style.strokeDashoffset = strokeLength - progress*strokeLength;
        this.changeDetectorRef.detectChanges();
      }
    },1000);
  }

  ngOnChanges() {

  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
