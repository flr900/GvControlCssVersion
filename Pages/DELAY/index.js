
const swmixRoutes = [
    swMix1= {
        'name': 'swMix1',
        'gain':{
            'firstAdcRoute': '../../htmlExamples/SwMix1/HTML ADC AUDIO DLY FIRST ADC.txt',
            'lastAdcRoute': '../../htmlExamples/SwMix1/HTML ADC AUDIO DLY LAST ADC.txt',
        }
    },
    swMix2= {
        'name': 'swMix2',
        'gain':{
            'firstAdcRoute': '../../htmlExamples/SwMix2/HTML ADC AUDIO DLY FIRST ADC.txt',
            'lastAdcRoute': '../../htmlExamples/SwMix2/HTML ADC AUDIO DLY LAST ADC.txt',
        }
    },
    swMix3= {
        'name': 'swMix3',
        'gain':{
            'firstAdcRoute': '../../htmlExamples/SwMix3/HTML ADC AUDIO DLY FIRST ADC.txt',
            'lastAdcRoute': '../../htmlExamples/SwMix3/HTML ADC AUDIO DLY LAST ADC.txt',
        }
    },
    swMix4= {
        'name': 'swMix4',
        'gain':{
            'firstAdcRoute': '../../htmlExamples/SwMix4/HTML ADC AUDIO DLY FIRST ADC.txt',
            'lastAdcRoute': '../../htmlExamples/SwMix4/HTML ADC AUDIO DLY LAST ADC.txt',
        }
    },
    swMix5= {
        'name': 'swMix5',
        'gain':{
            'firstAdcRoute': '../../htmlExamples/SwMix5/HTML ADC AUDIO DLY FIRST ADC.txt',
            'lastAdcRoute': '../../htmlExamples/SwMix5/HTML ADC AUDIO DLY LAST ADC.txt',
        }
    },
    swMix6= {
        'name': 'swMix6',
        'gain':{
            'firstAdcRoute': '../../htmlExamples/SwMix6/HTML ADC AUDIO DLY FIRST ADC.txt',
            'lastAdcRoute': '../../htmlExamples/SwMix6/HTML ADC AUDIO DLY LAST ADC.txt',
        }
    }
]

const AdcInfoDly = [
    channel1= {id: "PID65863"},
    channel2= {id: "PID131399"},
    channel3= {id: "PID196935"},
    channel4= {id: "PID262471"},
    channel5= {id: "PID65863"},
    channel6= {id: "PID131399"},
    channel7= {id: "PID196935"},
    channel8= {id: "PID262471"}
]

var selectedEquipament
var cacheLastButton



function onLoadStatusPage (){
    const firstFocusedButton = document.querySelector('.navAsideCard')
    cacheLastButton = firstFocusedButton
    firstFocusedButton.setAttribute('style', 'color:#2B2D42; background-color:#CEFF1A')
    selectedAsideButton(firstFocusedButton)
}

function selectedAsideButton (button) {
    cacheLastButton.removeAttribute('style')
    cacheLastButton = button
    button.setAttribute('style', 'color:#2B2D42; background-color:#CEFF1A')
    const selectedValue = button.getAttribute('value')
    selectedEquipament = swmixRoutes.find(equipamentRoutes => equipamentRoutes.name == selectedValue  )
    
    refreshDlyInfo()
}

async function refreshDlyInfo(){  
    const pageTextGainValue = document.querySelectorAll('.sliderTextValue')
    const sliders = document.querySelectorAll('input.slider')

    const getGainValue = []
    
    //GET FIRST ADC Gain //
    await fetch(selectedEquipament.gain.firstAdcRoute).then(res =>  {
        return res.text()
    }).then( res => {
        const parser = new DOMParser()
        const htmlToParse = parser.parseFromString(res,'text/html')
        for(var i = 0; i < 4; i++){   
            getGainValue.push(htmlToParse.querySelectorAll( `input[name="${AdcInfoDly[i].id}"]`)[0].value) 
        }
    })

    //GET LAST ADC GAIN //
    await fetch(selectedEquipament.gain.lastAdcRoute).then(res =>  {
        return res.text()
    }).then( res => {
        const parser = new DOMParser()
        const htmlToParse = parser.parseFromString(res,'text/html')
        for(var i = 0; i < 4; i++){   
            getGainValue.push(htmlToParse.querySelectorAll( `input[name="${AdcInfoDly[i].id}"]`)[0].value) 
        }
    })
    for (var i = 0; i < sliders.length; i++){
        sliders[i].value = getGainValue[i]
        progressTrack(sliders[i])
     }
}

// HANDLE WHEEL EVENTS //

const slider = document.getElementById("fader1");
const arrowUp = document.getElementById("arrowUp");
const arrowDown = document.getElementById("arrowDown");

const sliders = document.querySelectorAll(".slider")

sliders.forEach(slider => {
    progressTrack(slider)
    slider.addEventListener('wheel', (e) => handleWheelEvent(e))
    slider.addEventListener('input', (e) => progressTrack(e.target))
})

function progressTrack(sliderElement) {
    const{min,max,value, id} = sliderElement

    const sliderTextValue = document.getElementById(`${id}Text`);
    sliderTextValue.value = Number(value).toFixed(0)
    
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

function setValueSlider(element){      
    const {name, value} = element
    const slider = document.getElementById(name.value);
    slider.value = value.value
    progressTrack(slider)
};


function stepUp(element){
    const {name} = element
    const slider = document.getElementById(name.value);
    slider.stepUp(1)
    progressTrack(slider)
}

function stepDown(element){
    const {name} = element
    const slider = document.getElementById(name.value);
    slider.stepDown(1)
    progressTrack(slider)
}

function handleWheelEvent(event){
    if(event.deltaY < 0){
        stepUp(event.target.attributes)
    } else {
        stepDown(event.target.attributes)
    }
}
// setInterval(refreshDlyInfo, 3000)