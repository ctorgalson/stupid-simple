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
  _enabled;

  /**
   * @member {boolean}
   */
  _expanded;

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
    this.trigger.disclosure = this;
    console.log('Instantiated new Disclosure object.');
  }

  /**
   * Manages _enabled/disabled state of disclosure.
   *
   * @param {boolean} enable
   *   Whether to enable or disable the disclosure.
   * @protected
   * @method
   */
  _control = (enable = true) => {
    const action = enable ? 'enable' : 'disable';
    this.trigger.dispatchEvent(this._createEvent(action));
    this._enabled = enable;
  };

  /**
   * Creates a custom disclosure event.
   *
   * @return {Object}
   *   A custom event to be dispatched by the object.
   * @protected
   * @method
   */
  _createEvent = (type) => new CustomEvent(this.name, {detail: {action: type}});

  /**
   * Handles click events on this.trigger.
   *
   * @protected
   * @method
   */
  _handleClick = () => this._toggle(!this._expanded);

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
    this._expanded = expand;
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
   * Returns _enabled status of this disclosure.
   *
   * @return {boolean}
   *   The value of this._enabled.
   * @public
   * @method
   */
  isEnabled = () => this._enabled;

  /**
   * Returns expanded status of this disclosure.
   *
   * @return {boolean}
   *   The value of this._expanded.
   * @public
   * @method
   */
  isExpanded = () => this._expanded;

}
