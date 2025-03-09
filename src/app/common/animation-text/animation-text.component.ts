import {Component, Input, OnInit, signal} from '@angular/core';

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


  delayInterval = {
    add: 200,
    remove: 100
  };

  ngOnInit() {
  }

  animationLoop() {

    let initial = 0;
    const blinkEffect = (times: number, callback: any) => {
      const interval = setInterval(() => {
        initial++
        this.active = !this.active
      },200)
      if(initial === times) {
        clearInterval(interval)
        callback();
      }
    };

    let i = 0;
    const animationStep = () => {
      if (i < this.content.length) {
        const text = this.content[i];
        let el = 0;

        const step = () => {
          if (el < text.length) {
            this.animatedElement.update(e => e + text[el]);

            // Call the next frame after a delay
            setTimeout(() => {
              el++;
              requestAnimationFrame(step);
            }, this.delayInterval.add);
          } else {
            if (!this.backward) return;
            blinkEffect(3, () => {

              // After completing text, start removing characters
              let del = text.length - 1;
              const removeStep = () => {
                if (del >= 0) {
                  this.animatedElement.update(e => e.slice(0, -1));

                  setTimeout(() => {
                    del--;
                    requestAnimationFrame(removeStep);
                  }, this.delayInterval.remove);
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
        this.animationLoop()
      }
    };

    // Start the animation
    requestAnimationFrame(animationStep);
  }
}
