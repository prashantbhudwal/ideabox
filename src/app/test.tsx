/**
 * This page is for testing dev only features
 * Will return a 404 if not in dev mode
 */
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Image } from "~/client/components/image";
import { Button } from "~/client/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/client/components/ui/card";
import { cn, isDev } from "~/client/lib/utils";
import { Test } from "~/server/dw/tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/server/dw/tsx/animations/avatar.motion";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AvatarCard />;
}

function AvatarCard() {
  if (!isDev) {
    throw notFound();
  }
  const [posX, setPosX] = useState(10);

  const goRight = function () {
    setPosX((posX) => posX + 100);
  };

  const goLeft = function () {
    setPosX((posX) => posX - 100);
  };

  return (
    <Card className={cn("mx-auto w-1/3")}>
      <CardHeader>
        <CardTitle>Position: {posX}</CardTitle>
      </CardHeader>
      <CardContent className="relative h-[400px] border">
        <Avatar
          className={cn(
            "hover:outline-primary hover:cursor-pointer hover:outline-2",
            `absolute bottom-0`,
            `transition-[left, outline] duration-1000 ease-in`,
          )}
          style={{
            left: `${posX}px`,
          }}
        >
          <AvatarImage src="/icon-new.webp" />
        </Avatar>
        <div
          className={cn(
            "h-20 w-20 rounded-full bg-green-500",
            "origin-top-left rotate-0",
            "hover:rotate-45",
            "transition duration-700",
            "relative",
          )}
        >
          <div className="absolute top-5 left-5 h-8 w-8 rounded-sm bg-slate-800"></div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={goLeft}>Left</Button>
        <Button onClick={goRight}>Right</Button>
      </CardFooter>
    </Card>
  );
}
