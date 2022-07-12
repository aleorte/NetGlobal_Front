function makeCsv(rows){
    return rows.map(r => r.join(',')).join("\r\n")
}

export function downloadFile(data,name ="report.csv"){
    const blob = new Blob([makeCsv(data)],{type: "application/octet-stream"})
    const href = URL.createObjectURL(blob) 
    const a = Object.assign(document.createElement("a"),{
        href,
        download: name
    })
    document.body.appendChild(a)
    a.click() 
    URL.revokeObjectURL(href)
    a.remove()
}