import endent from "endent";
import { LEVEL, Story } from "./types";

export const layersPoints: Story[] = [
  {
    id: "poonch",
    coordinates: [74.0933, 33.7714],
    zoom: 11,
    title: "Poonch",
    description: "1993-2009",
    resolution: LEVEL.concise,
    layers: {
      l1: {
        text: "I was born in Poonch, Jammu & Kashmir. Here I did my schooling till 10th Grade.",
      },

      l2: {
        text: "Poonch is a small border town, 10 hours from the nearest airport and train station. Most of my childhood was sprinkled with violence - first Indo-Pak disputes, then terrorism and finally a civil agitation.",
      },
      l3: {
        text: "But we learned to live with it. We went to school, we played, we did silly stuff—just like other children. I think after you've gone through the level of uncertainty that we did, you become very used to it. After you've been scared of death—literally—so many times, nothing else really scares you. It unsettles you, agonizes you, but nothing truly scares you.",
      },
    },
    subplots: [
      {
        id: "shelling",
        title: "Shelling",
        description: "1993-2003",
        layers: {
          l1: {
            text: "To us shelling at a border was as normal as thunder or lightning - we got scared when it happened suddenly, but it was a part of life. Mostly we watched it from the terrace and bet on where the next shell would hit. Sometimes however, when the shells hit the city, we had to retreat to the basement and line the windows with sandbags.",
          },
        },
        resolution: LEVEL.detailed,
      },
      {
        id: "terrorism",
        title: "Terrorism",
        description: "2003-07",
        layers: {
          l1: {
            text: "Once in a while we heard panic in the bazaar, and people shouted that an 'attack' was happening. This usually meant that terrorists have taken over a hotel, a bank or a government building. The protocol for such situations was similar - get to the basement.",
          },
        },
        resolution: LEVEL.detailed,
      },
      {
        id: "unrest",
        title: "Civil Unrest",
        description: "2008-09",
        layers: {
          l1: {
            text: "When there was no terrorism and shelling, there was hindu-muslim violence. A civil agitation for a land issue started in 2008, it went out of hand and culminated in full-fledged religious violence, which stopped after the army was deployed. Schools remained shut for half the year and there was a complete curfew for two of those months.",
          },
        },
        resolution: LEVEL.detailed,
      },
    ],
  },
  {
    id: "jammu",
    coordinates: [74.857, 32.7266],
    zoom: 11.5,
    title: "Jammu",
    description: "2009-2012",
    resolution: LEVEL.concise,
    layers: {
      l1: {
        text: "I moved to Jammu in 2009 for my higher secondary education. I also did my coaching for IIT here.",
      },
      l2: {
        text: "Moving to Jammu was a final minute decision. I realized how bad the quality of higher secondary education was in Poonch after studying there for 2 months and then decided to move out. I got better education in Jammu.",
      },
      l3: {
        text: "Jammu was hard. It was HOT, temperatures reaching 45 degrees, I was living on the top floor, and there was no air conditioning. Additionally, money was tight.",
      },
    },
    subplots: [
      {
        id: "higher-secondary",
        title: "Higher Secondary Education",
        description: "2009-11",
        layers: {
          l1: {
            text: "",
          },
        },
        resolution: LEVEL.basic,
      },
      {
        id: "coaching",
        title: "Coaching",
        description: "2010-11",
        layers: {
          l1: {
            text: "Somewhere in the middle of 11th grade I got to know what IIT was and decided that I would prepare for it. I moved into my teacher's home and started preparing. I also stopped going to the school.",
          },
        },
        resolution: LEVEL.detailed,
      },
      {
        id: "drop",
        title: "The Drop",
        description: "2011-12",
        layers: {
          l1: {
            text: "I overestimated myself and did not get a good score in the IIT/AIEEE exam. I decided to give it another shot.",
          },
        },
        resolution: LEVEL.detailed,
      },
    ],
  },
  {
    id: "mumbai",
    coordinates: [72.8777, 19.076],
    zoom: 10.5,
    title: "Mumbai",
    description: "2012-2022",
    resolution: LEVEL.concise,
    layers: {
      l1: {
        text: "This is city where I became myself - this is where I earned my degree, got my first job, had my first drink, rented my first apartment and started my first startup. Mumbai is as much a home to me as my hometown.",
      },
    },

    subplots: [
      {
        id: "college",
        title: "Bachelor of Engineering, IT",
        description: "2012-16",
        layers: {
          l1: {
            text: " I did my Bachelor in Engineering in Information Technology from Mumbai University.",
          },

          l2: {
            text: "I scored well, never failed, got placed after it, but knowing what I know now, I don't know what I learned, other than obedience.",
          },
        },

        resolution: LEVEL.concise,
      },
      {
        id: "job",
        title: "First Job",
        description: "2016-18",
        layers: {
          l1: {
            text: endent`
            I was placed out of college but did not join after orientation, instead I took up an unpaid internship at a Startup. I realized a conventional corporate setup wasn’t the best fit for me. The internship converted to a job in 3 months, and later to a founding-team designation. 
            `,
          },
          l2: {
            text: "You can read the whole story [here](https://example.com).",
          },
          l3: {
            text: "I left due to differences in vision with the founder. Although we raised money, I felt the company direction wasn’t aligning with my goals. I also felt the environment wasn’t conducive to open collaboration.",
          },
        },
        resolution: LEVEL.concise,
      },
      {
        id: "first-startup",
        title: "First Startup | ParallelEd",
        description: "2018-19",
        layers: {
          l1: {
            text: "Parallel Ed was a platform for students to learn skills that were not taught in schools.",
          },
          l2: {
            text: "I thought it would be a good idea to build a parallel education system. Something that taught students about the skills that were not taught in school. So I began thinking about curriculum from first principles and realized I could create courses around better writing, thinking, speaking and reading. I designed the curriculum and took the classes.",
          },
        },

        resolution: LEVEL.concise,
      },
      {
        id: "first-revenue",
        title: "First Revenue & Failure",
        description: "2018-19",
        layers: {
          l1: {
            text: "For the first time, I made money from something I built myself—Parallel Ed.",
          },
          l2: {
            text: "We faced challenges in student acquisition, and without a solid team, the venture wound down.",
          },
          l3: {
            text: "In retrospect, it was clear that the market was not ready. Covid accelerated interest in similar models, but even then, most didn’t succeed due to structural challenges in the education system.",
          },
        },
        resolution: LEVEL.concise,
      },
      {
        id: "crash",
        title: "Health",
        description: "2019-21",
        layers: {
          l1: {
            text: "I never paid any attention to my health before this point. One day I decided to go to a specialist for a minor stomach upset. He ordered a battery of tests and that changed my life. I got diagnosed with 3 different things, all chronic, some they may turn fatal if not attended to. My whole life stopped. I practically did nothing from the end of 2019 to the beginning of 2021. [I received multiple diagnoses that required significant lifestyle changes, prompting me to pause and reassess my priorities.]",
          },
          l2: {
            text: "I had to change my lifestyle. I lost 50Kgs of weight. I stopped drinking and processed foods, completely. To add to the misery, Covid hit while I was doing all this, and it tore the whole world apart—including mine.",
          },
        },
        resolution: LEVEL.detailed,
      },
      {
        id: "medal",
        title: "Second Startup | Medal",
        description: "2021-2022",
        layers: {
          l1: {
            text: endent`I started Medal in 2021 with a hope of creating a teacher hiring platform. I hired a couple of interns and started with a simple teacher training and evaluation. We trained over 20 teachers, got 5 of them jobs at companies but made zero money out of this.
        
            We started creating a Platform in the beginning of 2022. The interns were doing the programming.
        `,
          },
        },

        resolution: LEVEL.concise,
      },
    ],
  },
  {
    id: "bangalore",
    coordinates: [77.5946, 12.9716],
    zoom: 11,
    title: "Bengaluru",
    description: "2022-present",
    layers: {
      l1: {
        text: "First software startup. Hired people, worked with a co-founder and wrote code - tons of code.",
      },
    },
    resolution: LEVEL.concise,
    subplots: [
      {
        id: "code",
        title: "Programming Bootcamp",
        description: "2022-23",
        layers: {
          l1: {
            text: endent`Hiring engineers as a non-technical founder is a big pain. At this point in time, I no longer wanted to deal with this pain. So I decided that I would learn to code. The end of 2022 and the beginning of 2023 was all about learning to code.`,
          },

          l2: {
            text: "I enrolled in Scrimba, which in my opinion is the best place to learn code. I had tried to learn programming many times before, but this was the first time I felt supported and was successful. [Here](https://example.com) are my thoughts after coding for 365 days.",
          },
        },

        resolution: LEVEL.concise,
      },
      {
        id: "falconai",
        title: "Third Startup | FalconAI",
        description: "2023-24",
        layers: {
          l1: {
            text: "FalconAI was an AI platform for teachers and schools. Teachers could create bots and assign students to them. Here is the github repository for the project.",
          },
          l2: {
            text: "But why a startup again? ChatGPT launched while I was learning to code. With it, came the public access to the API. I thought it was the right time to build something for fun - like a capstone project for my programming bootcamp. I built and launched it",
          },
        },

        resolution: LEVEL.concise,
      },
      {
        id: "family",
        title: "Family",
        description: "July 2024-Dec 2024",
        layers: {
          l1: {
            text: "I spent some time back home to support family matters and briefly oversaw the family business.",
          },
        },
        resolution: LEVEL.concise,
      },
      {
        id: "break",
        title: "Recovery",
        description: "Jan 2025-present",
        layers: {
          l1: {
            text: "Currently, I am on a break. I decided to take a break to recharge and plan my next move after a busy period with multiple startups and personal responsibilities.",
          },
        },
        resolution: LEVEL.concise,
      },
    ],
  },
];
