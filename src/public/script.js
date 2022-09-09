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

const sendFilesToConversion = async () => {
    const fileInput = document.getElementById('files')
    const formData = new FormData()

    formData.append('files', fileInput.files[0])

    const options = {
        method: 'POST',
        body: formData,
    }

    const response = await fetch('http://localhost:3000/files/crlf-convert', options)
    const data = await response.json()

    const div = document.createElement('div')
    let content = ""
    const {files, folder} = data
    files.map(file => { content += `<button onclick="fetchFile('${folder.replace('.zip', '')}/${encodeURI(file)}')" class="download-btn">${file}<span></span></button>` })
    content += `<button class="download-btn">Baixar todos<span></span></button>`
    div.innerHTML = content
    document.querySelector('div.container').appendChild(div)
}

const fetchFile = async (filename) => {
    const options = {
        method: 'POST'
    }
    fetch(`http://localhost:3000/files/crlf-convert/file/${filename}`, options)
}