import React, { useEffect, useState } from "react";
import { getAllDriverGarbages } from "../../../api/garbageApi";
import {
  truck,
  redIcon,
  blueIcon,
  greenIcon,
  orangeIcon,
  purpleIcon,
} from "../../../utils/mapIcons";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-color-markers";
import {
  Kaduwela,
  Koswatta,
  Kothalawala,
  Malabe,
  NoTown,
  Rajagiriya,
} from "../../../utils/townCodes";

export default function Map(props) {
  const [lat, setLat] = useState(6.911967);
  const [lon, setLon] = useState(79.977543);
  const [garbages, setGarbages] = useState([]);
  const [filteredGarbages, setFilteredGarbages] = useState(garbages);
  const [isClicked, setIsClicked] = useState("All");

  const fetchAllGarbages = async () => {
    try {
      const res = await getAllDriverGarbages();
      setGarbages(res);
    } catch (error) {
      alert(error.message);
      console.error("Error fetching garbages: ", error.message);
    }
  };

  useEffect(() => {
    // console.log(`garbages => `, garbages);
    fetchAllGarbages();
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
      L.marker(userLocation, { icon: truck })
        .addTo(mymap)
        .bindPopup("Your Location");
      mymap.setView(userLocation, 12);
    }

    const newMid = [lat, lon];
    const mapSize = 12;
    mymap.setView(newMid, mapSize);

    addMarkers(mymap);
    // drawPolygonForTown(props.town, mymap);
  }, [lat, lon, filteredGarbages]);

  const addMarkers = (mymap) => {
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
        L.marker(mark, { icon: icon }).addTo(mymap).bindPopup(garbage.address);
      }
    });
  };

  const drawPolygonForTown = (area, mymap) => {
    let town;
    if (area == "Koswatte") {
      town = Koswatta;
    } else if (area == "Kothalawala") {
      town = Kothalawala;
    } else if (area == "Kaduwela") {
      town = Kaduwela;
    } else if (area == "Rajagiriya") {
      town = Rajagiriya;
    } else if (area == "Malabe") {
      town = Malabe;
    } else {
      town = NoTown;
    }
    const polygon = L.polygon(town, {
      color: "blue",
      fillOpacity: 0.3,
      weight: 3,
      opacity: 0.7,
    }).addTo(mymap);
    mymap.fitBounds(polygon.getBounds());
  };

  const filter = (type) => {
    if (type === "All") {
      setFilteredGarbages(garbages);
    } else {
      setFilteredGarbages(
        garbages.filter((garbage) => garbage.typeOfGarbage === type)
      );
    }
    setIsClicked(type);
  };

  useEffect(() => {
    filter("All");
  }, [garbages]);

  return (
    <div className="relative">
      <div
        id="map"
        className=" rounded-xl border-gray-200 h-[750px]"
        // style={{ width: "100%" }}
      ></div>
      {/* <div className="bg-white bg-opacity-90 z-[1000] absolute rounded-xl top-0 right-0 flex flex-col md:flex-row">
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
      </div> */}
    </div>
  );
}
