import {Component, inject, OnDestroy, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {Router} from '@angular/router';
import {AnimationTextComponent} from '../common/animation-text/animation-text.component';
import {TimerComponent} from '../common/timer/timer.component';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    AnimationTextComponent,
    TimerComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {

  private route: Router = inject(Router);

  // protected animationContent = signal(['Webshop', 'manufacturing', 'retail', 'business finance']);
  protected animationContent = signal(['Webshop', 'manufacturing']);

  protected isTimerStart = signal(false);

  protected speed = {
    forward: 100,
    backward: 50
  }

  private interval: any;

  private platformId = inject(PLATFORM_ID);

  protected time = 10;

  startTimer(timer: any) {
    if (isPlatformBrowser(this.platformId) && timer) {
      this.isTimerStart.set(true);
        this.interval = setTimeout(() => {
          this.route.navigate(['/conversation']);
        }, (this.time + 1) * 1000)
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
