import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const isProdWorking = query({
  args: {},
  handler: async (ctx) => {
    try {
      await ctx.db.query("tasks").collect();
      return true;
    } catch {
      return false;
    }
  },
});
