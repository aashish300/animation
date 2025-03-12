import {
  AfterViewChecked,
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

interface ChatType {
  question: string,
  answer: string
}

@Component({
  selector: 'app-conversation',
  imports: [
    AnimationTextComponent
  ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent implements OnInit, OnDestroy, AfterViewChecked {

  private route: Router = inject(Router);
  private animationService = inject(AnimationService);

  @ViewChild('wrapper') wrapper!: ElementRef;
  @ViewChild('answer') answer!: ElementRef;

  speed = {
    backward: 0,
    forward: 10
  }

  protected time = 10;

  private interval: any;

  private platformId = inject(PLATFORM_ID);

  protected chatList = ChatList;

  protected animatedChat = signal<ChatType[]>([]);

  ngOnInit() {
    this.animatedChat.set([this.chatList[0]]);
  }

  ngAfterViewChecked() {
    if(this.wrapper.nativeElement.scrollHeight >= this.wrapper.nativeElement.clientHeight && !this.animationService.isTimerStart()) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    try{
      this.wrapper.nativeElement.scrollTop = this.wrapper.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom', err);
    }
    this.wrapper.nativeElement.scrollTop = this.wrapper.nativeElement.scrollHeight+100;

  }

  nextAnimation(event: any, i : number) {
    if(i >= this.chatList.length-1) {
      this.animationService.count.set(this.time);
      this.animationService.isTimerStart.set(true);
      if(isPlatformBrowser(this.platformId)) {
        this.interval = setTimeout(() => {
          this.route.navigate(['/dashboard']);
        },(this.time+1)*1000)
      }
      return;
    }else {
      this.animatedChat.update((e: any) => [...e, this.chatList[i+1]]);
    }
    setTimeout(() => {
      this.scrollToBottom()
    },0)
  }

  ngOnDestroy() {
    this.animationService.isTimerStart.set(false);
    this.animationService.count.set(0);
    clearInterval(this.interval);
  }

}
