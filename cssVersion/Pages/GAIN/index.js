
const swmixRoutes = [
    swMix1= {
        'name': 'swMix1',
        'gain':{
            'firstAdcRoute': '../../htmlExamples/SwMix1/HTML ADC AUDIO PROC FIRST ADC.txt',
            'lastAdcRoute': '../../htmlExamples/SwMix1/HTML ADC AUDIO PROC LAST ADC.txt',
        }
    },
    swMix2= {
        'name': 'swMix2',
        'gain':{
            'firstAdcRoute': '../../htmlExamples/SwMix2/HTML ADC AUDIO PROC FIRST ADC.txt',
            'lastAdcRoute': '../../htmlExamples/SwMix2/HTML ADC AUDIO PROC LAST ADC.txt',
        }
    },
    swMix3= {
        'name': 'swMix3',
        'gain':{
            'firstAdcRoute': '../../htmlExamples/SwMix3/HTML ADC AUDIO PROC FIRST ADC.txt',
            'lastAdcRoute': '../../htmlExamples/SwMix3/HTML ADC AUDIO PROC LAST ADC.txt',
        }
    },
    swMix4= {
        'name': 'swMix4',
        'gain':{
            'firstAdcRoute': '../../htmlExamples/SwMix4/HTML ADC AUDIO PROC FIRST ADC.txt',
            'lastAdcRoute': '../../htmlExamples/SwMix4/HTML ADC AUDIO PROC LAST ADC.txt',
        }
    },
    swMix5= {
        'name': 'swMix5',
        'gain':{
            'firstAdcRoute': '../../htmlExamples/SwMix5/HTML ADC AUDIO PROC FIRST ADC.txt',
            'lastAdcRoute': '../../htmlExamples/SwMix5/HTML ADC AUDIO PROC LAST ADC.txt',
        }
    },
    swMix6= {
        'name': 'swMix6',
        'gain':{
            'firstAdcRoute': '../../htmlExamples/SwMix6/HTML ADC AUDIO PROC FIRST ADC.txt',
            'lastAdcRoute': '../../htmlExamples/SwMix6/HTML ADC AUDIO PROC LAST ADC.txt',
        }
    }
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
    refreshGainInfo()
}

async function refreshGainInfo(){  
    const TextValueAdcGain = document.querySelectorAll('.sliderTextValue')
    
    const firstAdcGain = []
    
    //GET FIRST ADC Gain //

    await fetch(selectedEquipament.Gain.firstAdcRoute).then(res =>  {
        return res.text()
    }).then( res => {
        console.log(res)
        // const parser = new DOMParser()
        // const htmlToParse = parser.parseFromString(res,'text/html')
        
        // const initialParseGain = htmlToParse.querySelectorAll('table')

        // const presenceParseGain = initialParseGain[4].children[0].children[2]

        
        // const parsedPresence = presenceParseGain.querySelectorAll('font')

        //  parsedPresence.forEach(channel => {
        //      firstAdcGain.push(channel.innerHTML)
        // })
        
    })

    // //GET LAST ADC GAIN //
    // await fetch(selectedEquipament.status.lastAdcRoute).then(res =>  {
    //     return res.text()
    // }).then( res => {
    //     const parser = new DOMParser()
    //     const htmlToParse = parser.parseFromString(res,'text/html')
        
    //     const initialParseStatus = htmlToParse.querySelectorAll('table')

    //     const presenceParseStatus = initialParseStatus[4].children[0].children[2]

        
    //     const parsedPresence = presenceParseStatus.querySelectorAll('font')

    //      parsedPresence.forEach(channel => {
    //          lastAdcStatus.push(channel.innerHTML)
    //     })
        
    // })
    

   
     
    
}

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
// setInterval(refreshStatusInfo, 3000)