document.addEventListener('DOMContentLoaded', () => {
initFlickitySlider();
})


$(document).ready(() => {
 var scroll = {
        stop: function() {
            // Disable scroll by setting 'overflow' to 'hidden' on the body
            $('body').css('overflow', 'hidden');
        },
        start: function() {
            // Enable scroll by resetting 'overflow' on the body
            $('body').css('overflow', '');
        }
    };

  $('.hamburger').click(function () {
    if ($('.nav-modal, .modal-background').hasClass('active')) {
        $('.nav-modal, .modal-background').removeClass('active');
        $('.nav-wrapper').removeClass('active');  // Update hamburger bars to closed state
        scroll.start();
    } else {
        $('.nav-modal, .modal-background').addClass('active');
        $('.nav-wrapper').addClass('active');  // Update hamburger bars to open state
        scroll.stop();
    }
});

$(document).keydown(function (e) {
    if (e.keyCode == 27) {  // Check for the Escape key
        if ($('.nav-modal').hasClass('active')) {
            $('.nav-modal, .modal-background').removeClass('active');
            $('.nav-wrapper').removeClass('active');  // Reset the hamburger bars
            scroll.start();
        }
    }
});

// Event handler for clicking the mobile background
$('.modal-background').click(function () {
    if ($('.nav-modal').hasClass('active')) {
        $('.nav-modal, .modal-background').removeClass('active');
        $('.nav-wrapper').removeClass('active');  // Reset the hamburger bars
        scroll.start();
    }
});

});


/**
 * Flickity Slider
 */
function initFlickitySlider() {

    // Source
    // https://flickity.metafizzy.co/

    // Slider Row

    $('.single-flickity-slider').each(function (index) {

        var sliderIndexID = 'flickity-slider-id-' + index;
        $(this).attr('id', sliderIndexID);

        var sliderThis = $(this);

        var flickitySliderMain = document.querySelector('#' + sliderIndexID + ' .flickity-carousel');

        var noDrag = window.matchMedia("(min-width: 1201px)").matches;

        var flickityMain = sliderThis.find('.flickity-carousel').flickity({
            // options
            draggable: !noDrag,
            watchCSS: true,
            contain: true,
            wrapAround: false,
            dragThreshold: 10,
            prevNextButtons: false,
            pageDots: false,
            cellAlign: 'left',
            selectedAttraction: 0.015,
            friction: 0.25,
            percentPosition: true,
            freeScroll: true,
            on: {
                'dragStart': () => {
                    flickityMain.css("pointer-events", "none");
                },
                'dragEnd': () => {
                    flickityMain.css("pointer-events", "auto");
                },
                change: function () {
                    updatePagination();
                }
            }
        });
        
        

        // Flickity instance
        var flkty = flickityMain.data('flickity');

        // previous
        var prevButton = sliderThis.find('.flickity-btn-prev').on('click', function () {
            flickityMain.flickity('previous');;
        });
        // next
        var nextButton = sliderThis.find('.flickity-btn-next').on('click', function () {
            flickityMain.flickity('next');
        });

        // Get the amount of columns variable and use to calc last slide
        var inviewColumns = window.getComputedStyle(flickitySliderMain).getPropertyValue('--columns');

        function updatePagination() {

            // enable/disable previous/next buttons
            if (!flkty.cells[flkty.selectedIndex - 1]) {
                prevButton.attr('disabled', 'disabled');
                nextButton.removeAttr('disabled'); // <-- remove disabled from the next
            } else if (!flkty.cells[flkty.selectedIndex + parseInt(inviewColumns)]) {
                nextButton.attr('disabled', 'disabled');
                prevButton.removeAttr('disabled'); //<-- remove disabled from the prev
            } else {
                prevButton.removeAttr('disabled');
                nextButton.removeAttr('disabled');
            }
        }
    });

}
