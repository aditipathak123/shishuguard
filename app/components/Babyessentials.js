import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Package, Plus } from "lucide-react";
import Badge from "./ui/Badge";

const essentialsList = [
  { name: "Soft Cotton Nappies", desc: "Breathable cloth option for everyday comfort.", category: "clothing" },
  { name: "Head Support Pillow", desc: "Helps maintain natural head shape while resting.", category: "health" },
  { name: "Herbal Massage Oil", desc: "Used for gentle massage and better blood flow.", category: "health" },
  { name: "Wet Wipes", desc: "Quick clean-up solution for diaper changes.", category: "diapering" },
  { name: "Feeding Bottle Set", desc: "Useful for milk storage and feeding routines.", category: "feeding" },
  { name: "Swaddle Wrap", desc: "Keeps baby calm and improves sleep cycles.", category: "sleeping" },
  { name: "Baby Bath Tub", desc: "Ensures safe and easy bathing experience.", category: "bathing" },
  { name: "Mild Baby Cleanser", desc: "Gentle soap suitable for delicate skin.", category: "bathing" },
  { name: "Baby Nail Kit", desc: "Helps trim nails safely without scratches.", category: "health" },
  { name: "Room Thermometer", desc: "Monitors room temperature for baby comfort.", category: "health" },
  { name: "Burp Towels", desc: "Protects clothes during feeding time.", category: "feeding" },
  { name: "Mosquito Protection Net", desc: "Keeps baby safe from insect bites.", category: "sleeping" },
  { name: "Baby Sling Carrier", desc: "Allows easy carrying and bonding.", category: "travel" },
  { name: "Soft Plush Toys", desc: "Encourages sensory development and play.", category: "playtime" },
  { name: "Lightweight Blanket", desc: "Maintains warmth without overheating.", category: "sleeping" },
  { name: "Quick Dry Bed Sheet", desc: "Prevents mattress from getting wet.", category: "sleeping" },
  { name: "Infant Clothing Set", desc: "Comfortable outfits for daily wear.", category: "clothing" },
  { name: "Baby Cap & Mittens", desc: "Protects baby from cold and scratches.", category: "clothing" },
  { name: "Teething Soother", desc: "Relieves gum discomfort during teething.", category: "health" },
  { name: "Bottle Cleaning Liquid", desc: "Safe cleaning solution for feeding items.", category: "cleaning" },
];

const getTagStyle = (type) => {
  const styles = {
    clothing: "bg-indigo-100 text-indigo-700",
    health: "bg-emerald-100 text-emerald-700",
    feeding: "bg-amber-100 text-amber-700",
    diapering: "bg-rose-100 text-rose-700",
    bathing: "bg-sky-100 text-sky-700",
    sleeping: "bg-violet-100 text-violet-700",
    playtime: "bg-yellow-100 text-yellow-700",
    travel: "bg-teal-100 text-teal-700",
    cleaning: "bg-lime-100 text-lime-700",
  };

  return styles[type] || "bg-gray-100 text-gray-700";
};

const BabyEssentials = ({ onAddEssential }) => {
  return (
    <Card className="rounded-2xl border border-white/10 bg-gray-950 text-white shadow-lg">
      
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-white">
          <Package className="w-5 h-5 text-indigo-500" />
          Baby Care Starter Kit
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[320px] overflow-y-auto">
        
        {essentialsList.map((item, i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.06] p-4
            transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.09] hover:shadow-xl"
          >
            
            <div>
              <h3 className="font-semibold text-white">
                {item.name}
              </h3>

              <p className="mt-1 text-sm text-gray-300">
                {item.desc}
              </p>
            </div>

            <div className="flex items-center justify-between mt-4">
              
              <Badge className={`${getTagStyle(item.category)} capitalize`}>
                {item.category}
              </Badge>

              <button
                onClick={() => onAddEssential(item.name, item.category)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-full transition-all duration-200 shadow-sm"
              >
                <Plus className="w-4 h-4" />
              </button>

            </div>
          </div>
        ))}

      </CardContent>
    </Card>
  );
};

export default BabyEssentials;
