const itemsList = document.querySelectorAll(".itemList")
const listBox = document.getElementById("listBox")
const selectionArrow = document.getElementById("selectionArrow")
const cardTitle = document.getElementById("cardTitle")

toggleListBox()

function toggleListBox(){
    if(listBox.style.display == 'none'){
        listBox.style.display = 'flex'
        selectionArrow.style.transform ='none'
    } else {
        listBox.style.display = 'none'
        selectionArrow.style.transform ='rotate(180deg)'
    }
}

function changeCardTitle(value) {
    const cardTitle = document.getElementById("cardTitle")
    toggleListBox()
    cardTitle.value = value
}

itemsList.forEach(item => {
    item.addEventListener('click', e=> {
        changeCardTitle(item.innerHTML)
    })
});

selectionArrow.addEventListener('click', e =>{
    toggleListBox()
})

cardTitle.addEventListener('click', e =>{
    toggleListBox()
})