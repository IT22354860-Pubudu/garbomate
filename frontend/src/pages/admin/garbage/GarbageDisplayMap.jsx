import React, { useEffect, useState } from "react";
import {
  redIcon,
  blueIcon,
  greenIcon,
  orangeIcon,
  purpleIcon,
  userLocationIcon,
} from "../../../utils/mapIcons";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-color-markers";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";

export default function GarbageDisplayMap({
  garbagelat,
  garbagelon,
  garbagetype,
}) {
  const [lat, setLat] = useState(6.911967);
  const [lon, setLon] = useState(79.977543);

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

    const apiKey ="pk.eyJ1IjoiYWxmcmVkMjAxNiIsImEiOiJja2RoMHKyd2wwdnZjMnJ0MTJwbnVmeng5In0.E4QbAFjiWLY8k3AFhDtErA";
    // const apiKey = "pk.eyJ1IjoicHVibGljbGFuZHNqb3VybmFsIiwiYSI6ImNsYmdxZnlmMzBjMjIzcHA1MGo3ZW5jc28ifQ.Qwjm3h4gfgA9-i-yw08UVw";
    const mymap = L.map("map").setView([garbagelat, garbagelon], 12);

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

    const garbageLocation = [garbagelat, garbagelon];
    let icon = redIcon;
    if (garbagetype == "Organic") {
      icon = greenIcon;
    } else if (garbagetype == "Recyclable") {
      icon = blueIcon;
    } else if (garbagetype == "Non-Recyclable") {
      icon = orangeIcon;
    } else if (garbagetype == "E-Waste") {
      icon = purpleIcon;
    } else if (garbagetype == "Hazardous") {
      icon = redIcon;
    }
    L.marker(garbageLocation, { icon: icon })
      .addTo(mymap)
      .bindPopup("garbage Location");
    mymap.setView(garbageLocation, 12);

    if (lat && lon) {
      const userLocation = [lat, lon];
      L.marker(userLocation, { icon: userLocationIcon })
        .addTo(mymap)
        .bindPopup("Your Location");
      mymap.setView(userLocation, 12);
    }

    L.Routing.control({
      waypoints: [L.latLng(lat, lon), L.latLng(garbagelat, garbagelon)],
      routeWhileDragging: true,
      createMarker: function () {
        return null;
      }, // Disable markers
      lineOptions: {
        styles: [
          { color: "#008000", opacity: 1, weight: 10 },
          { color: "#08A045", opacity: 1, weight: 6 },
          // { color: '#152bf4', opacity: 1, weight: 10 },
          // { color: '#0f53ff', opacity: 1, weight: 6 }
        ],
      },
      show: false, 
      formatter: new L.Routing.Formatter({
        language: "en",
        units: "metric",
        roundingSensitivity: 1,
        formatInstruction: function () {
          return "";
        }, 
      }),
    }).addTo(mymap);

  }, [garbagelat, garbagelon, lat, lon]);

  return (
    <div>
      <div
        id="map"
        className=" rounded-xl border-[#4e4219]"
        style={{ height: "500px", width: "100%" }}
      ></div>
    </div>
  );
}
