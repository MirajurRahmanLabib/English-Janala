
const createElements =(arr) =>{
    const htmlElements = arr.map(el =>`<span class="btn bg-[#1A91FF]/10" >${el}</span>`)
    return htmlElements.join(' ');
}


const synonyms = ['hellow','jhasd','lhghdahj'];

console.log(createElements(synonyms))