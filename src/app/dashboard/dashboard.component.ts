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

  protected animationContent = signal(['Webshop', 'manufacturing', 'retail', 'business finance']);

  protected speed = {
    forward: 100,
    backward: 50
  }

  private interval: any;

  private platformId = inject(PLATFORM_ID);

  protected time = 10;

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)) {
      this.interval = setTimeout(() => {
        this.route.navigate(['/conversation']);
      },(this.time+1)*1000)
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
