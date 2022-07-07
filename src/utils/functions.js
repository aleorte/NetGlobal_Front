const randomsColors = ["blue","yellow","orange","red"] 

export const getRandomColor = ()=> randomsColors[Math.floor(Math.random() * randomsColors.length)]

export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}

const obj = {} //lo que vuelve del get de  companies  o de guards 

export function makeDataforGuards(){
const data= [['Cuil','Name','Last Name','Worked Hours']]
for(let i=0 ; i<obj.guards.length;i++){
    let arr=[]
    arr.push(obj.guards[i]["cuil"],obj.guards[i]["name"],obj.guards[i]["lastName"])
    data.push(arr)
}
}
export function makeCsv(rows){
return rows.map(r => r.join(',')).join("\r\n")
}
export function downloadFile(data,name ="report.csv"){
  //creamos un nuevo blob y definimos el type 
  const blob = new Blob([makeCsv(data)],{type: "application/octet-stream"})
  //creamos la url para nuestro blob , este va a ser unico e irrepetible , se guarda automatica/ asi que hay que destruirla 
  const href = URL.createObjectURL(blob)
  //creo un a y le asigno las propiedades que quiero 
  const a = Object.assign(document.createElement("a"),{
      href,
      download: name
  })
  document.body.appendChild(a)
  a.click()
  //destruimos direccion url que creamos 
  URL.revokeObjectURL(href)
  a.remove()
}


