import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllTools } from "./registry";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Tools() {
  const tools = getAllTools();
  return (
    <div className="grid grid-cols-3 gap-2 auto-rows-[250px]">
      {tools.map((tool, index) => {
        return (
          <Link
            href={"/tools/" + tool.id}
            key={tool.id}
            className={cn("h-full", {
              "col-span-2 row-span-1": index === 0,
            })}
          >
            {tool.heroImage && (
              <Card
                className={cn(
                  "relative h-full",
                  "hover:outline-primary hover:outline transition-colors duration-300 p-0.5 backdrop-blur-xs hover:backdrop-blur-none",
                )}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    className="rounded object-cover"
                    src={"/tools/" + tool.heroImage}
                    fill
                    alt=""
                  />
                </div>
                <div className="absolute left-2 bottom-2 w-full ">
                  <CardHeader>
                    <CardTitle className="text-4xl font-extrabold text-foreground font-serif drop-shadow-md">
                      {tool.name}
                    </CardTitle>
                  </CardHeader>
                </div>
              </Card>
            )}
          </Link>
        );
      })}
    </div>
  );
}
