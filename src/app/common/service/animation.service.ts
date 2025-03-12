import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AnimationService {
  public isTimerStart = signal(false);
  public count = signal(0);
}
