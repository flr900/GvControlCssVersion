
function getHtml(){  
    var muxStatus = []
    
   fetch('./htmlExamples/HTML MUX AUDIO EMBEDDER (CANAL ANALOG).txt').then(res =>  {
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
        
        muxParsedStatus.forEach(itemStatus => {
            muxStatus.push(itemStatus)
        })
         
    })
    // console.log(muxStatus)
    return muxStatus

}

const muxStatus = getHtml()
console.log(muxStatus[0])

const pageMuxStatus = document.querySelectorAll('#rightMainCardContainer .containerItemList .circle')

for( var i = 0 ; i < pageMuxStatus.length; i++){

    // console.log(muxStatus)
}

