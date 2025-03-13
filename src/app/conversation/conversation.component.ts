import {AfterViewChecked, Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {AnimationTextComponent} from '../common/animation-text/animation-text.component';
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

  private animationService = inject(AnimationService);

  @ViewChild('wrapper') wrapper!: ElementRef;

  speed = {
    backward: 0,
    forward: 2
  }

  protected time = 10;

  private interval: any;


  protected chatList = ChatList;

  protected animatedChat = signal<ChatType[]>([]);

  ngOnInit() {
    setTimeout(() => {
    this.animatedChat.set([this.chatList[0]]);
    },500)
  }

  ngAfterViewChecked() {
    const element = this.wrapper.nativeElement;
    // const isAutoScrollEnabled = element.scrollTop + element.clientHeight >= element.scrollHeight - 50;
    if(element.scrollHeight >= element.clientHeight && !this.animationService.isTimerStart()) {
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
