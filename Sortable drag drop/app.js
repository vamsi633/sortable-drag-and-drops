const draggable_list=document.getElementById('draggable-list');
const check=document.getElementById('check');

const richestpeople=[
    'jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amanico Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

const listItems=[];

let dragStartIndex;

createList();


/*(a = 400, b = 20, c) => expression
([a, b] = [10, 20]) => expression
({ a, b } = { a: 10, b: 20 }) => expression
*/

/*
const a=[1,4,3,10,5]
a.sort((a,b)=> a-b)
*/

function createList(){
    [...richestpeople]
    .map(a=>({value:a, sorts:Math.random()}))  //check above expressions  ; 2.using map to recreate array and add math random value to sort in different value here sorts value is interger and a is the name of person
    .sort((a,b)=>a.sorts-b.sorts) //if use just .sort it is sorted taking values as string 
    .map(a=>a.value)  //so first we created map with name and random number 2.sorted depending on random number generated 3.showing only map.value without random number
    .forEach((person,index)=>{
        const listItem=document.createElement('li');

        listItem.setAttribute('data-index',index);

        listItem.innerHTML=`
          <span class="number">${index+1}</span>

          <div class='draggable' draggable="true">
              <p class="person-name">${person}</p>
              <i class="fas fa-grip-lines"></i>
          </div>
        `;

        listItems.push(listItem);
        draggable_list.appendChild(listItem);
    });

    addEventListeners();
}

function dragStart(){
    //console.log('Event','dragstart');
    dragStartIndex=+this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex);
}
function dragEnter(){
   // console.log('Event','dragenter');
   this.classList.add('over');
}
function dragDrop(){
   // console.log('Event','drop');
   const dragEndIndex=+this.getAttribute('data-index');
   swapItems(dragStartIndex,dragEndIndex);

   this.classList.remove('over');
}
function dragOver(e){
   // console.log('Event','dragover');
   e.preventDefault();
}
function dragLeave(){
   // console.log('Event','dragleave');
   this.classList.remove('over');
}

function swapItems(fromIndex,toIndex){
    const itemOne=listItems[fromIndex].querySelector('.draggable');
    const itemTwo=listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);

}

function checkOrder(){
    listItems.forEach((listItem,index)=>{
        const personName=listItem.querySelector('.draggable')
        .innerText.trim();

        if(personName!==richestpeople[index]){
            listItem.classList.add('wrong');
        }else{
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

function addEventListeners(){
    const draggables=document.querySelectorAll('.draggable');
    const dragListItems=document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable=>{
        draggable.addEventListener('dragstart',dragStart);
    });
    dragListItems.forEach(item=>{
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

check.addEventListener('click',checkOrder);