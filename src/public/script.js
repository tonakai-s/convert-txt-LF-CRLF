let filesList = document.getElementById('list')
let titleList = document.querySelector('#selected-files-list > p')

titleList.textContent = 'Nenhum arquivo selecionado =('
document.getElementById('files').addEventListener('change', (e) => {
    while(filesList.firstChild){
        filesList.removeChild(filesList.firstChild)
    }

    if(e.target.files.length > 0){
        titleList.textContent = 'Arquivos selecionados'
    } else {
        titleList.textContent = 'Nenhum arquivo selecionado =('
    }

    for(let file of e.target.files){
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(file.name))
        filesList.appendChild(li)
    }
})