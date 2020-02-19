const novaTarefa = document.querySelector('.novatarefa')
const btnTarefa = document.querySelector('.addtarefa')
const tarefas = document.querySelector('.tarefas')

novaTarefa.addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        if(!novaTarefa.value)return;
        criaTarefa(novaTarefa.value)
    }
})

function limpaTarefa(){
    novaTarefa.value = ''
    novaTarefa.focus()
}

function criaLi(){
    const li = document.createElement('li')
    return li
}

function criaBtn(li){
    li.innerText += ' '
    const bt = document.createElement('button')
    bt.innerText = 'Apagar'
    bt.setAttribute('class', 'apagar')
    bt.setAttribute('title', 'Apagar esta tarefa')
    li.appendChild(bt)
}

function criaTarefa(texto){
    const li = criaLi()
    li.innerText = texto
    tarefas.appendChild(li)
    limpaTarefa()
    criaBtn(li)
    salvarTarefas()
}

btnTarefa.addEventListener('click', function(e){
    if(!novaTarefa.value)return;
    criaTarefa(novaTarefa.value)
})
document.addEventListener('click', function(e){
    const el = e.target
    if(el.classList.contains('apagar')){
        el.parentElement.remove()
        salvarTarefas()
    }
    })

    function salvarTarefas(){
        const liTarefas = tarefas.querySelectorAll('li')
        const listaDeTarefas = []

        for (let salva of liTarefas) {
            let tarefaTexto = salva.innerText
            tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
            listaDeTarefas.push(tarefaTexto)
        }

        const tarefasJSON = JSON.stringify(listaDeTarefas);
        localStorage.setItem('arquivo', tarefasJSON)
    }
    function recuperaTarefasSalvas(){
        const recuperado = localStorage.getItem('arquivo')
        listaDeTarefas = JSON.parse(recuperado)
        for (let salva of listaDeTarefas){
            criaTarefa(salva)
        }
    }
    recuperaTarefasSalvas()