import L from 'leaflet'

const IconLocation = (url)=>{

    return L.IconMaterial.icon({
        icon: url,
        iconColor: "black", 
        markerColor: "white", 
        outlineColor: "blue", 
        outlineWidth: 1, 
        iconSize: [41, 52], 
    })
}
 
export default IconLocation;