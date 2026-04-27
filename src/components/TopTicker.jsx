import React from "react";

const TopTicker = () => {
  const offers = [
    "🔥 Special Offer: Get 20% OFF on Group Bookings of 10+ people!",
    "🌊 New Attraction Alert: The Vertical Drop Slide is now OPEN!",
    "🎟️ Book Online and Skip the Queue - Save up to ₹100 per ticket!",
    "🎂 Celebrating a Birthday? Get a free entry on your special day!",
    "👨‍👩‍👧‍👦 Family Pack: 2 Adults + 2 Kids only at ₹1799!",
  ];

  // Triple the items for a seamless infinite scroll
  const items = [...offers, ...offers, ...offers];

  return (
    <div className="relative w-full bg-blue-600 text-white overflow-hidden py-2">
      <div className="flex animate-infinite-scroll whitespace-nowrap">
        {items.map((offer, index) => (
          <span
            key={index}
            className="inline-flex items-center mx-10 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse" />
            {offer}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopTicker;
