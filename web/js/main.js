(function() {

  const triggers = document.querySelectorAll('.latest-news__summary-toggle');
  const navToggle = document.querySelector('.nav__toggle');
  const lastFocusable = navToggle.nextElementSibling.querySelector('a:last-child');
  const breakpoint = window.matchMedia('(max-width: 52.625rem)');

  if (triggers) {
    triggers.forEach((trigger) =>
      new Disclosure(trigger, trigger.nextElementSibling));
  }

  if (navToggle) {
    /**
     * Enables/disables nav disclosure on matchMedia change event.
     *
     * @param {Object} event
     *   The event object passed in by the listener.
     */
    function handleChange(event) {
      if (event.matches) {
        navToggle.disclosure.enable()
      } else {
        navToggle.disclosure.disable();
      }
    }

    /**
     * Adds keydown event listener on disclosure expand, removes on collapse.
     *
     * @param {Object} event
     *   The event object passed in by the listener.
     */
    function handleDisclosure(event) {
      switch (event.detail.action) {
        case 'expand':
          window.addEventListener('keydown', handleKeydown);
          document.body.setAttribute('data-nav-expanded', '');
          break;

        case 'collapse':
          window.removeEventListener('keydown', handleKeydown);
          document.body.removeAttribute('data-nav-expanded');
          break;

        default:
      }
    }

    /**
     * Traps focus in *expanded* disclosure on [Tab], dismisses it on Esc].
     *
     * @param {Object} event
     *   The event object passed in by the listener.
     */
    function handleKeydown(event) {
      switch (event.keyCode) {
        // Tab: trap focus in expanded disclosure.
        case 9:
          if (document.activeElement === lastFocusable && !event.shiftKey) {
            event.preventDefault();
            navToggle.focus();
          } else if (document.activeElement === navToggle && event.shiftKey) {
            event.preventDefault();
            lastFocusable.focus();
          }
          break;

        // Esc: collapse expanded disclosure, return focus to toggle.
        case 27:
          navToggle.disclosure.collapse();
          navToggle.focus();
          break;

        default:
      }
    }

    // Add a data attribute to the body as a CSS target.
    document.body.dataset.jsEnabled = true;

    // Create the disclosure.
    new Disclosure(navToggle, undefined, {autoStart: false});

    // Add event listeners.
    breakpoint.addEventListener('change', handleChange);
    navToggle.addEventListener('disclosure', handleDisclosure);

    // Run initial responsiveness check.
    handleChange(breakpoint);
  }

})();
