import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpg";

export type InvocationKind = "allah" | "om" | "jesus" | "ram" | "custom" | "none";

export interface Invocation {
  kind: InvocationKind;
  text: string;
  translation?: string;
  dir: "ltr" | "rtl";
  lang: string;
  fontClass?: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  date: string; // display date
  time: string;
  venue: string;
  address: string;
  city: string;
  description?: string;
  mapsUrl?: string;
}

export interface GalleryPhoto {
  src: string;
  alt: string;
  caption?: string;
}

export interface SocialLink {
  kind: "whatsapp" | "phone" | "instagram" | "facebook" | "youtube";
  label: string;
  url: string;
}

export interface InvitationConfig {
  monogram: string;
  couple: {
    groom: string;
    bride: string;
    conjunction: string;
  };
  dateDisplay: string;
  dateISO: string;
  invocation: Invocation;
  message: string[];
  events: WeddingEvent[];
  venue: {
    name: string;
    address: string;
    city: string;
    mapsUrl: string;
  };
  gallery: GalleryPhoto[];
  contact: {
    heading: string;
    note: string;
  };
  socials: SocialLink[];
  closing: {
    kicker: string;
    line: string;
  };
  music: { enabled: boolean };
}

export const invitation: InvitationConfig = {
  monogram: "A & A",
  couple: { groom: "Ahmed", bride: "Ayesha", conjunction: "&" },
  dateDisplay: "14 December 2026",
  dateISO: "2026-12-14T11:00:00+05:30",
  invocation: {
    kind: "allah",
    text: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    translation: "In the name of God, the Most Gracious, the Most Merciful",
    dir: "rtl",
    lang: "ar",
    fontClass: "font-arabic",
  },
  message: [
    "Together with their families",
    "Ahmed & Ayesha",
    "invite you to celebrate their special day",
  ],
  events: [
    {
      id: "nikah",
      name: "Nikah",
      date: "14 December 2026",
      time: "11:00 AM",
      venue: "Falaknuma Banquet Hall",
      address: "Engine Bowli, Falaknuma",
      city: "Hyderabad",
      description: "The solemnisation, followed by lunch.",
      mapsUrl: "https://maps.google.com/?q=Falaknuma+Hyderabad",
    },
    {
      id: "walima",
      name: "Walima",
      date: "16 December 2026",
      time: "7:30 PM",
      venue: "Taj Krishna Lawns",
      address: "Road No. 1, Banjara Hills",
      city: "Hyderabad",
      description: "Dinner reception hosted by the groom's family.",
      mapsUrl: "https://maps.google.com/?q=Taj+Krishna+Banjara+Hills+Hyderabad",
    },
  ],
  venue: {
    name: "Taj Krishna Lawns",
    address: "Road No. 1, Banjara Hills, Telangana 500034",
    city: "Hyderabad",
    mapsUrl: "https://maps.google.com/?q=Taj+Krishna+Banjara+Hills+Hyderabad",
  },
  gallery: [
    { src: couple1, alt: "Ahmed and Ayesha together", caption: "The beginning" },
    { src: couple2, alt: "Hands of the couple with henna and gold", caption: "A promise" },
    { src: couple3, alt: "Ivory roses and gold candlesticks", caption: "The celebration" },
  ],
  contact: {
    heading: "Kindly Respond",
    note: "Your presence is the greatest gift. Please let us know by 1 December 2026.",
  },
  socials: [
    { kind: "whatsapp", label: "WhatsApp", url: "https://wa.me/919000000000" },
    { kind: "phone", label: "Call", url: "tel:+919000000000" },
    { kind: "instagram", label: "Instagram", url: "https://instagram.com" },
  ],
  closing: {
    kicker: "With Love",
    line: "Thank you for celebrating with us",
  },
  music: { enabled: true },
};
