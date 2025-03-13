import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { AnimationTextComponent } from '../common/animation-text/animation-text.component';
import { isPlatformBrowser } from '@angular/common';
import { AnimationService } from '../common/service/animation.service';

@Component({
  selector: 'app-dashboard',
  imports: [AnimationTextComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export default class DashboardComponent implements OnDestroy {
  private animationService = inject(AnimationService);

  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  protected readonly animationContent = [
    'Webshop',
    'manufacturing',
    'retail',
    'business finance',
  ];

  protected speed = {
    forward: 100,
    backward: 50,
  };

  private interval: any;

  protected time = 10;

  startTimer(timer: any) {
    if (this.isBrowser && timer) {
      this.animationService.isTimerStart.set(true);
      this.animationService.count.set(this.time);
    }
  }

  ngOnDestroy() {
    this.animationService.isTimerStart.set(false);
    this.animationService.count.set(0);
    clearInterval(this.interval);
  }
}
