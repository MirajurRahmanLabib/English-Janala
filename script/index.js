const createElements =(arr) =>{
    const htmlElements = arr.map(el =>`<span class="btn bg-[#1A91FF]/10" >${el}</span>`)
    return htmlElements.join(' ');
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
const mngLoadingBar=(status)=>{
    if(status == true){
        document.getElementById("loading-bar").classList.remove('hidden')
        document.getElementById("word-container").classList.add('hidden')
    }
    else{
        document.getElementById("word-container").classList.remove('hidden')
        document.getElementById("loading-bar").classList.add('hidden')
    }
}

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
    mngLoadingBar(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        removeActive();
        clickBtn.classList.remove('btn-outline')
        displayLevelWord(data.data)});
};


const loadWordDetail = (id)=>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(details => displayWordDetail(details.data));
}

const displayWordDetail = (word) =>{
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML =`
    <div class="  border border-[#EDF7FF] rounded-xl p-6 space-y-8">
            <h3 class="text-4xl font-semibold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</h3>
            <div>
                <h5 class="text-2xl font-semibold">Meaning</h5>
                <P class="py-3">${word.meaning}</P>
            </div>
            <div>
                <h5 class="text-2xl font-semibold">Parts Of Speach</h5>
                <P class="py-3">${word.partsOfSpeech}</P>
            </div>
            <div>
                <h5 class="text-2xl font-semibold">Example</h5>
                <p class="py-3">${word.sentence}</p>
            </div>
            <div>
                <h5 class="text-2xl font-bangla font-semibold">সমার্থক শব্দগুলো</h5>
                <p class=" flex gap-3 pt-3">${createElements(word.synonyms)}</p>
            </div>
        </div>
        <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn btn-primary rounded-xl ">Complete Learning</button>
            </form>
        </div>
    `
    my_modal_5.showModal();
}

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
        mngLoadingBar(false);
        return;
    }

    for(let word of words){
        const wordDiv = document.createElement('div')
        wordDiv.innerHTML =`
            <div class="rounded-xl p-14 h-full bg-white">
                <h1 class="font-bold text-3xl">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h1>
                <p class="font-medium text-xl py-6">Meaning /Pronounciation</p>
                <p class="font-bangla font-semibold text-3xl pb-14">"${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি' } / ${word.pronunciation ? word.pronunciation : 'উচ্চারণ পাওয়া যায়নি'}"</p>
                <div class="flex justify-between">
                    <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
                    <button onclick = "pronounceWord('${word.word}')" class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `
        wordContainer.append(wordDiv)
    }
    mngLoadingBar(false);
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


// search
document.getElementById('btn-search').addEventListener('click', () =>{
    removeActive();
    const input = document.getElementById('input-search');
    const searchValue = input.value;
    console.log(searchValue);

    fetch('https://openapi.programming-hero.com/api/words/all')
    .then(res => res.json())
    .then(data =>{
    const allWords = data.data;
    const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
    console.log(filterWords)
    displayLevelWord(filterWords);
    });
})