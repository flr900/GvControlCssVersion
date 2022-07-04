
const slider = document.getElementById("fader1");
const arrowUp = document.getElementById("arrowUp");
const arrowDown = document.getElementById("arrowDown");

progressTrack(slider)

function progressTrack(sliderElement) {
    
    const{min,max,value} = sliderElement

    const sliderTextValue = document.getElementById("sliderTextValue");
    sliderTextValue.value = Number(value).toFixed(1)
    
    let Offset = 0
    const total = Number(max) - Number(min);
    const perc = ((Number(value) - Number(min)) / total) *100;
    
    if (perc <= 27) {
        Offset = 5
        
    } else if(perc >= 70){
        Offset = -5
    } ;
    
    sliderElement.style.background= `linear-gradient(to right, #1282A2 0%, #1282A2 ${perc + Offset}%, #CEFF1A ${perc + Offset}%, #CEFF1A 100%)`
};

function setValueSlider(markerValue){
    const slider = document.getElementById("fader1");
    slider.value = markerValue
    progressTrack(slider)
};


function stepUp(){
    const slider = document.getElementById("fader1");
    slider.stepUp(1)
    progressTrack(slider)
}

function stepDown(){
    const slider = document.getElementById("fader1");
    slider.stepDown(1)
    progressTrack(slider)
}

slider.addEventListener('input', (e) => progressTrack(e.target))
/* export default function sliderComponent (){ 
    return document.getElementsByClassName("slideWrapper")
}
 */
