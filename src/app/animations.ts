import {
  trigger,
  animate,
  transition,
  style,
  query
} from '@angular/animations';

// route animation
export const routeAnimation = trigger('routeAnimation', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0 })], { optional: true }),
    query(
      ':leave',
      [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter',
      [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],
      { optional: true }
    )
  ])
]);

export const fadeInLeftTrigger =  trigger('fadeInLeftTrigger',[
  transition(':enter', [
    style({
      opacity: 0.5,
      transform: 'translateX(-200px)'
    }), animate(500)
  ])
]);

export const fadeInTopTrigger =  trigger('fadeInTopTrigger',[
  transition(':enter', [
    style({
      opacity: 0.5,
      transform: 'translateY(-200px)'
    }), animate(500)
  ])
]);
