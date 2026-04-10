import { BiDrink } from "react-icons/bi";
import { BsSpeaker } from "react-icons/bs";
import { GrSatellite } from "react-icons/gr";
import { 
  HiOutlineWifi, 
  HiOutlineTv, 
  HiOutlineSun,
  HiOutlineSparkles 
} from "react-icons/hi2";
import { SiNetflix } from "react-icons/si";

export default function RoomFeatures() {
  const features = [
    { 
      icon: <SiNetflix className="text-red-600" />, 
      label: "Premium Netflix", 
      desc: "4K Ultra HD streaming included" 
    },
    { 
      icon: <BsSpeaker   className="text-amber-500" />, 
      label: "In-House Audio", 
      desc: "Integrated Sonos sound system" 
    },
    { 
      icon: <HiOutlineTv className="text-amber-500" />, 
      label: "Smart TV", 
      desc: "65-inch OLED display" 
    },
    { 
      icon: <GrSatellite  className="text-amber-500" />, 
      label: "Satellite Cable", 
      desc: "200+ international channels" 
    },
    { 
      icon: <HiOutlineWifi className="text-amber-500" />, 
      label: "High-Speed WiFi", 
      desc: "Dedicated fiber optic connection" 
    },
    { 
      icon: <BiDrink  className="text-amber-500" />, 
      label: "Gourmet Mini Bar", 
      desc: "Curated local drinks & snacks" 
    },
    { 
      icon: <HiOutlineSun className="text-amber-500" />, 
      label: "Climate Control", 
      desc: "Personalized smart thermostat" 
    },
    { 
      icon: <HiOutlineSparkles className="text-amber-500" />, 
      label: "Luxury Linens", 
      desc: "1000-thread-count Egyptian cotton" 
    },
  ];

  return (
    <section className="py-16 ">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center ">
            <div className="mb-4 p-4 rounded-full bg-white/5 border border-white/10  ">
              <span className="text-3xl">
                {feature.icon}
              </span>
            </div>
            <h4 className="text-white font-medium tracking-wide mb-1">
              {feature.label}
            </h4>
            <p className="text-slate-500 text-xs leading-relaxed max-w-37.5">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
      <div id="reserve"></div>
    </section>
  );
}