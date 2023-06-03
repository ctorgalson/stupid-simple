(function() {

  const triggers = document.querySelectorAll('.latest-news__summary-toggle');

  if (!triggers) {
    return;
  }

  triggers.forEach((trigger) => new Disclosure(trigger));

})();
