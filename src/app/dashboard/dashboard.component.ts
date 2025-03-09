import {Component, inject, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {AnimationTextComponent} from '../common/component/animation-text/animation-text.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    AnimationTextComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  private route: Router = inject(Router)

  protected animationContent = signal(['Webshop', 'manufacturing', 'retail', 'business finance']);

  protected speed = {
    forward: 300,
    backward: 100
  }

  constructor() {
  }

  ngOnInit() {
    setTimeout(() => {
      this.route.navigate(['/conversation']);
    },10000)
  }
}
