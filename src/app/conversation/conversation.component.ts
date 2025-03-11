import {Component, inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {AnimationTextComponent} from '../common/animation-text/animation-text.component';
import {Router} from '@angular/router';
import {TimerComponent} from '../common/timer/timer.component';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-conversation',
  imports: [
    AnimationTextComponent,
    TimerComponent
  ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent implements OnInit, OnDestroy {

  private route: Router = inject(Router);

  answer = 'It is a long established fact that a reader will be distracted by the readable\n' +
    '    content of a page when looking at its layout. The point of using Lorem Ipsum is\n' +
    '    that it has a more-or-less normal distribution of letters, as opposed to using '

  speed = {
    backward: 0,
    forward: 100
  }

  protected time = 10;

  private interval: any;

  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)) {
      this.interval = setTimeout(() => {
        this.route.navigate(['/dashboard']);
      },(this.time+1)*1000)
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
