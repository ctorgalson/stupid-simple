(function() {

  const triggers = document.querySelectorAll('.latest-news__summary-toggle');

  if (!triggers) {
    return;
  }

  window.addEventListener('disclosure', (event) => console.log(event.detail.action, event.target));

  triggers.forEach((trigger) => new Disclosure(trigger));

})();
