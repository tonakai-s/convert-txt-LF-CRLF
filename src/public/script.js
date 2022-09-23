const filesInput = document.getElementById('files')
const filesList = document.getElementById('list')
const titleList = document.querySelector('#selected-files-list > p')
let allFiles

titleList.textContent = 'Nenhum arquivo selecionado =('

function readInputFileAndMountList() {
    if(allFiles){
        if(allFiles.length > 0 || allFiles != null){
            const dataTransfer = new DataTransfer()
            for(const prevFile of allFiles){
                if(typeof prevFile != 'number'){
                    dataTransfer.items.add(prevFile)
                }
            }
            for(const currFile of filesInput.files){
                if(typeof prevFile != 'number'){
                    dataTransfer.items.add(currFile)
                }
            }
            filesInput.files = dataTransfer.files
        }
    }

    while(filesList.firstChild){
        filesList.removeChild(filesList.firstChild)
    }

    if(filesInput.files.length > 0){
        titleList.textContent = 'Arquivos selecionados'
    } else {
        titleList.textContent = 'Nenhum arquivo selecionado =('
    }

    for(let file of filesInput.files){
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(file.name))
        filesList.appendChild(li)
    }
}

filesInput.addEventListener('click', () => {
    if(filesInput.files){
        allFiles = filesInput.files
    }
})

filesInput.addEventListener('change', readInputFileAndMountList, false)

const cleanFilesInputAndList = () => {
    filesInput.value = null
    allFiles = null
    readInputFileAndMountList()
}

const sendFilesToConversion = async () => {
    const fileInput = document.getElementById('files')
    const formData = new FormData()

    for(const file of fileInput.files){
        formData.append('files', file)
    }

    const options = {
        method: 'POST',
        body: formData,
    }

    const response = await fetch('http://localhost:3000/files/crlf-convert', options)
    const data = await response.json()

    const div = document.createElement('div')
    div.classList.add('d-flex')
    div.classList.add('direction-column')
    let content = ""
    content += "<h4>Selecione quais arquivos deseja baixar</h4>"
    const {files, folder} = data
    files.map(file => { content += `<button onclick="fetchFile('${folder.replace('.zip', '')}/${encodeURI(file)}')" class="download-btn">${file}<span class="download-icon"></span></button>` })
    content += `<button onclick="fetchFullFolder('${folder.replace('.zip', '')}')" class="download-btn">Baixar todos<span class="download-icon"></span></button>`
    div.innerHTML = content
    document.querySelector('div.container').appendChild(div)

    cleanFilesInputAndList()
}

const fetchFile = async (filePath) => {
    const options = {
        method: 'POST'
    }
    fetch(`http://localhost:3000/files/crlf-convert/file/${filePath}`, options)
    .then(response => {
        if(response.status != 200) { throw new Error("Bad request from server") }
        const blob = response.blob()
        return blob
    })
    .then(blob => {
        const [folder, file] = filePath.split('/')
        let url = window.URL.createObjectURL(blob)
        anchor = document.createElement('a')
        anchor.href = url
        anchor.download = decodeURI(file)
        anchor.click()

        window.URL.revokeObjectURL(url)
    })
    .catch((error) => { console.log(error) })
}

const fetchFullFolder = async (filePath) => {
    const options = {
        method: 'POST'
    }
    const [folder, fileName] = filePath.split('/')
    fetch(`http://localhost:3000/files/crlf-convert/full-folder/${folder}.zip`, options)
    .then(response => {
        if(response.status != 200) { throw new Error("Bad request from server") }
        const blob = response.blob()
        return blob
    })
    .then(blob => {
        let url = window.URL.createObjectURL(blob)
        anchor = document.createElement('a')
        anchor.href = url
        anchor.download = `${folder}.zip`
        anchor.click()

        window.URL.revokeObjectURL(url)
    })
}