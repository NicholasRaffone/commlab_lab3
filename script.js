const banner = document.getElementById('banner')
const footer = document.getElementsByClassName('footer')[0];


banner.addEventListener('mouseleave',()=>banner.style.filter="grayscale(100%)")
banner.addEventListener('mouseenter',()=>banner.style.filter="grayscale(0%)")

const catwrappers = document.getElementsByClassName('catwrapper');

const getAge = (name, wrapper, button) =>{
    fetch(`https://api.agify.io/?name=${name}`)
        .then(res=>res.json())
        .then(data=>{
            let elem = document.createElement('h3')
            elem.innerHTML = 'Estimated Age: '+data.age;
            wrapper.append(elem)
        })
        .then(button.remove())
}

for(let catwrapper of catwrappers){
    let catname = catwrapper.getElementsByClassName('catname')[0].innerText.split(' ')[0];
    let button = catwrapper.getElementsByClassName('getage')[0]
    let textwrapper = catwrapper.getElementsByClassName('cattext')[0]
    button.addEventListener('click', ()=>getAge(catname, textwrapper, button))
}

const getDateColor = (elem) =>{
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes()/60;
    //ratio 0->12am, 0.25->6am, 0.5->12pm, 0.75->6pm;
    const ratio = (hours+minutes)/24;
    const radius = Math.sin(ratio-0.25) * 255;
    elem.style.backgroundColor = `rgb(${radius},${radius},${radius})`;
}
//update color every minute
setInterval(()=>{
    getDateColor(footer)
},1000*60)

const colors = ['black', 'gray', 'white']
let colorcyle = 0;
//also update once on load
window.addEventListener('load',()=>{
    getDateColor(footer);
    footer.style.color=colors[colorcyle];
})
footer.addEventListener('click',()=>{
    colorcyle++;
    footer.style.color=colors[colorcyle%colors.length]
})

