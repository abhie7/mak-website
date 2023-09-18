// Fetch JSON data from an external file (update the URL)
fetch('/db/manhwa.json')
    .then((response) => response.json())
    .then((jsonData) => {
        // Handle the JSON data here

        const projectsContainer = document.querySelector('.projects');
        const previewImg = document.querySelector('.preview-img');

        jsonData.forEach((projectData, index) => {
            const project = document.createElement('div');
            project.classList.add('project');
            project.id = `p${index + 1}`;

            const title = document.createElement('div');
            title.classList.add('client');
            title.innerHTML = `<p>${projectData.title}</p>`;
            project.appendChild(title);

            // Create and set other project details (story, art, character, overall)
            // You can create elements similar to 'title' for other details

            projectsContainer.appendChild(project);
        });

        Array.from(projectsContainer.children).forEach((project) => {
            project.addEventListener('mousemove', moveProject);
            project.addEventListener('mouseenter', () => moveProjectImg(project));
            project.addEventListener('mouseleave', () => resetProjectImg());
        });
    })
    .catch((error) => {
        console.error('Error fetching JSON data:', error);
    });

function moveProjectImg(project) {
    const projectDataId = project.id.slice(1); // Remove the 'p' from the id
    const projectData = jsonData[parseInt(projectDataId) - 1];

    if (projectData) {
        gsap.to(previewImg, 0.4, {
            backgroundImage: `url(${projectData.image})`,
        });
    }
}

function resetProjectImg() {
    gsap.to(previewImg, 0.4, {
        backgroundImage: 'none',
    });
}

// Your existing JavaScript code continues here



const projects = document.querySelector(".projects");
const preview = document.querySelector(".preview");
const previewImg = document.querySelector(".preview-img");

let isInside = false;

const bgPositions = {
    p1: "0 0",
    p2: "0 25%",
    p3: "0 50%",
    p4: "0 75%",
    p5: "0 100%",
};

const moveStuff = (e) => {
    const mouseInside = isMouseInsideContainer(e);

    if(mouseInside !== isInside) {
        isInside = mouseInside;
        if (isInside) {
            gsap.to(preview, 0.3, {
                scale: 1,
            });
        } else {
            gsap.to(preview, 0.3, {
                scale: 0,
            });
        }
    }
};

const moveProject = (e) => {
    const previewReact = preview.getBoundingClientRect(); preview
    const offsetX = previewReact.width / 2;
    const offsetY = previewReact.height / 2;

    preview.style.left = e.pageX - offsetX + "px";
    preview.style.top = e.pageY - offsetY + "px";
};

const moveProjectImg = (project) => {
    const projectId = project.id;
    gsap.to(previewImg, 0.4, {
        backgroundPosition: bgPositions[projectId] || "0 0",
    });
};

const isMouseInsideContainer = (e) => {
    const containerRect = projects.getBoundingClientRect();
    return (
        e.pageX > containerRect.left &&
        e.pageX < containerRect.right &&
        e.pageY > containerRect.top &&
        e.pageY < containerRect.bottom
    );
};

window.addEventListener("mousemove", moveStuff);

Array.from(projects.children).forEach((project) => {
    project.addEventListener("mousemove", moveProject);
    project.addEventListener("mousemove", moveProjectImg.bind(null, project));
});