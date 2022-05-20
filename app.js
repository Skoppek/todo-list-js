let todos = [];
let dones = [];

const todoBtn = document.querySelector('.todo-btn');
const doneBtn = document.querySelector('.done-btn');
const form = document.querySelector('.todo-form');
const clrBtn = document.querySelector('.clr-btn');
const input = document.querySelector('input');
const addBtn = document.querySelector('.add-btn');
const cards = document.querySelector('.cards');

clrBtn.addEventListener('click', () => {
    cards.childNodes.forEach(card => {
        card.classList.add('removed');
    })
    dones = [];
})

todoBtn.addEventListener('click', () => {
    form.style.display = 'flex';
    clrBtn.style.display = 'none';

    showCardsFrom(todos);
});

doneBtn.addEventListener('click', () => {
    clrBtn.style.display = 'block';
    form.style.display = 'none';
    
    showCardsFrom(dones);
});

addBtn.addEventListener('click', () => {
    if(input.value === '')
        return;
    const data = {
        id: uuidv4(),
        text: input.value,
        state: 'todo'
    }
    todos.unshift(data);
    cards.prepend(createNewCard(data));
    input.value = '';
})

function createNewCard(data) {
    const card = document.createElement('div');
    const cardText = document.createElement('div');
    const cardStatus = document.createElement('button');
    const cardDelete = document.createElement('button');

    card.classList.add('card');
    cardText.classList.add('card-text');
    cardStatus.classList.add('card-status');
    cardDelete.classList.add('card-delete');

    card.addEventListener('transitionend', () => {
        card.remove();
    })

    if(data.state === 'todo')
    {
        card.classList.add('todo');
        cardStatus.innerHTML = '<i class="fa-regular fa-square"></i>';
        cardStatus.addEventListener('click', () => {
            let obj = todos.find(element => {
                return element.id === data.id;
            });
            obj.state = 'done';
            todos = todos.filter(element => {
                return element.id != obj.id;
            });
            dones.unshift(obj);
            cardStatus.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
            card.classList.add('removed');
        });
    }
        
    if(data.state === 'done')
    {
        card.classList.add('done');
        cardStatus.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
        cardStatus.addEventListener('click', () => {
            let obj = dones.find(element => {
                return element.id === data.id;
            })
            obj.state = 'todo';
            dones = dones.filter(element => {
                return element.id != obj.id;
            })
            todos.unshift(obj);
            cardStatus.innerHTML = '<i class="fa-regular fa-square"></i>';
            card.classList.add('removed');
        });
    }

    cardText.innerText = data.text;

    cardDelete.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    cardDelete.addEventListener('click', () => {
        if(data.state === 'todo') {
            todos = todos.filter(element => {
                return element.id != data.id;
            });
        }
        if(data.state === 'done') {
            dones = dones.filter(element => {
                return element.id != data.id;
            });
        }
        card.classList.add('removed');
    })

    const idInfo = document.createElement('div');
    idInfo.innerText = data.id;
    idInfo.style.display = 'none';

    card.appendChild(cardText);
    card.appendChild(cardStatus);
    card.appendChild(cardDelete);
    card.appendChild(idInfo);

    return card;
}

function showCardsFrom(table) {
    cards.innerText = '';
    table.forEach(obj => {
        cards.appendChild(createNewCard(obj));
    });
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}