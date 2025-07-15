import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/client/components/ui/card";
import { Link } from "@tanstack/react-router";
import { cn } from "~/client/lib/utils";
import { link } from "~/client/lib/link";
import { spaces } from "./spaces";
import { Image } from "../image";

export function SpacesGrid() {
  return (
    <div className="grid auto-rows-[200px] md:auto-rows-[250px] grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-6">
      {spaces.map((space, index) => {
        return (
          <Link
            to={link.path.space({ slug: space.slug })}
            key={space.id}
            className={cn(
              "col-span-1 h-full md:col-span-3",
              index === 0 ? "col-span-1 md:col-span-4" : "",
              index === 1 ? "col-span-1 md:col-span-2" : "",
            )}
          >
            {space.heroImage && (
              <Card
                className={cn(
                  "relative h-full",
                  "hover:outline-primary p-0.5 backdrop-blur-xs transition-colors duration-300 hover:outline hover:backdrop-blur-none",
                )}
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    className="rounded object-cover"
                    src={link.path.images.spaces({ imgName: space.heroImage })}
                    alt=""
                    fill
                  />
                </div>
                <div className="absolute bottom-2 left-2 w-full rounded p-2">
                  <CardHeader>
                    <CardTitle className="text-foreground font-serif text-2xl font-extrabold drop-shadow-md sm:text-3xl md:text-4xl">
                      {space.shortTitle}
                    </CardTitle>
                    <CardDescription className="text-foreground/80 bg-black/10 text-sm backdrop-blur-xs sm:text-base md:text-lg">
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
