
const swmixRoutes = [
    swMix1= {
        'name': 'swMix1',
        'status':{
            'firstAdcRoute': './htmlExamples/SwMix1/HTML ADC ANALOG AUDIO INPUT FIRST ADC.txt',
            'lastAdcRoute': './htmlExamples/SwMix1/HTML ADC ANALOG AUDIO INPUT LAST ADC.txt',
            'muxRoute': './htmlExamples/SwMix1/HTML MUX AUDIO EMBEDDER (CANAL ANALOG).txt',
        }
    },
    swMix2= {
        'name': 'swMix2',
        'status':{
            'firstAdcRoute': './htmlExamples/SwMix2/HTML ADC ANALOG AUDIO INPUT FIRST ADC.txt',
            'lastAdcRoute': './htmlExamples/SwMix2/HTML ADC ANALOG AUDIO INPUT LAST ADC.txt',
            'muxRoute': './htmlExamples/SwMix2/HTML MUX AUDIO EMBEDDER (CANAL ANALOG).txt',
        }
    },
    swMix3= {
        'name': 'swMix3',
        'status':{
            'firstAdcRoute': './htmlExamples/SwMix3/HTML ADC ANALOG AUDIO INPUT FIRST ADC.txt',
            'lastAdcRoute': './htmlExamples/SwMix3/HTML ADC ANALOG AUDIO INPUT LAST ADC.txt',
            'muxRoute': './htmlExamples/SwMix3/HTML MUX AUDIO EMBEDDER (CANAL ANALOG).txt',
        }
    },
    swMix4= {
        'name': 'swMix4',
        'status':{
            'firstAdcRoute': './htmlExamples/SwMix4/HTML ADC ANALOG AUDIO INPUT FIRST ADC.txt',
            'lastAdcRoute': './htmlExamples/SwMix4/HTML ADC ANALOG AUDIO INPUT LAST ADC.txt',
            'muxRoute': './htmlExamples/SwMix4/HTML MUX AUDIO EMBEDDER (CANAL ANALOG).txt',
        }
    },
    swMix5= {
        'name': 'swMix5',
        'status':{
            'firstAdcRoute': './htmlExamples/SwMix5/HTML ADC ANALOG AUDIO INPUT FIRST ADC.txt',
            'lastAdcRoute': './htmlExamples/SwMix5/HTML ADC ANALOG AUDIO INPUT LAST ADC.txt',
            'muxRoute': './htmlExamples/SwMix5/HTML MUX AUDIO EMBEDDER (CANAL ANALOG).txt',
        }
    },
    swMix6= {
        'name': 'swMix6',
        'status':{
            'firstAdcRoute': './htmlExamples/SwMix6/HTML ADC ANALOG AUDIO INPUT FIRST ADC.txt',
            'lastAdcRoute': './htmlExamples/SwMix6/HTML ADC ANALOG AUDIO INPUT LAST ADC.txt',
            'muxRoute': './htmlExamples/SwMix6/HTML MUX AUDIO EMBEDDER (CANAL ANALOG).txt',
        }
    }
]

var selectedEquipament
var cacheLastButton



function onLoadStatusPage (){
    const firstFocusedButton = document.querySelector('.navAsideCard')
    cacheLastButton = firstFocusedButton
    firstFocusedButton.setAttribute('style', 'color:#2B2D42; background-color:#CEFF1A').focus()
    selectedAsideButton(firstFocusedButton)
}

function selectedAsideButton (button) {
    cacheLastButton.removeAttribute('style')
    cacheLastButton = buttoncommi
    button.setAttribute('style', 'color:#2B2D42; background-color:#CEFF1A')
    const selectedValue = button.getAttribute('value')
    selectedEquipament = swmixRoutes.find(equipamentRoutes => equipamentRoutes.name == selectedValue  )
    refreshStatusInfo()
}

