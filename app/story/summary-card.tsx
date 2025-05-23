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
import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { link } from "@/lib/link";
import { useAtom, useAtomValue } from "jotai";
import { resolutionAtom } from "./resolution-atom";
export function SummaryCard() {
  const resolution = useAtomValue<number>(resolutionAtom);
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
          content={endent`I am a product guy that codes. I have founded tree Ed-tech startups, getting customers all three times and reaching recurring revenue twice. Zero of the three made it.`}
        />
        {resolution > 2 && (
          <>
            <br />
            <Markdown
              content={endent`I am good at building full-stack web applications with language models. I code in Typescript. I love working with React, Tailwind, NextJs, Express, tRPC, Prisma, and AuthJs.`}
            />
          </>
        )}
        <br />
        <Markdown
          content={endent`You have **two** ways to learn more about me.
            ### Conventional Route
            `}
        />
        <div className="flex flex-row space-x-2 py-6">
          <Link href={link.url.external.authorProfile.linkedIn} target="_blank">
            <Button variant={"secondary"}>
              <span>
                <FaLinkedin />
              </span>
              <span className="hidden md:block">LinkedIn</span>
            </Button>
          </Link>
          <Link href={link.url.external.authorProfile.x} target="_blank">
            <Button variant={"secondary"}>
              <span>
                <FaXTwitter />
              </span>
              <span className="hidden md:block">Twitter</span>
            </Button>
          </Link>
          <Link href={link.url.external.authorProfile.github} target="_blank">
            <Button variant={"secondary"}>
              <span>
                <FaGithub />
              </span>
              <span className="hidden md:block">Github</span>
            </Button>
          </Link>
        </div>
        <Markdown
          content={endent`### Narrative Route
            If you prefer nuance, go through my journey below. 
            
            Use the **slider** on your screen to change the level of detail. Each level is a complete narrative.
            `}
        />
      </CardContent>
    </Card>
  );
}
