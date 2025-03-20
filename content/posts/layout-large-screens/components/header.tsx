"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AiFillApple } from "react-icons/ai";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Spanned header implementation
export function HeaderSpanned() {
  return (
    <Card className="aspect-video px-2 gap-2 select-none">
      <CardHeader className="py-2 px-3 flex justify-between items-baseline text-xs border-dashed border-zinc-600 border-b-2">
        <div className="flex items-center space-x-1">
          <AiFillApple />
          <div className="font-bold rounded text-sm">Apple</div>
        </div>
        <div className="flex space-x-6 items-center px-2">
          <div className="hover:text-primary">iPhone</div>
          <div className="hover:text-primary">iPad</div>
          <div className="hover:text-primary">Mac</div>
        </div>
      </CardHeader>
      <CardContent className="h-full w-7/12 border-dashed border-zinc-600 border-x-2 mx-auto"></CardContent>
    </Card>
  );
}

export function SpannedHeaderWithCtas() {
  const [alignment, setAlignment] = useState<"left" | "right" | "center">(
    "center"
  );
  return (
    <Card className="aspect-video px-2 gap-2 select-none">
      <CardHeader className="py-2 px-3 flex justify-between items-baseline text-xs border-dashed border-zinc-600 border-b-2">
        <div className="flex items-center space-x-1">
          <AiFillApple />
          <div className="font-bold rounded text-sm">Apple</div>
        </div>
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className={cn("flex space-x-6 items-center px-2", {
            "w-7/12 px-0": alignment === "left",
            "w-7/12  justify-end": alignment === "right",
          })}
        >
          <div className="hover:text-primary">iPhone</div>
          <div className="hover:text-primary">iPad</div>
          <div className="hover:text-primary">Mac</div>
        </motion.div>
        <div className="flex items-center">
          <Button variant={"secondary"} size={"sm"} className="rounded-lg">
            Login
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-full w-7/12 border-dashed border-zinc-600 border-x-2 mx-auto"></CardContent>
      <Separator />
      <CardFooter>
        <ToggleGroup
          type="single"
          variant={"outline"}
          className="w-full"
          value={alignment}
          onValueChange={(value) => {
            if (value) setAlignment(value as "left" | "right" | "center");
          }}
        >
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </CardFooter>
    </Card>
  );
}

// Centered header implementation
export function HeaderCentered() {
  return (
    <Card className="aspect-video px-2 gap-2 select-none">
      <CardHeader className="text-xs border-dashed border-zinc-600 border-b-2 px-0">
        <div className="w-7/12 mx-auto flex justify-between items-baseline py-2">
          <div className="flex items-center space-x-1">
            <AiFillApple />
            <div className="font-bold rounded text-sm">Apple</div>
          </div>
          <div className="flex space-x-6 items-center px-2">
            <div className="hover:text-primary">iPhone</div>
            <div className="hover:text-primary">iPad</div>
            <div className="hover:text-primary">Mac</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-full w-7/12 border-dashed border-zinc-600 border-x-2 mx-auto"></CardContent>
    </Card>
  );
}

export function LayoutWithSidebars() {
  const [visibility, setVisibility] = useState({
    primarySidebar: true,
    secondarySidebar: false,
  });

  return (
    <div className="flex flex-col gap-2">
      <Card className="aspect-video px-2 gap-2 select-none">
        <CardHeader className="py-2 px-3 flex justify-between items-baseline  border-dashed border-zinc-600 border-b">
          <div className="w-full text-center">Header</div>
        </CardHeader>

        <div className="flex-1 flex gap-2 relative">
          {visibility.primarySidebar && (
            <div className="w-1/6 border-dashed border-zinc-600 border-r">
              <div className="p-2 text-xs text-center">Primary Sidebar</div>
            </div>
          )}

          <div className="flex-1 flex items-center justify-center border-dashed border-zinc-600 border-x">
            <div className="p-2 text-xs text-center">Main Content Area</div>
          </div>

          {visibility.secondarySidebar && (
            <div className="w-1/6 border-dashed border-zinc-600 border-l">
              <div className="p-2 text-xs text-center">Secondary Sidebar</div>
            </div>
          )}
        </div>

        <CardFooter className="py-2 px-3 border-dashed border-zinc-600 border-t">
          <div className="w-full text-center">Footer</div>
        </CardFooter>
      </Card>

      <Card>
        <CardFooter className="py-2 px-3">
          <div className="w-full flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <Switch
                id="primary-sidebar"
                checked={visibility.primarySidebar}
                onCheckedChange={(checked) =>
                  setVisibility((prev) => ({
                    ...prev,
                    primarySidebar: checked,
                  }))
                }
              />
              <Label htmlFor="primary-sidebar" className="text-xs">
                Primary Sidebar
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="secondary-sidebar"
                checked={visibility.secondarySidebar}
                onCheckedChange={(checked) =>
                  setVisibility((prev) => ({
                    ...prev,
                    secondarySidebar: checked,
                  }))
                }
              />
              <Label htmlFor="secondary-sidebar" className="text-xs">
                Secondary Sidebar
              </Label>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
