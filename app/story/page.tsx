import { Story } from "./story";

type Story = {
  sno: number;
  date: string;
  title: string;
  story: string;
  image?: string;
};

const story = [
  { sno: 1, date: "", title: "Poonch", story: "I was born here." },
  { sno: 2, date: "", title: "Jammu", story: "" },
  { sno: 3, date: "", title: "Mumbai", story: "" },
  { sno: 3, date: "", title: "Mumbai", story: "" },
  { sno: 4, date: "", title: "Bangalore", story: "" },
];

export default function MyStory() {
  return <Story />;
}
