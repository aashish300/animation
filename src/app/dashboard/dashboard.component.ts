import {Component, inject, OnDestroy, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {AnimationTextComponent} from '../common/animation-text/animation-text.component';
import {isPlatformBrowser} from '@angular/common';
import {AnimationService} from '../common/service/animation.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    AnimationTextComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {

  private animationService = inject(AnimationService);

  protected animationContent = signal(['Webshop', 'manufacturing', 'retail', 'business finance']);

  protected speed = {
    forward: 100,
    backward: 50
  }

  private interval: any;

  private platformId = inject(PLATFORM_ID);

  protected time = 10;

  startTimer(timer: any) {
    if (isPlatformBrowser(this.platformId) && timer) {
      this.animationService.isTimerStart.set(true);
      this.animationService.count.set(this.time);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.animationService.isTimerStart.set(false);
    this.animationService.count.set(0);
    clearInterval(this.interval);
  }
}
