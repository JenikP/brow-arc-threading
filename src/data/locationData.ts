
import { LocationData } from "../types/location";

export const locations: LocationData[] = [
  {
    id: 1,
    storeId: "location1",
    name: "HomeCo. Brandon Park",
    address: "Shop 17, HomeCo. Brandon Park, 580 Ferntree Gully Road, Wheelers Hill, VIC 3150",
    description: "Our friendly shop is designed to maintain your privacy, ensuring a comfortable experience.",
    coordinates: { lat: -37.9007, lng: 145.1618 },
    phone: "+61415469594",
    image: "/lovable-uploads/4a6d259e-2c69-4327-9302-2fd3265a87cc.png",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=HomeCo.+Brandon+Park+Shopping+Centre+Wheelers+Hill+VIC",
    hours: {
      "Monday – Wednesday": "9:00 am – 5:30 pm",
      "Thursday – Friday": "9:00 am – 7:00 pm",
      "Saturday": "9:00 am – 5:00 pm",
      "Sunday/Public Holidays": "10:00 am – 5:00 pm"
    }
  },
  {
    id: 2,
    storeId: "location2",
    name: "Westfield Southland",
    address: "1239 Nepean Hwy, Cheltenham, VIC 3192",
    coordinates: { lat: -37.9594, lng: 145.0544 },
    phone: "+61497719761",
    image: "/lovable-uploads/7a21f579-60ff-4e22-8b2f-842740b8344c.png",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Westfield+Southland+Cheltenham+VIC",
    hours: {
      "Monday – Wednesday": "9:00 am – 5:30 pm",
      "Thursday – Friday": "9:00 am – 7:00 pm",
      "Saturday": "9:00 am – 5:00 pm",
      "Sunday/Public Holidays": "10:00 am – 5:00 pm"
    }
  },
  {
    id: 3,
    storeId: "location3",
    name: "Pakenham Marketplace",
    address: "Pakenham Central Marketplace, John St, Pakenham, VIC 3180",
    description: "Our kiosk ensures both privacy and quick access to all services.",
    coordinates: { lat: -38.0755, lng: 145.4845 },
    phone: "+61415469594",
    image: "/lovable-uploads/b00dd5a9-7c39-4752-aea4-ca3ebb458783.png",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Pakenham+Central+Marketplace+John+St+Pakenham+VIC",
    hours: {
      "Monday – Wednesday": "9:00 am – 5:30 pm",
      "Thursday – Friday": "9:00 am – 7:00 pm",
      "Saturday": "9:00 am – 5:00 pm",
      "Sunday/Public Holidays": "10:00 am – 5:00 pm"
    }
  },
  {
    id: 4,
    storeId: "location4",
    name: "Stud Park Shopping Centre",
    address: "Kiosk 1, Stud Park Shopping Centre, Cnr Stud Road and Fulham Road, Rowville, VIC 3178",
    coordinates: { lat: -37.9282, lng: 145.2381 },
    phone: "+61415469594",
    image: "/lovable-uploads/dc9795c0-3c3a-4a66-99fc-7aa4e2490b74.png",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Stud+Park+Shopping+Centre+Rowville+VIC",
    hours: {
      "Monday – Wednesday": "9:00 am – 5:30 pm",
      "Thursday – Friday": "9:00 am – 7:00 pm",
      "Saturday": "9:00 am – 5:00 pm",
      "Sunday/Public Holidays": "10:00 am – 5:00 pm"
    }
  },
  {
    id: 5,
    storeId: "location5",
    name: "Warringal Shopping Centre",
    address: "Warringal Shopping Centre, 56 Burgundy St, Heidelberg, VIC 3084",
    coordinates: { lat: -37.7566, lng: 145.0695 },
    phone: "+61415469594",
    image: "/lovable-uploads/warringal.png",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Warringal+Shopping+Centre+Heidelberg+VIC",
    hours: {
      "Monday – Wednesday": "9:00 am – 5:30 pm",
      "Thursday – Friday": "9:00 am – 7:00 pm",
      "Saturday": "9:00 am – 5:00 pm",
      "Sunday/Public Holidays": "10:00 am – 5:00 pm"
    }
  }
];
