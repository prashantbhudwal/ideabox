import dedent from "dedent";
import { LEVEL, type Story } from "./types";

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
        text: "I was born in Poonch, Jammu & Kashmir, where I completed my schooling up to the 10th grade.",
      },

      l2: {
        text: "Poonch is a small border town, 10 hours from the nearest airport and train station. Most of my childhood was sprinkled with violence—first Indo-Pak disputes, then terrorism, and finally a civil agitation.",
      },
      l3: {
        text: "But we learned to live with it. We went to school, we played, we did silly stuff—just like other children. I think after you've gone through the level of uncertainty that we did, you become very used to it. After you've been scared of death—literally—so many times, nothing else really scares you. It unsettles you, it agonizes you, but nothing truly scares you.",
      },
    },
    subplots: [
      {
        id: "shelling",
        title: "Shelling",
        description: "1993-2003",
        layers: {
          l1: {
            text: "To us shelling at a border was as normal as thunder or lightning - we got scared when it happened suddenly, but it was a part of life. Mostly we watched it from the terrace and bet on where the next shell would hit. Sometimes, however, when shells hit the city, we had to retreat to the basement and line the windows with sandbags.",
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
            text: "Once in a while, we heard panic in the bazaar, and people shouted that an 'attack' was happening. This usually meant that terrorists had taken over a hotel, a bank, or a government building. The protocol for such situations was the same—get to the basement.",
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
            text: "When there was no terrorism or shelling, there was Hindu‑Muslim violence. A civil agitation over a land issue started in 2008; it soon got out of hand and culminated in full‑fledged religious violence, which stopped after the army was deployed. Schools remained shut for half the year, and there was a complete curfew for two of those months.",
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
        text: "I moved to Jammu in 2009 for my higher secondary education.",
      },
      l3: {
        text: "Moving to Jammu was a last‑minute decision. After studying in Poonch for two months, I realized how poor the quality of higher secondary education was and decided to move. The education in Jammu was better.",
      },
    },
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
        text: "This is the city where I became myself—where I earned my degree, got my first job, had my first drink, rented my first apartment, and started my first startup. Mumbai is as much a home to me as my hometown.",
      },
    },

    subplots: [
      {
        id: "college",
        title: "Bachelor of Engineering, IT",
        description: "2012-16",
        layers: {
          l1: {
            text: "Got my degree from Mumbai University.",
          },

          l2: {
            text: "I scored well, never failed, and was placed with the highest package in my department. But, knowing what I know now, I don't know what I learned in college or why.",
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
            text: dedent`I received a job offer through campus placement but chose not to join after orientation. Instead, I took an unpaid internship at a startup. I realized a conventional corporate setup wasn’t the best fit for me. The internship converted into a full-time position in three months and later into a founding‑team role.
            `,
          },
          l2: {
            text: "You can read the whole story [here](https://www.ashant.in/blog/ep-1-wsbat-will-students-be-able).",
          },
          l3: {
            text: "I left in 2018 after I burned myself out working and living out of the office for two years.",
          },
        },
        resolution: LEVEL.concise,
      },
      {
        id: "first-startup",
        title: "First Startup & Revenue",
        description: "2018-19",
        layers: {
          l1: {
            text: "Parallel Ed was a platform for students to learn skills that were not taught in schools through short weekend-only courses. I made INR 1 Lakh in revenue from 20 customers.",
          },
          l2: {
            text: "I did this as a solo-founder and did a lot of experimentation for a year. Scaling the small-batch classrooms made little business sense and eventually I stopped.",
          },
          l3: {
            text: "Covid accelerated interest in similar models, but all of them faced the same challenges I did: teacher acquisition, content diversity in India, unwillingness to pay for co-curricular or single-subject courses, and the operational overhead of running thousands of small batches.",
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
            text: "Ignoring health for years, a routine check in 2019 uncovered three chronic, potentially fatal conditions, forcing me to pause life from late 2019 to early 2021 to reset my priorities. I shed 50 kg, cut alcohol and processed foods, and rebuilt my health amid the chaos of COVID-19.",
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
            text: dedent`Medal was a teacher training and hiring platform for Ed-tech companies. We trained 25 teachers through our MVP course, achieving a 100% success rate in getting them hired.`,
          },
          l2: {
            text: "The platform was powered by a teacher evaluation and rating system that helps employers hire the best teachers.",
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
        text: "First software startup. I hired people, worked with a co‑founder, and wrote code—tons of code.",
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
            text: dedent`Hiring engineers as a non-technical founder is a big pain. At this point in time, I no longer wanted to deal with this pain. So I decided that I would learn to code. The end of 2022 and the beginning of 2023 was all about learning to code.`,
          },

          l2: {
            text: "I enrolled in Scrimba, which in my opinion is the best place to learn code. I had tried to learn programming many times before, but this was the first time I felt supported and was successful.",
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
            text: "FalconAI was an AI platform for schools. Teachers could create bots and assign students to them. The first 25 teachers paid for the platform, then we ran a six-month paid pilot with two schools.",
          },
          l2: {
            text: "We had customers but did not break even. We were unable to raise funds and we ran out of money after making it work for 18 months.",
          },
          l3: {
            text: "Here is the [github repository](https://github.com/prashantbhudwal/falconEDU) for the project. This is the first project that I coded and sold to real people, who used it for months.",
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
            text: "I spent some time back home in Poonch to support family matters and briefly oversee the family business. It was a much-needed break and reset.",
          },
        },
        resolution: LEVEL.concise,
      },
      {
        id: "next",
        title: "What now",
        description: "Jan 2025-present",
        layers: {
          l1: {
            text: "I wake up, read machine learning papers, code AI agents, and sometimes write. I am optimistic about AI and I am open to work at early stage AI startups.",
          },
          l2: {
            text: "If you made it here and would like to chat, reach out to me on X or drop a mail at: *firstname.lastnameATgmailDOTcom*",
          },
        },
        resolution: LEVEL.concise,
      },
    ],
  },
];
