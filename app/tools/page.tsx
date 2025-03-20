import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Tool = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

type Tools = Array<Tool>;

const tools: Tools = [
  { id: "test", title: "sweetener", description: "ds", tags: ["what"] },
];

export default function Tools() {
  return (
    <>
      {tools.map((tool) => {
        return (
          <Card key={tool.id}>
            <CardHeader>
              <CardTitle>{tool.title}</CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </>
  );
}
