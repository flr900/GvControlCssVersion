
const swmixRoutes = [
    swMix1= {
        'name': 'swMix1',
        'bway':{
            'firstAdcRoute': '../../htmlExamples/SwMix1/HTML ADC AUDIO CHANNEL PAIRING FIRST ADC.txt',
            'lastAdcRoute': '../../htmlExamples/SwMix1/HTML ADC AUDIO CHANNEL PAIRING LAST ADC.txt',
        }
    },
    swMix2= {
        'name': 'swMix2',
        'bway':{
            'firstAdcRoute': '../../htmlExamples/SwMix2/HTML ADC AUDIO CHANNEL PAIRING FIRST ADC.txt',
            'lastAdcRoute': '../../htmlExamples/SwMix2/HTML ADC AUDIO CHANNEL PAIRING LAST ADC.txt',
        }
    },
    swMix3= {
        'name': 'swMix3',
        'bway':{
            'firstAdcRoute': '../../htmlExamples/SwMix3/HTML ADC AUDIO CHANNEL PAIRING FIRST ADC.txt',
            'lastAdcRoute': '../../htmlExamples/SwMix3/HTML ADC AUDIO CHANNEL PAIRING LAST ADC.txt',
        }
    },
    swMix4= {
        'name': 'swMix4',
        'bway':{
            'firstAdcRoute': '../../htmlExamples/SwMix4/HTML ADC AUDIO CHANNEL PAIRING FIRST ADC.txt',
            'lastAdcRoute': '../../htmlExamples/SwMix4/HTML ADC AUDIO CHANNEL PAIRING LAST ADC.txt',
        }
    },
    swMix5= {
        'name': 'swMix5',
        'bway':{
            'firstAdcRoute': '../../htmlExamples/SwMix5/HTML ADC AUDIO CHANNEL PAIRING FIRST ADC.txt',
            'lastAdcRoute': '../../htmlExamples/SwMix5/HTML ADC AUDIO CHANNEL PAIRING LAST ADC.txt',
        }
    },
    swMix6= {
        'name': 'swMix6',
        'bway':{
            'firstAdcRoute': '../../htmlExamples/SwMix6/HTML ADC AUDIO CHANNEL PAIRING FIRST ADC.txt',
            'lastAdcRoute': '../../htmlExamples/SwMix6/HTML ADC AUDIO CHANNEL PAIRING LAST ADC.txt',
        }
    }
]

const AdcInfoBway = [
    channel1= {id: "PID66439"},
    channel2= {id: "PID131975"},
    channel3= {id: "PID197511"},
    channel4= {id: "PID263047"},
    channel5= {id: "PID66439"},
    channel6= {id: "PID131975"},
    channel7= {id: "PID197511"},
    channel8= {id: "PID263047"}
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
    
    refreshBwayInfo()
}

async function refreshBwayInfo(){  
    const pageTextGainValue = document.querySelectorAll('.sliderTextValue')
    const sliders = document.querySelectorAll('input.slider')

    const getChannelRouted = []
    
    //GET FIRST ADC BWAY //
    await fetch(selectedEquipament.bway.firstAdcRoute).then(res =>  {
        return res.text()
    }).then( res => {
        const parser = new DOMParser()

        const htmlToParse = parser.parseFromString(res,'text/html')
        const selectedChannels = (htmlToParse.querySelectorAll( `input[checked=\"\"`))
        
        for(var i = 0; i < 4; i++){   
            getChannelRouted.push(selectedChannels[i].value) 
        }
    })

    //GET LAST ADC GAIN //
    await fetch(selectedEquipament.bway.lastAdcRoute).then(res =>  {
        return res.text()
    }).then( res => {
        const parser = new DOMParser()
    
        const htmlToParse = parser.parseFromString(res,'text/html')
        const selectedChannels = (htmlToParse.querySelectorAll( `input[checked=\"\"`))
        
        for(var i = 0; i < 4; i++){   
            getChannelRouted.push(selectedChannels[i].value) 
        }
    })

    console.log(getChannelRouted)
    // for (var i = 0; i < sliders.length; i++){
    //     sliders[i].value = getChannelRouted[i]
    //     progressTrack(sliders[i])
    //  }
}





// HANDLE DROPDOWN EVENTS //

const itemsList = document.querySelectorAll(".itemList")
const cardHeader = document.querySelectorAll(".dropDownTitle")

function toggleListBox(element){
    const dropDownChannel = element.getAttribute("name")
    const dropdownGroup = document.querySelectorAll(`div [name = ${dropDownChannel}]`)
    const listBox = dropdownGroup[1]
    const selectionArrow = dropdownGroup[0].children[1]

    if(listBox.style.display != 'flex'){
        listBox.style.display = 'flex'
        selectionArrow.style.transform ='none'
    } else {
        listBox.style.display = 'none'
        selectionArrow.style.transform ='rotate(180deg)'
    }
}

function changeCardTitle(listBox, value) {
    const channel = listBox.getAttribute('name')
    const cardInput = document.querySelector(`div [name = ${channel}] > input `)
    toggleListBox(listBox)
    cardInput.value = value
}

itemsList.forEach(item => {
    item.addEventListener('click', e=> {
        changeCardTitle(item.parentElement.parentElement, item.innerHTML)
    })
});


cardHeader.forEach(header => {
    header.addEventListener('click', e => {
        toggleListBox(header)
    })
})


// setInterval(refreshBwayInfo, 3000)