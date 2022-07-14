import L from 'leaflet'
import "leaflet-iconmaterial";

export const guardIcon = L.IconMaterial.icon({
    icon: "accessibility",
    iconColor: "black", 
    markerColor: "white", 
    outlineColor: "purple", 
    outlineWidth: 1, 
    iconSize: [31, 42], 
})

export const branchIcon = L.IconMaterial.icon({
    icon: "domain",
    iconColor: "black", 
    markerColor: "white", 
    outlineColor: "blue", 
    outlineWidth: 1, 
    iconSize: [41, 52], 
})