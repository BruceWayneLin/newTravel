declare module 'scrollmagic' {
    export const ScrollMagic: ScrollMagic.Static;
}

declare namespace ScrollMagic {


    interface Static {

        Controller: Controller.Instance;

        Scene: Scene.Instance;
    }

    namespace Controller {
        interface Instance {

            (): void;
        }
    }


    namespace Scene {

        interface Instance {

            /**
             * A Scene defines where the controller should react and how.
             */
            new(options: Scene.Options): Scene.Instance;

            /**
             * Define a css class modification while the scene is active.
    When the scene triggers the classes will be added to the supplied element and removed, when the scene is over. If the scene duration is 0 the classes will only be removed if the user scrolls back past the start position.
             * @param element A Selector targeting one or more elements or a DOM object that is supposed to be modified.
             * @param classes One or more Classnames (separated by space) that should be added to the element during the scene.
             */
            setClassToggle(element: string | HTMLElement, classes: string): Scene.Instance;

            /**
             * Add the scene to a controller.
             * @param controller The controller to which the scene should be added.
             */
            addTo(controller: Controller.Instance);

            /**
             * Add visual indicators for a ScrollMagic.Scene.
             */
            addIndicators(): Scene.Instance;
        }

        interface Options {
            /**
             * Selector or DOM object that defines the start of the scene. If undefined the scene will start right at the start of the page (unless an offset is set).
             */
            triggerElement: ElementType;



            /**
             *  Offset Value for the Trigger Position. If no triggerElement is defined this will be the scroll distance from the start of the page, after which the scene will start.
             */
            offset: OffsetType;
        }


        type ElementType = string | HTMLElement;
        type OffsetType = number;
    }
}
