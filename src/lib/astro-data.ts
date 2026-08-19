import avatarA from "@/assets/astrologer-a.jpg";
import avatarB from "@/assets/astrologer-b.jpg";
import avatarC from "@/assets/astrologer-c.jpg";

export type Astrologer = {
  id: string;
  name: string;
  specialization: string;
  trustScore: number;
  rate: number;
  platformFee: number;
  rating: number;
  sessions: number;
  experience: string;
  avatar: string;
  about: string;
  highlights: string[];
  breakdown: { label: string; value: number }[];
  bestMatch?: boolean;
};

export const astrologers: Astrologer[] = [
  {
    id: "a",
    name: "Astrologer A",
    specialization: "Career Specialist",
    trustScore: 82,
    rate: 15,
    platformFee: 3,
    rating: 4.8,
    sessions: 2140,
    experience: "10+ years experience",
    avatar: avatarA,
    about:
      "10+ years experience in career counselling and job decision queries. Known for specific, time-bound guidance instead of vague reassurance.",
    highlights: [
      "Career specialist",
      "High success in job decision queries",
      "Strong positive prediction feedback",
      "Trust Score 82",
    ],
    breakdown: [
      { label: "User Feedback", value: 88 },
      { label: "Prediction Consistency", value: 78 },
      { label: "Specificity", value: 84 },
      { label: "Experience", value: 90 },
      { label: "Session Quality", value: 80 },
    ],
    bestMatch: true,
  },
  {
    id: "b",
    name: "Astrologer B",
    specialization: "Vedic Expert",
    trustScore: 76,
    rate: 12,
    platformFee: 3,
    rating: 4.6,
    sessions: 1580,
    experience: "8+ years experience",
    avatar: avatarB,
    about: "8+ years of classical Vedic practice with a calm, structured consultation style.",
    highlights: ["Vedic chart reading", "Balanced long-term guidance", "Trust Score 76"],
    breakdown: [
      { label: "User Feedback", value: 80 },
      { label: "Prediction Consistency", value: 74 },
      { label: "Specificity", value: 70 },
      { label: "Experience", value: 82 },
      { label: "Session Quality", value: 76 },
    ],
  },
  {
    id: "c",
    name: "Astrologer C",
    specialization: "Career & Finance Expert",
    trustScore: 74,
    rate: 18,
    platformFee: 3,
    rating: 4.5,
    sessions: 1210,
    experience: "9+ years experience",
    avatar: avatarC,
    about: "9+ years advising on career switches, negotiations and money decisions.",
    highlights: ["Career + finance combination", "Practical money guidance", "Trust Score 74"],
    breakdown: [
      { label: "User Feedback", value: 76 },
      { label: "Prediction Consistency", value: 72 },
      { label: "Specificity", value: 74 },
      { label: "Experience", value: 84 },
      { label: "Session Quality", value: 70 },
    ],
  },
];

export function getAstrologer(id: string) {
  return astrologers.find((a) => a.id === id) ?? astrologers[0];
}

export const personalizationCategories = [
  "Career",
  "Love & Relationships",
  "Money",
  "Family",
  "Personal Growth",
  "Just Curious",
];

export const existingServices = [
  "Book a Pooja",
  "Free Services",
  "Wallet",
  "AstroRemedy",
  "Astrology Blog",
  "Chat with Astrologers",
  "My Kundli",
  "My Orders",
  "Support Chat",
];

export const roadmap = [
  { title: "Billing Transparency Copilot", detail: "Auto-refund and dispute handling." },
  { title: "Membership Plans", detail: "Free triage + priority access." },
  { title: "Paid AI Pre-Report", detail: "Detailed written interpretation before consultation." },
  { title: "Live Sessions / Community", detail: "Trusted astrologers Q&A." },
];