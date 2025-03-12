import {
  AfterViewChecked, AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild
} from '@angular/core';
import {AnimationTextComponent} from '../common/animation-text/animation-text.component';
import {Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {ChatList} from '../constant/chat';
import {AnimationService} from '../common/service/animation.service';
import {animate, style, transition, trigger} from '@angular/animations';

interface ChatType {
  question: string,
  answer: string
}

@Component({
  selector: 'app-conversation',
  imports: [
    AnimationTextComponent
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent implements OnInit, OnDestroy, AfterViewChecked {

  private route: Router = inject(Router);
  private animationService = inject(AnimationService);

  @ViewChild('wrapper') wrapper!: ElementRef;

  speed = {
    backward: 0,
    forward: 2
  }

  protected time = 10;

  private interval: any;

  private platformId = inject(PLATFORM_ID);

  protected chatList = ChatList;

  protected animatedChat = signal<ChatType[]>([]);

  ngOnInit() {
    setTimeout(() => {
    this.animatedChat.set([this.chatList[0]]);
    },500)
  }

  ngAfterViewChecked() {
    if(this.wrapper.nativeElement.scrollHeight >= this.wrapper.nativeElement.clientHeight && !this.animationService.isTimerStart()) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    try{
      this.wrapper.nativeElement.scrollTo({
        top: this.wrapper.nativeElement.scrollHeight,
        behavior: 'smooth'
      });
    } catch (err) {
      console.error('Error scrolling to bottom', err);
    }
  }

  nextAnimation(event: any, i : number) {
    if(i >= this.chatList.length-1) {
      this.animationService.isTimerStart.set(true);
      this.animationService.count.set(this.time);
      if(isPlatformBrowser(this.platformId)) {
        // this.interval = setTimeout(() => {
        //   this.route.navigate(['/dashboard']);
        // },(this.time+.5)*1000)
      }
      return;
    }else {
      this.animatedChat.update((e: any) => [...e, this.chatList[i+1]]);
    }
  }

  ngOnDestroy() {
    this.animationService.isTimerStart.set(false);
    this.animationService.count.set(0);
    clearInterval(this.interval);
  }

}
