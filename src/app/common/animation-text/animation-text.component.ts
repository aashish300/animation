import {Component, inject, Input, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

interface SpeedType {
  forward: number;
  backward: number;
}

@Component({
  selector: 'app-animation-text',
  imports: [],
  templateUrl: './animation-text.component.html',
  styleUrl: './animation-text.component.scss'
})
export class AnimationTextComponent implements OnInit {

  protected animatedElement = signal('');

  @Input() backward = false;
  @Input() speed!: SpeedType;
  @Input() content!: string | string[];
  @Input() loop = false;

  protected active = true;
  private platformId = inject(PLATFORM_ID);


  ngOnInit() {
    setTimeout(() => {
      if(isPlatformBrowser(this.platformId)) {
        this.animationLoop();
      }
    }, 0)
  }

  animationLoop() {
    const blinkEffect = (times: number, callback: any) => {
      let initial = 0;
      const interval = setInterval(() => {
        initial++;
        this.active = !this.active;
        if(initial >= times) {
          clearInterval(interval)
          callback();
        }
      },200)
    };

    let i = 0;
    const animationStep = () => {
      if (i < this.content.length) {
        const text = Array.isArray(this.content) ? this.content[i] : this.content;
        let el = 0;

        const step = () => {
          if (el < text.length) {
            this.animatedElement.update(e => e + text[el]);

            // Call the next frame after a delay
            setTimeout(() => {
              el++;
              requestAnimationFrame(step);
            }, this.speed.forward);
          } else {
            if (!this.backward) return;
            blinkEffect(8, () => {

              // After completing text, start removing characters
              let del = text.length - 1;
              const removeStep = () => {
                if (del >= 0) {
                  this.animatedElement.update(e => e.slice(0, -1));

                  setTimeout(() => {
                    del--;
                    requestAnimationFrame(removeStep);
                  }, this.speed.backward);
                } else {
                  // After removal, move to the next text
                  i++;
                  requestAnimationFrame(animationStep);
                }
              };

              requestAnimationFrame(removeStep);
            })
          }
        }

        requestAnimationFrame(step);
      } else {
        this.animationLoop();
      }
    };

    // Start the animation
    requestAnimationFrame(animationStep);
  }
}
