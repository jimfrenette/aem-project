import { getCookie, setCookie } from './modules/cookie';

// Example of how a component should be initialized via JavaScript

(function() {
    "use strict";

    // Best practice:
    // For a good separation of concerns, don't rely on the DOM structure or CSS selectors,
    // but use dedicated data attributes to identify all elements that the script needs to
    // interact with.
    var selectors = {
        self:      '[data-cmp-is="message"]',
        text:      '[data-cmp-hook-message="text"]'
    };

    function Message(config) {

        const COLLAPSE_CLASS = 'collapse';

        config.element.text = config.element.querySelector(selectors.text);
        config.element.close = config.element.querySelector('button');

        const COOKIE = config.element.text.textContent.trim();
        const COOKIE_NAME = config.element.getAttribute('data-cmp-id');
        const CURRENT_COOKIE = getCookie(COOKIE_NAME);

        function close() {
            const days = parseInt(config.element.getAttribute('data-days-hidden')) || 3;
            setCookie(COOKIE_NAME, COOKIE, days);
            config.element.classList.add(COLLAPSE_CLASS);
        }

        function init(config) {

            // Best practice:
            // To prevents multiple initialization, remove the main data attribute that
            // identified the component.
            config.element.removeAttribute("data-cmp-is");

            if (console && console.log) {
                console.log(
                    "Message component is loaded"
                );
            }

            if (!CURRENT_COOKIE || CURRENT_COOKIE !== COOKIE) {
                config.element.classList.remove(COLLAPSE_CLASS);
            }

            config.element.close.addEventListener("click", close);
        }

        if (config && config.element) {
            init(config);
        }
    }

    // Best practice:
    // Use a method like this mutation obeserver to also properly initialize the component
    // when an author drops it onto the page or modified it with the dialog.
    function onDocumentReady() {
        var elements = document.querySelectorAll(selectors.self);
        for (var i = 0; i < elements.length; i++) {
            new Message({ element: elements[i] });
        }

        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        var body             = document.querySelector("body");
        var observer         = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // needed for IE
                var nodesArray = [].slice.call(mutation.addedNodes);
                if (nodesArray.length > 0) {
                    nodesArray.forEach(function(addedNode) {
                        if (addedNode.querySelectorAll) {
                            var elementsArray = [].slice.call(addedNode.querySelectorAll(selectors.self));
                            elementsArray.forEach(function(element) {
                                new Message({ element: element });
                            });
                        }
                    });
                }
            });
        });

        observer.observe(body, {
            subtree: true,
            childList: true,
            characterData: true
        });
    }

    if (document.readyState !== "loading") {
        onDocumentReady();
    } else {
        document.addEventListener("DOMContentLoaded", onDocumentReady);
    }

}());
