import {Component, inject} from '@angular/core';
import {ChildrenOutletContexts, RouterOutlet} from '@angular/router';
import {slideInAnimation} from '../common/animation';
import {TimerComponent} from '../common/timer/timer.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    TimerComponent
  ],
  animations: [
    slideInAnimation
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private contexts = inject(ChildrenOutletContexts);

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
