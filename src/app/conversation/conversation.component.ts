import {Component, inject, OnInit} from '@angular/core';
import {AnimationTextComponent} from '../common/animation-text/animation-text.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-conversation',
  imports: [
    AnimationTextComponent
  ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent implements OnInit {

  private route: Router = inject(Router);

  answer = 'It is a long established fact that a reader will be distracted by the readable\n' +
    '    content of a page when looking at its layout. The point of using Lorem Ipsum is\n' +
    '    that it has a more-or-less normal distribution of letters, as opposed to using '

  speed = {
    backward: 0,
    forward: 100
  }

  ngOnInit() {
    setTimeout(() => {
      this.route.navigate(['/dashboard']);
    },10000)
  }

}
