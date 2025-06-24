const xUsernameValue = "prashant_hq";

const DIR = {
  POSTS: "src/content/posts",
  DRAFTS: "src/content/drafts",
  PUBLIC: "public",
  MASTRA_PLAYGROUND: ".mastra/output",
};

const personal = {
  xUsername: xUsernameValue,
  xHandle: "@" + xUsernameValue,
  bmcUsername: "ashant",
  fullName: "prashant bhudwal",
  firstName: "prashant",
};

export const C = {
  url: import.meta.env.DEV ? "http://localhost:1111" : "https://www.ashant.in",
  base: import.meta.env.DEV
    ? "http://localhost:1111/"
    : "https://www.ashant.in/",
  ...personal,
  DIR,
};

export const DUMMY = {
  title: "tempor elit id do",
  sentence: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  paragraph:
    "Ullamco proident occaecat sit nostrud reprehenderit fugiat cillum commodo. Consectetur nisi minim aute enim consequat mollit adipisicing culpa aliquip qui tempor. Cillum exercitation dolor elit id enim non reprehenderit anim deserunt consectetur velit ea est. Ea aliqua nostrud ad minim sint nulla ex. Cillum irure commodo ipsum ad ullamco. Nulla laborum in deserunt consequat pariatur.",
  section: `
  Occaecat proident exercitation reprehenderit ad. Consequat commodo laborum est. Consectetur ad sit sit sunt occaecat nostrud anim reprehenderit non laborum. Duis reprehenderit consectetur enim minim magna.

  Occaecat minim cupidatat nostrud sunt excepteur reprehenderit ea nisi elit. Fugiat officia commodo culpa nulla qui qui aliqua magna anim pariatur. Qui cillum aliqua adipisicing et eu minim. Eu cupidatat dolor exercitation veniam commodo tempor. Sit excepteur ullamco enim sint consectetur laborum occaecat sunt sunt magna aute minim reprehenderit. Mollit fugiat consequat anim pariatur ut qui. Voluptate sunt fugiat qui deserunt proident cupidatat consequat esse deserunt eu deserunt ea ea velit quis.

  Officia dolor laboris tempor labore aliqua eu aliqua id. Magna veniam eu reprehenderit incididunt magna sunt officia voluptate elit ut labore. Lorem non ullamco duis id veniam ea deserunt quis ex id dolor. Ullamco laborum non ipsum aliqua Lorem commodo pariatur minim nulla nostrud dolor cillum sit ullamco. Sint amet pariatur labore officia.
  `,
};
