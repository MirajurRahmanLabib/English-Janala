const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json => displayLesson(json.data));
};

const removeActive =()=> {
    const lsnBtn = document.querySelectorAll(".lsnBtn");
    lsnBtn.forEach( btn => btn.classList.add('btn-outline'));
 }

const loadLevelWord=(id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        removeActive();
        clickBtn.classList.remove('btn-outline')
        displayLevelWord(data.data)});
};
 

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if(words.length == 0){
        wordContainer.innerHTML = `
            <div class="text-center col-span-full">
                <img class=" mx-auto " src="./assets/alert-error.png" alt="">
                <p class="text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p><br>
                <p class="font-medium text-4xl">নেক্সট Lesson এ যান</p>
            </div>
        `;
        return;
    }

    for(let word of words){
        const wordDiv = document.createElement('div')
        wordDiv.innerHTML = `
            <div class="rounded-xl p-14 bg-white">
                <h1 class="font-bold text-3xl">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h1>
                <p class="font-medium text-xl py-6">Meaning /Pronounciation</p>
                <p class="font-bangla font-semibold text-3xl pb-14">"${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি' } / ${word.pronunciation ? word.pronunciation : 'উচ্চারণ পাওয়া যায়নি'}"</p>
                <div class="flex justify-between">
                    <button class="btn bg-[#1A91FF]/10"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn bg-[#1A91FF]/10"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>

        `
        wordContainer.append(wordDiv)
    }
}


const displayLesson = (lessons) => {
    
    // 1. get  the container & empty 
    const lvlContainer = document.getElementById('level-container');

    // 2. get into every lessons
    for(let lesson of lessons){
        // 3. create Element
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML=`
            <button id='lesson-btn-${lesson.level_no}' onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lsnBtn">
            <a>
            <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
            </a>
            </button>
        `;
        // 4. append into container
        lvlContainer.append(btnDiv);
    }
};

loadLessons();