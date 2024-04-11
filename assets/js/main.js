!(function($) {
  "use strict";

  // Nav Menu
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    // Check if the clicked link is within the same page
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);

      // Check if the target section exists
      if (target.length) {
        e.preventDefault();

        // Update active state for menu items
        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        // Handle special case for the header section
        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          return;
        }


        // Toggle header class and show target section
        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
          setTimeout(function() {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');
          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
          
        }

        // Close mobile navigation if active
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;
      }
    }
  });


  // Nav Menu Blur Effect
  const header = document.getElementById('header');

  document.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      header.classList.add('blurry');
      header.classList.remove('transparent');
    } else {
      header.classList.add('transparent');
      header.classList.remove('blurry');
    }
  });


  //white dot animation
  $(document).ready(function () {
    const cursorDot = $('<div class="cursor-dot"></div>').appendTo('body');
    let isHovering = false;
    let mouseX = 0;
    let mouseY = 0;

    function updateCursorPos(x, y) {
      if (!isHovering) {

        const currentX = parseInt(cursorDot.css('left'), 10) || 0;
        const currentY = parseInt(cursorDot.css('top'), 10) || 0;

        const targetX = x;
        const targetY = y;

        const deltaX = targetX - currentX;
        const deltaY = targetY - currentY;

        const newX = currentX + deltaX;
        const newY = currentY + deltaY;



        // Use setTimeout for the delay
        setTimeout(() => {
          cursorDot.css({
            left: newX,
            top: newY
          });
        }, 0);
        
      }
    }

    function handleMouseMove(e) {
      mouseX = e.pageX;
      mouseY = e.pageY;

      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      const adjustedX = mouseX - scrollX;
      const adjustedY = mouseY - scrollY;

      requestAnimationFrame(() => {
        updateCursorPos(adjustedX, adjustedY);
      });
    }

    $(document).on('mousemove', handleMouseMove);

    const fadeElements = $('.Title-anim, .about, .content, .cards');
    fadeElements.on({
      'mouseenter': function () {
        cursorDot.stop().fadeTo(200, 0);
      },
      'mouseleave': function () {
        cursorDot.stop().fadeTo(200, 1);
      }
    });
  });






  // Activate/show sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      setTimeout(function() {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
      }, 350);
    }
  }





  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    // Toggle mobile navigation
    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    // Close mobile navigation on click outside
    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }







  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox();
  });





  
})(jQuery);



// Title Animation Function
function spanFactory(word) {
  let applyClass = (letter) =>
      /[A-Z]/.test(letter) ? ' class="title-el"' : ' class="title-el"';
  return [...word]
      .map((letter) => `<span${applyClass(letter)}>${letter}</span>`)
      .join("");
}
const titleAnim = document.querySelectorAll(".Title-anim");
titleAnim.forEach((titleSingle, i) => {
  titleSingle.innerHTML = spanFactory(titleSingle.textContent);

  titleSingle.addEventListener("mouseover", () => {
    let singleSpan = titleSingle.getElementsByTagName("span");

    // Animate title letters on mouseover
    for (let i = 0; i < singleSpan.length;
      i++) {
        setTimeout(() => {
          singleSpan[i].classList.add("Title-anim-forward");
        }, 20 * i);
      }
    });

    titleSingle.addEventListener("mouseleave", () => {
      let singleSpan2 = titleSingle.querySelectorAll("span");

      // Reverse animation on mouseleave
      for (let k = singleSpan2.length - 1; k >= 0; k--) {
        setTimeout(() => {
          singleSpan2[k].classList.remove("Title-anim-forward");
        }, 20 * k);
      }
    });
  });



//Cards in Skills
const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");

const applyOverlayMask = (e) => {
  const overlayEl = e.currentTarget;
  const x = e.pageX - cardsContainer.offsetLeft;
  const y = e.pageY - cardsContainer.offsetTop;

  overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};


const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const cardIndex = cards.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;

    if (cardIndex >= 0) {
      overlay.children[cardIndex].style.width = `${width}px`;
      overlay.children[cardIndex].style.height = `${height}px`;
    }
  });
});

const initOverlayCard = (cardEl) => {
  const overlayCard = document.createElement("div");
  overlayCard.classList.add("card");
  overlay.append(overlayCard);
  observer.observe(cardEl);
};

cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", applyOverlayMask);





//Contact Form
function clearForm() {
  document.getElementById("contactForm").reset();
}

function submitForm() {
  var form = document.getElementById("contactForm");
  var formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response as needed
    console.log(data);
    alert("Thanks for your message!");
  })
  .catch(error => {
    // Handle errors
    console.error("Error:", error);
  });
}


//Animated Blobs