async function refreshStatusInfo(){  
    const pageMuxStatus = document.querySelectorAll('#rightMainCardContainer .containerItemList .circle')
    const pageFirstAdcStatus = document.querySelectorAll('#firstAdc .containerItemList .circle')
    const pageLastAdcStatus = document.querySelectorAll('#lastAdc .containerItemList .circle')

    const muxStatus = []
    const firstAdcStatus = []
    const lastAdcStatus = []
    
    // GET MUX STATUS //
    await fetch(selectedEquipament.status.muxRoute).then(res =>  {
        return res.text()
    }).then( res => {
        const parser = new DOMParser()
        const htmlToParse = parser.parseFromString(res,'text/html')
        
        const initialVideoParseStatus = htmlToParse.querySelector('Left')
        const parsedVideoHtml = initialVideoParseStatus.children[3].querySelectorAll('font')[2]
        
        const videoStatus = parsedVideoHtml.innerHTML
        
        const initialParseAesStatus = htmlToParse.querySelector('.BASE')
        const parsedAesHtml = initialParseAesStatus.getElementsByTagName('table')[1].children[0]
        
        const htmlCH1 = parsedAesHtml.children[2]
        const htmlCH2 = parsedAesHtml.children[3]
        const htmlCH3 = parsedAesHtml.children[5]
        const htmlCH4 = parsedAesHtml.children[6]
        const htmlCH5 = parsedAesHtml.children[8]
        const htmlCH6 = parsedAesHtml.children[9]
        const htmlCH7 = parsedAesHtml.children[11]
        const htmlCH8 = parsedAesHtml.children[12]
        
        const muxParsedStatus =
        [
            video = videoStatus,
            CH1 = htmlCH1.children[6].children[0].innerHTML,
            CH2 = htmlCH2.children[3].children[0].innerHTML,
            CH3 = htmlCH3.children[6].children[0].innerHTML,
            CH4 = htmlCH4.children[3].children[0].innerHTML,
            CH5 = htmlCH5.children[5].children[0].innerHTML,
            CH6 = htmlCH6.children[3].children[0].innerHTML,
            CH7 = htmlCH7.children[5].children[0].innerHTML,
            CH8 = htmlCH8.children[3].children[0].innerHTML
        ]
        muxParsedStatus.forEach(item => {
            muxStatus.push(item)
        })      
    })

    //GET FIRST ADC STATUS //

    await fetch(selectedEquipament.status.firstAdcRoute).then(res =>  {
        return res.text()
    }).then( res => {
        const parser = new DOMParser()
        const htmlToParse = parser.parseFromString(res,'text/html')
        
        const initialParseStatus = htmlToParse.querySelectorAll('table')

        const presenceParseStatus = initialParseStatus[4].children[0].children[2]

        
        const parsedPresence = presenceParseStatus.querySelectorAll('font')

         parsedPresence.forEach(channel => {
             firstAdcStatus.push(channel.innerHTML)
        })
        
    })

    //GET LAST ADC STATUS //
    await fetch(selectedEquipament.status.lastAdcRoute).then(res =>  {
        return res.text()
    }).then( res => {
        const parser = new DOMParser()
        const htmlToParse = parser.parseFromString(res,'text/html')
        
        const initialParseStatus = htmlToParse.querySelectorAll('table')

        const presenceParseStatus = initialParseStatus[4].children[0].children[2]

        
        const parsedPresence = presenceParseStatus.querySelectorAll('font')

         parsedPresence.forEach(channel => {
             lastAdcStatus.push(channel.innerHTML)
        })
        
    })
    

   
    for(var i = 0; i < firstAdcStatus.length; i++){
        if(firstAdcStatus[i] != "true"){
        pageFirstAdcStatus[i].setAttribute("style", "background-color: #FF5757")
    } else {
        pageFirstAdcStatus[i].setAttribute("style", "background-color: #57FF86")
    }
    }

    for(var i = 0; i < lastAdcStatus.length; i++){
        if(lastAdcStatus[i] != "true"){
        pageLastAdcStatus[i].setAttribute("style", "background-color: #FF5757")
    } else {
        pageLastAdcStatus[i].setAttribute("style", "background-color: #57FF86")
    }
    }


    for(var i = 0; i < muxStatus.length; i++){ 

        if(muxStatus[i] != "Present"){
            pageMuxStatus[i].setAttribute("style", "background-color: #FF5757")
        } else {
            pageMuxStatus[i].setAttribute("style", "background-color: #57FF86")
        }

       
    
    }
    
}

setInterval(refreshStatusInfo, 3000)