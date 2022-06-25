const randomsColors = ["blue","yellow","orange","red"] 

export const getRandomColor = ()=> randomsColors[Math.floor(Math.random() * randomsColors.length)]