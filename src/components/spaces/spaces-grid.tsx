import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Link } from "@tanstack/react-router";
import { cn } from "~/lib/utils";
import { link } from "~/lib/link";
import { spaces } from "./spaces";
import { Image } from "../image";

export function SpacesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 auto-rows-[250px]">
      {spaces.map((space, index) => {
        return (
          <Link
            to={link.path.space({ slug: space.slug })}
            key={space.id}
            className={cn(
              "h-full",
              index === 0 ? "col-span-1 md:col-span-3" : "",
              index === 1 ? "col-span-1 md:col-span-2" : "",
            )}
          >
            {space.heroImage && (
              <Card
                className={cn(
                  "relative h-full",
                  "hover:outline-primary hover:outline transition-colors duration-300 p-0.5 backdrop-blur-xs hover:backdrop-blur-none",
                )}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    className="rounded object-cover"
                    src={link.path.images.spaces({ imgName: space.heroImage })}
                    alt=""
                    width={500}
                    height={500}
                  />
                </div>
                <div className="absolute left-2 bottom-2 w-full  p-2 rounded">
                  <CardHeader>
                    <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground font-serif drop-shadow-md">
                      {space.shortTitle}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base md:text-lg text-foreground/80 bg-black/10 backdrop-blur-xs">
                      {space.description}
                    </CardDescription>
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
