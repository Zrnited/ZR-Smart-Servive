import type { ChatHistory, Message, WhyUs } from "../entities";

const whySmartService: WhyUs[] = [
  {
    title: "Tailored for Abia Public Service.",
    info: "Built with the rules, tone, and structure of the Abia State Civil Service in mind.",
  },
  {
    title: "Fast and Accurate",
    info: "Complete tasks in minutes that used to take hours.",
  },
  {
    title: "Confidential and Secure",
    info: "Your documents are safe with government-grade data protection.",
  },
  {
    title: "Always Available",
    info: "SmartService works 24/7 — no fatigue, no downtime.",
  },
  {
    title: "Easy to Use",
    info: "No special training required. If you can send an email, you can use SmartService.",
  },
];

const dummyMessages: Message[] = [
  { role: "user", content: "Hi there!" },
  { role: "assistant", content: "Hello! How can I help you today?" },
  { role: "user", content: "Can you tell me about the weather in Lagos?" },
  {
    role: "assistant",
    content:
      "Sure! Today in Lagos, it’s partly cloudy with temperatures around 30°C.",
  },
  {
    role: "user",
    content: "Thanks! Also, what are some popular tourist attractions there?",
  },
  {
    role: "assistant",
    content:
      "Some popular spots include Lekki Conservation Centre, Nike Art Gallery, and Tarkwa Bay Beach.",
  },
  {
    role: "user",
    content: "Sounds great. What’s the best time to visit Lagos?",
  },
  {
    role: "assistant",
    content:
      "The best time to visit Lagos is during the dry season, typically from November to March.",
  },
  {
    role: "user",
    content: "Noted. Can you give me a short itinerary for 3 days?",
  },
  {
    role: "assistant",
    content:
      "Of course! Day 1: Explore Lekki, Day 2: Visit beaches, Day 3: Enjoy arts and culture in Ikoyi.",
  },
  { role: "user", content: "How do I move around the city?" },
  {
    role: "assistant",
    content:
      "You can use ride-hailing apps like Bolt and Uber, or local transport like BRT buses.",
  },
  { role: "user", content: "Can I get local food recommendations too?" },
  {
    role: "assistant",
    content:
      "Definitely! Try Jollof rice, Suya, Egusi soup, and Puff-Puff at trusted local restaurants.",
  },
  { role: "user", content: "Perfect. Thank you so much!" },
];

const history: ChatHistory[] = [
  {
    title: "Draft a memo to the permanent secretary",
    timestamp: "03:24PM",
  },
  {
    title: "Schedule a meeting with the finance team",
    timestamp: "Yesterday",
  },
  {
    title: "Schedule a meeting with the finance team",
    timestamp: "2 days ago",
  },
  {
    title: "Schedule a meeting with the finance team",
    timestamp: "Monday",
  },
  {
    title: "Schedule a meeting with the finance team",
    timestamp: "July 16",
  },
  {
    title: "Schedule a meeting with the finance team",
    timestamp: "July 11",
  },
  {
    title: "Schedule a meeting with the finance team",
    timestamp: "July 09",
  },
  {
    title: "Schedule a meeting with the finance team",
    timestamp: "June 30",
  },
];

export { whySmartService, dummyMessages, history };
