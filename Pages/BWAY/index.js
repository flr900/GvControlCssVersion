
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

const AdcInfoBwayFirstAdc = [
    channel1= {
        name: "CANAL 1",
        id: "PID66439",
        defaultValue: "ENUMINT(1)"},
    channel2= {
        name: "CANAL 2",
        id: "PID131975",
        defaultValue: "ENUMINT(2)"},
    channel3= {
        name: "CANAL 3",
        id: "PID197511",
        defaultValue: "ENUMINT(4)"},
    channel4= {
        name: "CANAL 4",
        id: "PID263047",
        defaultValue: "ENUMINT(8)"}
]

const AdcInfoBwayLastAdc = [
    channel5= {
        name: "CANAL 5",
        id: "PID66439",
        defaultValue: "ENUMINT(1)"},
    channel6= {
        name: "CANAL 6",
        id: "PID131975",
        defaultValue: "ENUMINT(2)"},
    channel7= {
        name: "CANAL 7",
        id: "PID197511",
        defaultValue: "ENUMINT(4)"},
    channel8= {
        name: "CANAL 8",
        id: "PID263047",
        defaultValue: "ENUMINT(8)"}
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
    const dropdownInputsFirstAdc = document.querySelectorAll('div#firstAdc  input')
    const dropdownInputsLastAdc = document.querySelectorAll('div#lastAdc  input')

    const getChannelRouted = []
    
    //GET FIRST ADC BWAY //
    await fetch(selectedEquipament.bway.firstAdcRoute).then(res =>  {
        return res.text()
    }).then( res => {
        const parser = new DOMParser()
        
        const htmlToParse = parser.parseFromString(res,'text/html')
        const selectedChannels = (htmlToParse.querySelectorAll( `input[checked=\"\"]`))
        

        for(var i = 0; i < 4; i++){
            const channelName = AdcInfoBwayFirstAdc.find(item => item.id == selectedChannels[i].name)
            if( dropdownInputsFirstAdc[i].id = selectedChannels[i].value) {
                dropdownInputsFirstAdc[i].value = channelName.name
                dropdownInputsFirstAdc[i].setAttribute('channelSelected', selectedChannels[i].name)
            } 
        }
    })
    
    //GET LAST ADC GAIN //
    await fetch(selectedEquipament.bway.lastAdcRoute).then(res =>  {
        return res.text()
    }).then( res => {
        const parser = new DOMParser()
        
        const htmlToParse = parser.parseFromString(res,'text/html')
        const selectedChannels = (htmlToParse.querySelectorAll( `input[checked=\"\"]`))
        
        for(var i = 0; i < 4; i++){
            const channelName = AdcInfoBwayLastAdc.find(item => item.id == selectedChannels[i].name)

            if( dropdownInputsLastAdc[i].id = selectedChannels[i].value) {

                dropdownInputsLastAdc[i].value = channelName.name
                dropdownInputsLastAdc[i].setAttribute('channelSelected', selectedChannels[i].name)
            } 
        }
    })
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

function changeCardTitle(listBox, item) {
    const channel = listBox.getAttribute('name')
    const cardInput = document.querySelector(`div [name = ${channel}] > input `)

    const value = item.attributes.value.value
    const channelText = item.innerHTML

    toggleListBox(listBox)
    cardInput.value = channelText
    cardInput.setAttribute('channelSelected', value)
}

itemsList.forEach(item => {
    item.addEventListener('click', e=> {
        changeCardTitle(item.parentElement.parentElement, item)
    })
});


cardHeader.forEach(header => {
    header.addEventListener('click', e => {
        toggleListBox(header)
    })
})


setInterval(refreshBwayInfo, 3000)