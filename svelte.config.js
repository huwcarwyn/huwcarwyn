import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: undefined,
      precompress: false,
      strict: true,
      paths: {
        base:
          process.env.NODE_ENV === "production" ? "/sveltekit-gh-pages" : "",
      },
    }),
  },
};
