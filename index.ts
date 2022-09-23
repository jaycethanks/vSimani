import type { Directive, DirectiveBinding } from 'vue';
import './style.css';

// 描述 value 传入的类型

interface DirectiveBindingValue {
  duration?: number;
  timingFunction?: string;
  delay?: number;
  direction?: string;
  iterationCount?: string;
  fillMode?: string;
}

let userCusAnimationList = {};

const vAnimate: Directive<HTMLElement, DirectiveBindingValue> = (
  el: HTMLElement,
  binding: DirectiveBinding<DirectiveBindingValue>,
  // binding: DirectiveBinding<DirectiveBindingValue>
) => {
  const { modifiers, value } = binding;
  const duration = value?.duration ?? 0.3;
  const timingFunction = value?.timingFunction ?? 'linear';
  const delay = value?.delay ?? 0.3;
  const direction = value?.direction ?? '';
  const iterationCount = value?.iterationCount ?? '';
  const fillMode = value?.fillMode ?? 'both';

  const animationOptions = ` ${duration}s ${timingFunction} ${delay}s ${iterationCount} ${direction} ${fillMode}`;
  const animationNameList = {
    scaleup: 'v-animate-scaleup',
    cleartoblur: 'v-animate-cleartoblur',
    fadein: 'v-animate-fadein',
    moveup: 'v-animate-moveup',
    moveupshort: 'v-animate-moveup-short',
    movefromleft: 'v-animate-movefromleft',
    movefromleftshort: 'v-animate-movefromleft-short',
    ...userCusAnimationList,
  };
  const generateAnimation = () => {
    Object.keys(modifiers).forEach((key) => {
      // TODO: fix the ts error !
      el.style.animation = animationNameList[key] + animationOptions;
    });
  };

  generateAnimation();
};

export const vSimani = {
  install: (app: App) => {
    app.directive('animate', vAnimate);
  },
};

export const vSimaniDirective = vAnimate;

export const registerAnimation = (data: { [x: string]: string }) => {
  userCusAnimationList = data;
};
