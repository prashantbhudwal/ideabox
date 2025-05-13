import { Markdown } from "@/components/markdown-parser/markdown-renderer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import endent from "endent";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
export function SummaryCard() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-primary text-2xl">
          Prashant Bhudwal
        </CardTitle>
        <CardDescription>Engineering, Product & Education</CardDescription>
      </CardHeader>
      <CardContent>
        <Markdown
          content={endent`I am a product guy that codes. I have founded tree Ed-tech startups, getting customers all three times and reaching recurring revenue twice. Zero of the three made it.
            
            I am good at building full-stack web applications with language models. I code in Typescript. I love working with React, Tailwind, NextJs, Express, tRPC, Prisma, and AuthJs. 

            You have **two** ways to learn more about me.
            ### One
            Go conventional route and click any of these links.
            `}
        />
        <div className="flex flex-row space-x-2 py-6">
          <Button variant={"secondary"}>
            <span>
              <FaLinkedin />
            </span>
            <span>LinkedIn</span>
          </Button>
          <Button variant={"secondary"}>
            <span>
              <FaXTwitter />
            </span>
            Twitter
          </Button>
          <Button variant={"secondary"}>
            <span>
              <FaGithub />
            </span>
            Github
          </Button>
        </div>
        <Markdown
          content={endent`### Two 
            If you prefer narratives and nuance, go through my journey below. Use the slider on your screen to change the level of detail. Each level is a complete narrative.
            `}
        />
      </CardContent>
    </Card>
  );
}
