const manhwaTemplate = document.querySelector("[manhwa-data]");
const manhwas = document.querySelector(".manhwas"); // Declare and initialize the variable `manhwas`

let manhwaData = [];

// Fetch JSON data from an external file (update the URL)
fetch('/db/manhwa.json')
    .then((response) => response.json())
    .then((data) => {
        // Handle the JSON data here
        manhwaData = data.map(manhwa => {
            const template = manhwaTemplate.content.cloneNode(true).children[0]
            const title = template.querySelector('[data-name]')
            const story = template.querySelector('[data-story-rating]')
            const art = template.querySelector('[data-art-rating]')
            const character = template.querySelector('[data-char-rating]')
            const overall = template.querySelector('[data-over-rating]')

            title.textContent = manhwa.title
            story.textContent = manhwa.story
            art.textContent = manhwa.art
            character.textContent = manhwa.character
            overall.textContent = manhwa.overall

            manhwas.appendChild(template)
            return {
                title: manhwa.title,
                story: manhwa.story,
                art: manhwa.art,
                character: manhwa.character,
                overall: manhwa.overall,
                image: manhwa.image
            }
        })

        // Initialize the preview element
        const preview = document.querySelector(".preview");
        const previewImg = document.querySelector(".preview-img");

        // Add a listener for the mousemove event
        window.addEventListener("mousemove", moveStuff);

        function moveStuff(e) {
            // Get the mouse position
            const mouseX = e.pageX;
            const mouseY = e.pageY;

            // Move the preview element to the mouse position
            preview.style.left = mouseX - preview.offsetWidth / 2 + "px";
            preview.style.top = mouseY - preview.offsetHeight / 2 + "px";

            // Get the manhwa element that the mouse is currently over
            const currentManhwaElement = document.elementFromPoint(mouseX, mouseY);

            // If the mouse is over a manhwa element, change the image in the preview element
            if (currentManhwaElement && currentManhwaElement.classList.contains('manhwa')) {
                const manhwaData = currentManhwaElement.dataset;

                // Get the image URL from the manhwa data
                const imageUrl = manhwaData.image;

                // Set the image in the preview element
                previewImg.src = imageUrl;
            }
        }
    })
    .catch((error) => {
        console.error('Error fetching JSON data:', error);
    });
