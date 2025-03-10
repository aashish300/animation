import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AnimationTextComponent} from '../common/animation-text/animation-text.component';
import {Router} from '@angular/router';
import {clearTimeout} from 'node:timers';
import {TimerComponent} from '../common/timer/timer.component';

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

  ngOnInit() {
    if(typeof window === 'undefined') return;
    this.interval = setTimeout(() => {
      this.route.navigate(['/dashboard']);
    },(this.time+1)*1000)
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
