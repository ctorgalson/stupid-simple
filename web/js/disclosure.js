/**
 * Provides basic toggle or "disclosure" functionality.
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
 * @class
 */
class Disclosure {

  /**
   * @member {boolean}
   */
  defaultExpanded;

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
  constructor(trigger) {
    this.trigger = trigger;
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
      this.enable();
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
