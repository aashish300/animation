import {Component, inject} from '@angular/core';
import {ActivatedRoute, ChildrenOutletContexts, Router, RouterOutlet} from '@angular/router';
import {slideInAnimation} from '../common/animation';
import {TimerComponent} from '../common/timer/timer.component';
import {AnimationService} from '../common/service/animation.service';

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

  protected animationService = inject(AnimationService);
  private route: Router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private contexts = inject(ChildrenOutletContexts);

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  updateRoute(route: boolean) {
    if(!route) return;
    if(this.route.url.includes('conversation')) {
      this.route.navigate(['/dashboard']);
    }else {
      this.route.navigate(['conversation'])
    }
  }
}
