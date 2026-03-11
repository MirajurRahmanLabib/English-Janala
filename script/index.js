const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json => displayLesson(json.data));
};

const displayLesson = (lessons) => {
    console.log(lessons);
    // 1. get  the container & empty 
    const lvlContainer = document.getElementById('level-container');

    // 2. get into every lessons
    for(let lesson of lessons){
        // 3. create Element
        const btDiv = document.createElement('div');
        btDiv.innerHTML=`
            <button class="btn btn-outline btn-primary">
            <a>
            <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
            </a>
            </button>
        `;
        // 4. append into container
        lvlContainer.append(btDiv);
    }
};

loadLessons();