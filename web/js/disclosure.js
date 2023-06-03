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
  enabled;

  /**
   * @member {boolean}
   */
  expanded;

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
   * Creates a custom disclosure event.
   *
   * @return {Object}
   *   A custom event to be dispatched by the object.
   * @protected
   * @method
   */
  _createEvent = (type) => null;

  /**
   * Collapses the disclosure.
   *
   * @public
   * @method
   */
  collapse = () => null;

  /**
   * Disables the disclosure.
   *
   * @public
   * @method
   */
  disable = () => null;

  /**
   * Enables the disclosure.
   *
   * @public
   * @method
   */
  enable = () => null;

  /**
   * Expands the disclosure.
   *
   * @public
   * @method
   */
  expand = () => null;

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
