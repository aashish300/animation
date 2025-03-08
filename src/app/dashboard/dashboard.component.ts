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

  protected animatedElement = signal('');

  delayInterval = {
    add: 200,
    remove: 100
  };

  constructor() {
  }

  ngOnInit() {
    // this.animationLoop();
    setTimeout(() => {
      this.route.navigate(['/conversation']);
    },5000)
  }

  //  animationLoop() {
  //     let i = 0;
  //     const animationStep = () => {
  //       if (i < this.animationContent().length) {
  //         const text = this.animationContent()[i];
  //         let el = 0;
  //
  //         const step = () => {
  //           if (el < text.length) {
  //             this.animatedElement.update(e => e + text[el]);
  //
  //             // Call the next frame after a delay
  //             setTimeout(() => {
  //               el++;
  //               requestAnimationFrame(step);
  //             }, this.delayInterval.add);
  //           } else {
  //             // After completing text, start removing characters
  //             let del = text.length - 1;
  //             const removeStep = () => {
  //               if (del >= 0) {
  //                 this.animatedElement.update(e => e.slice(0, -1));
  //
  //                 setTimeout(() => {
  //                   del--;
  //                   requestAnimationFrame(removeStep);
  //                 }, this.delayInterval.remove);
  //               } else {
  //                 // After removal, move to the next text
  //                 i++;
  //                 requestAnimationFrame(animationStep);
  //               }
  //             };
  //
  //             requestAnimationFrame(removeStep);
  //           }
  //         };
  //
  //         requestAnimationFrame(step);
  //       } else {
  //         this.animationLoop()
  //       }
  //     };
  //
  //     // Start the animation
  //     requestAnimationFrame(animationStep);
  // }

}
