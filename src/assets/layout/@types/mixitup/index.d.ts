declare module 'mixitup' {
    export = mixitup;
}
declare const mixitup: MixitupStatic;

interface MixitupStatic<TElement extends Node = HTMLElement> {
    (selector: Mixitup.Selector, options: Mixitup.Options): Mixitup<TElement>;
}

interface Mixitup<TElement extends Node = HTMLElement> {

    /**
     * @selector Any valid CSS selector (i.e. '.category-a'), or the values 'all' or 'none'. The filter method also accepts a reference to single target element or a collection of target elements to show.
     */
    filter(selector: Mixitup.Selector);

    /**
     * @element a collection of target elements 
     */
    filter(element: HTMLElement[]);

    getState(): Mixitup.State;

    destroy(): void;
}

declare namespace Mixitup {
    type Selector = string;
    type Target = {};

    type State = {
        targets: HTMLElement[];
    };

    interface Options {
        selectors: {
            control: string;
        }
    }
}

