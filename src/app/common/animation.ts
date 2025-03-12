import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('dashboardPage <=> chatPage', [
    style({ position: 'relative' }),

    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 0
      })
    ], { optional: true }),

    query(':enter', [
      style({ transform: 'translateX(-100%)', opacity: 0 })
    ], { optional: true }),

    query(':leave', animateChild(), { optional: true }),

    group([
      query(':leave', [
        animate('400ms ease-in-out', style({ transform: 'translateX(100%)', opacity: 0 }))
      ], { optional: true }),

      query(':enter', [
        animate('500ms ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ], { optional: true }),
    ]),
  ]),

  transition('* <=> *', [
    style({ position: 'relative' }),

    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 0
      })
    ], { optional: true }),

    query(':enter', [
      style({ transform: 'translateX(-100%)', opacity: 0 })
    ], { optional: true }),

    query(':leave', animateChild(), { optional: true }),

    group([
      query(':leave', [
        animate('300ms ease-in-out', style({ transform: 'translateX(100%)', opacity: 0 }))
      ], { optional: true }),

      query(':enter', [
        animate('500ms ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ], { optional: true }),

      query('@*', animateChild(), { optional: true })
    ]),
  ])
]);
