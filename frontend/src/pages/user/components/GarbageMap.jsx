import React, { useEffect, useState } from "react";
import { getUserAllGarbages } from "../../../api/garbageApi";
import {
  truck,
  redIcon,
  blueIcon,
  greenIcon,
  orangeIcon,
  purpleIcon,
  userLocationIcon,
} from "../../../utils/mapIcons";
import { publicGarbageLocations } from "../../../utils/publicGarbageBin";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-color-markers";
import { getAllSchedules } from "../../../api/scheduleApi";
import { Kaduwela, Koswatta, Kothalawala, Malabe, NoTown, Rajagiriya } from "../../../utils/townCodes";


export default function GarbageMap() {
  const [lat, setLat] = useState(6.911967);
  const [lon, setLon] = useState(79.977543);
  const [garbages, setGarbages] = useState([]);
  const [filteredGarbages, setFilteredGarbages] = useState(garbages);
  const [publicBins, setPublicBins] = useState(publicGarbageLocations);
  const [filteredPublicGarbages, setFilteredPublicGarbages] =
    useState(publicBins);
  const [isClicked, setIsClicked] = useState("All");
  const [publicBinsOn, setPublicBinsOn] = useState(false);
  const [binSelection, setBinSelection] = useState("public");

  const [trucks, setTrucks] = useState([]);

  const fetchUserAllGarbages = async () => {
    try {
      const res = await getUserAllGarbages(); // Call the API to fetch garbages
      setGarbages(res); // Assuming setGarbages is your state setter for garbage data
    } catch (error) {
      // alert(error.message);
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.error("Error fetching garbages: ", error.message);
    }
  };

  const fetchAllTrucks = async () => {
    try {
      const res= await getAllSchedules();
      setTrucks(res);
    } catch (error) {
      alert(error.message);
      console.error("Error fetching trucks: ", error.message);
    }
  }; // Fetch all trucks

  useEffect(() => {
    // console.log(`garbages => `, garbages);
    fetchUserAllGarbages();
    fetchAllTrucks();
  }, []);

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    };
    const intervalId = setInterval(getLocation, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (L.DomUtil.get("map") !== null) {
      L.DomUtil.get("map")._leaflet_id = null;
    }

    // Initialize the map
    const apiKey =
      "pk.eyJ1IjoiYWxmcmVkMjAxNiIsImEiOiJja2RoMHKyd2wwdnZjMnJ0MTJwbnVmeng5In0.E4QbAFjiWLY8k3AFhDtErA";
    const mymap = L.map("map").setView([6.246626, 80.517881], 12);

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: apiKey,
      }
    ).addTo(mymap);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mymap);

    if (lat && lon) {
      const userLocation = [lat, lon];
      L.marker(userLocation, { icon: userLocationIcon })
        .addTo(mymap)
        .bindPopup("Your Location");
      mymap.setView(userLocation, 12);
    }

    const newMid = [lat, lon];
    const mapSize = 12;
    mymap.setView(newMid, mapSize);

    addMarkers(mymap);
    addTrucks(mymap);

    if (publicBinsOn) {
      addPublicGarbageMarkers(mymap);
    }
    
    // Call the function to draw the polygon for Pitabaddara
    // drawPolygonForTown(pitabaddara, mymap)
  }, [lat, lon, filteredGarbages, filteredPublicGarbages, publicBinsOn, binSelection]);

  const addMarkers = (mymap) => {
    if (binSelection === "my") {
      filteredGarbages.forEach((garbage) => {
        if (garbage.status !== "Collected") {
          const mark = [garbage.latitude, garbage.longitude];
          let icon = redIcon;
          if (garbage.typeOfGarbage == "Organic") {
            icon = greenIcon;
          } else if (garbage.typeOfGarbage == "Recyclable") {
            icon = blueIcon;
          } else if (garbage.typeOfGarbage == "Non-Recyclable") {
            icon = orangeIcon;
          } else if (garbage.typeOfGarbage == "E-Waste") {
            icon = purpleIcon;
          } else if (garbage.typeOfGarbage == "Hazardous") {
            icon = redIcon;
          }
          L.marker(mark, { icon: icon })
            .addTo(mymap)
            .bindPopup(garbage.address);
        }
      });
    } else {
      filteredPublicGarbages.forEach((garbage) => {
        const binMark = [garbage.latitude, garbage.longitude];
        garbage.type.forEach((type) => {
          if (isClicked === type || isClicked === "All") {
            let icon = redIcon;
            if (type == "Organic") {
              icon = greenIcon;
            } else if (type == "Recyclable") {
              icon = blueIcon;
            } else if (type == "Non-Recyclable") {
              icon = orangeIcon;
            } else if (type == "E-Waste") {
              icon = purpleIcon;
            } else if (type == "Hazardous") {
              icon = redIcon;
            }
            L.marker(binMark, { icon: icon })
              .addTo(mymap)
              .bindPopup(garbage.town);
          }
        });
      });
    }
  };

  const addTrucks = (mymap) => {
    trucks.forEach((schedule) => {
      const mark = [schedule.latitude, schedule.longitude];
      const truckMarker = L.marker(mark, { icon: truck }).addTo(mymap).bindPopup(schedule.area);

      truckMarker.on('click', function() {
        drawPolygonForTown(schedule.area, mymap);
      });
    })
  }

  // Function to draw a polygon with predefined coordinates
    const drawPolygonForTown = (coordinates, mymap) => {
      let town ;
      if(coordinates == "Koswatte"){
        town = Koswatta;
      }
      else if(coordinates == "Kothalawala"){
        town = Kothalawala;
      }
      else if(coordinates == "Kaduwela"){
        town = Kaduwela;
      }
      else if(coordinates == "Rajagiriya"){
        town = Rajagiriya;
      }
      else if(coordinates == "Malabe"){
        town = Malabe;
      }
      else{
        town = NoTown;
      }
      const polygon = L.polygon(town, { color: 'blue', fillOpacity: 0.3,  weight: 3, opacity: 0.7, }).addTo(mymap);
      mymap.fitBounds(polygon.getBounds()); // Fit the map to the polygon bounds
    };



  const filter = (type) => {
    setPublicBinsOn(false);
    if (type === "All") {
      setFilteredGarbages(garbages);
      setFilteredPublicGarbages(publicBins);
    } else {
      setFilteredGarbages(
        garbages.filter((garbage) => garbage.typeOfGarbage === type)
      );
      const filteredBins = publicBins.filter((bin) => bin.type.includes(type));
      setFilteredPublicGarbages(filteredBins);
    }
    setIsClicked(type);
  };

  useEffect(() => {
    filter("All");
  }, [garbages]);

  return (
    <div className="relative">
      <div className="bg-white bg-opacity-90 z-[1000] rounded-xl top-0 right-0 flex relative">
          <div
          className={` px-4 rounded-xl py-2 h-full bg-opacity-40 ${
              isClicked === "All" ? "bg-[#48752c]" : ""
          }`}
          onClick={() => filter("All")}
          >
          <div className=" inline-block w-[10px] h-[10px] rounded-full bg-gradient-to-tr from-[#2196f3] via-[#ff9800] to-[#f44336] mr-2 "></div>
          <span className=" cursor-pointer mr-8">All</span>
          </div>
          <div
          className={` px-4 rounded-xl py-2 h-full bg-opacity-40 ${
              isClicked === "Organic" ? "bg-[#48752c]" : ""
          }`}
          onClick={() => filter("Organic")}
          >
          <div className=" inline-block w-[10px] h-[10px] rounded-full bg-[#4caf50] mr-2"></div>
          <span className=" cursor-pointer mr-8">Organic</span>
          </div>
          <div
          className={` px-4 rounded-xl py-2 h-full bg-opacity-40 ${
              isClicked === "Recyclable" ? "bg-[#48752c]" : ""
          }`}
          onClick={() => filter("Recyclable")}
          >
          <div className=" inline-block w-[10px] h-[10px] rounded-full bg-[#2196f3] mr-2"></div>
          <span className=" cursor-pointer mr-8">Recyclable</span>
          </div>
          <div
          className={` px-4 rounded-xl py-2 h-full bg-opacity-40 ${
              isClicked === "Non-Recyclable" ? "bg-[#48752c]" : ""
          }`}
          onClick={() => filter("Non-Recyclable")}
          >
          <div className=" inline-block w-[10px] h-[10px] rounded-full bg-[#ff9800] mr-2"></div>
          <span className=" cursor-pointer mr-8">Non-Recyclable</span>
          </div>
          <div
          className={` px-4 rounded-xl py-2 h-full bg-opacity-40 ${
              isClicked === "E-Waste" ? "bg-[#48752c]" : ""
          }`}
          onClick={() => filter("E-Waste")}
          >
          <div className=" inline-block w-[10px] h-[10px] rounded-full bg-[#9c27b0] mr-2"></div>
          <span className=" cursor-pointer mr-8">E-Waste</span>
          </div>
          <div
          className={` px-4 rounded-xl py-2 h-full bg-opacity-40 ${
              isClicked === "Hazardous" ? "bg-[#48752c]" : ""
          }`}
          onClick={() => filter("Hazardous")}
          >
          <div className=" inline-block w-[10px] h-[10px] rounded-full bg-[#f44336] mr-2"></div>
          <span className=" cursor-pointer mr-8">Hazardous</span>
          </div>
          <select onChange={(e) => setBinSelection(e.target.value)} className=" text-[#48752C] font-semibold border-2 border-[#48752c] rounded-lg px-4 absolute top-0 right-0 h-full">
            <option value='public'>Public Garbage Bins</option>
            <option value='my'>My Garbage Requests</option>
          </select>
      </div>

      <div
          id="map"
          className=" rounded-xl border-gray-200 h-[580px]"
          style={{ width: "100%" }}
      ></div>
    </div>
  );
}
