/**
 * Provides basic toggle or "disclosure" functionality.
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
 * @class
 */
class Disclosure {

  /**
   * @member {Array}
   */
  contents;

  /**
   * @member {boolean}
   */
  defaultExpanded;

  /**
   * @member {Object}
   */
  defaults = {
    autoStart: true,
  };

  /**
   * @member {boolean}
   */
  enabled;

  /**
   * @member {boolean}
   */
  expanded;

  /**
   * @member {string}
   */
  name = 'disclosure';

  /**
   * @member {Object}
   */
  trigger;

  /**
   * Creates a new disclosure instance.
   *
   * @constructor
   */
  constructor(trigger, contents = undefined, settings = {}) {
    this.trigger = trigger;
    this.contents = this._getContents(contents);
    this.settings = {...this.defaults, ...settings};
    this.defaultExpanded = this.trigger.getAttribute('aria-expanded') === 'true';
    this.trigger.disclosure = this;
    this._init();
  }

  /**
   * Manages enabled/disabled state of disclosure.
   *
   * @param {boolean} enable
   *   Whether to enable or disable the disclosure.
   * @protected
   * @method
   */
  _control = (enable = true) => {
    const action = enable ? 'enable' : 'disable';

    if (enable) {
      this.trigger.addEventListener('click', this._handleClick);
      this.trigger.hidden = false;
    } else {
      this.trigger.removeEventListener('click', this._handleClick);
      this.trigger.hidden = true;
    }

    this._toggle(this.defaultExpanded);
    this.trigger.dispatchEvent(this._createEvent(action));
    this.enabled = enable;
  };

  /**
   * Creates a custom disclosure event.
   *
   * @return {Object}
   *   A custom event to be dispatched by the object.
   * @protected
   * @method
   */
  _createEvent = (type) => new CustomEvent(this.name, {
    bubbles: true,
    detail: {action: type}
  });

  /**
   * Ensures this.contents is an array, whatever was passed to the constructor.
   *
   * @param {(Object[]|Object|undefined)} contents
   *   The contents variable, if any, that was passed into the constructor. May
   *   be an Object (if it's the result of a call to .querySelectorAll() or to
   *   .querySelector()), an Object[] (if the constructor has been passed an
   *   array), or undefined if nothing at all has been passed in.
   * @return {Object[]} contentsList
   *   The array of elements to use as contents in the disclosure. If we've
   *   received a NodeList, we convert it to an array; if we've recieved an
   *   Element, we add it to an array; if we've received nothing at all, we
   *   add the HTML element immediately following this.trigger to an array.
   * @protected
   * @method
   */
  _getContents = (contents) => {
    let contentsList;

    if (typeof contents !== 'undefined') {
      contentsList = typeof contents[Symbol.iterator] === 'function'
        ? [...contents]
        : [contents]
    } else {
      contentsList = [this.trigger.nextElementSibling];
    }

    return contentsList;
  };

  /**
   * Handles click events on this.trigger.
   *
   * @protected
   * @method
   */
  _handleClick = () => this._toggle(!this.expanded);

  /**
   * Initializes interactivity.
   *
   * @protected
   * @method
   */
  _init = () => {
    try {
      if (this.settings.autoStart) {
        this.enable();
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Manages expanded/collapsed state of disclosure.
   *
   * @param {boolean} expand
   *   Whether to expand or collapse the disclosure.
   *
   * @protected
   * @method
   */
  _toggle = (expand = true) => {
    const action = expand ? 'expand' : 'collapse';
    this.trigger.dispatchEvent(this._createEvent(action));
    this.trigger.setAttribute('aria-expanded', expand);
    this.contents.forEach((content) =>
      content.setAttribute('data-disclosure-expanded', expand));
    this.expanded = expand;
  };

  /**
   * Collapses the disclosure.
   *
   * @public
   * @method
   */
  collapse = () => this._toggle(false);

  /**
   * Disables the disclosure.
   *
   * @public
   * @method
   */
  disable = () => this._control(false)

  /**
   * Enables the disclosure.
   *
   * @public
   * @method
   */
  enable = () => this._control()

  /**
   * Expands the disclosure.
   *
   * @public
   * @method
   */
  expand = () => this._toggle();

  /**
   * Returns enabled status of this disclosure.
   *
   * @return {boolean}
   *   The value of this.enabled.
   * @public
   * @method
   */
  isEnabled = () => this.enabled;

  /**
   * Returns expanded status of this disclosure.
   *
   * @return {boolean}
   *   The value of this.expanded.
   * @public
   * @method
   */
  isExpanded = () => this.expanded;

}
