import L from 'leaflet';

const truck = L.icon({
    iconUrl: 'https://img.icons8.com/glyph-neue/64/1A1A1A/garbage-truck.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [20, 20],
    iconAnchor: [12, 20],
    popupAnchor: [1, -34],
    shadowSize: [20, 20]
  });
  
  const redIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  const blueIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  const greenIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  const orangeIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  const purpleIcon = L.icon({
    iconUrl: 'https://img.icons8.com/ios-filled/50/C850F2/marker.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [61, 41]
  });

  const userLocationIcon = L.divIcon({
    className: 'flex items-center justify-center w-10 h-10',
    iconSize: [21, 21],
    html: `<div class="relative w-4 h-4 bg-[#008000] rounded-full border-2 border-[#FFFFFF]">
             <div class="absolute top-0 left-0 w-full h-full border-4 border-[#008000]/30 rounded-full" style="transform: scale(2.5);">
           </div>`
  });
  // const userLocationIcon = L.divIcon({
  //   className: 'flex items-center justify-center w-10 h-10', // Tailwind classes for centering
  //   iconSize: [41, 41],
  //   html: `<div class="relative w-4 h-4 bg-[#0f53ff] rounded-full border-2 border-[#FFFFFF]">
  //            <div class="absolute top-0 left-0 w-full h-full border-4 border-[#0f53ff]/30 rounded-full" style="transform: scale(2.5);">
  //          </div>`
  // });

  export { truck, redIcon, blueIcon, greenIcon, orangeIcon, purpleIcon, userLocationIcon };