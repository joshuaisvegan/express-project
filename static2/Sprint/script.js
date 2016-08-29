(function() {

  var menu = document.getElementById('menu')
  var hamburger = document.getElementById('header2')
  var X = document.getElementById('X')

  hamburger.addEventListener('click', function() {
    menu.style.transform = 'translateX(-100%)';
    menu.style.transitionDuration = '.5s'
  })
  X.addEventListener('click', function() {
    menu.style.transform = 'translateX(100%)';
    menu.style.transitionDuration = "0s";

  })
  document.body.style.overflow = 'scroll';
})();
