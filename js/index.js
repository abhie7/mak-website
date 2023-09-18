$(document).ready(function () {
    var windowWidth = $(window).width();
    var mouseX = 0;
    var mouseY = 0;
    var bgX = 0;
    var bgY = 0;

    $('.page-back').mousemove(function (event) {
        mouseX = event.pageX;
        mouseY = event.pageY;

        // Calculate the new background position with an ease-in effect
        bgX = ((windowWidth / 2) - mouseX) * 0.2;
        bgY = ((window.innerHeight / 2) - mouseY) * 0.2;

        updateBackgroundPosition();
    });

    function updateBackgroundPosition() {
        // Apply the background position with a smooth transition
        $('.page-back').css('transition', 'transform 0.2s ease');
        $('.page-back').css('transform', `translate(${bgX}px, ${bgY}px)`);
    }

    // Reset the transition when the mouse leaves the element
    $('.page-back').mouseleave(function () {
        $('.page-back').css('transition', 'transform 0.3s ease-in-out');
        updateBackgroundPosition();
    });
});


document.addEventListener("DOMContentLoaded", function () {
    
    let elements = document.querySelectorAll(".text");
    
    elements.forEach((element) => {
        let innerText = element.innerText;
        element.innerText = "";
        
        let textContainer = document.createElement("div");
        textContainer.classList.add("block");
    
        for (let letter of innerText) {
            let span = document.createElement("span");
            span.innerText = letter.trim() === "" ? "\xa0": 
            letter;
            span.classList.add("letter");
            textContainer.appendChild(span);
        }
        element.appendChild(textContainer);
        element.appendChild(textContainer.cloneNode(true));
    });
    
    elements.forEach((element) => {
        element.addEventListener("mouseover", (e) => {
            element.classList.remove("play");
        });
    });
});
