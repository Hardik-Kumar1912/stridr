import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Export routes for Next App Router
const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  // Optional: Add config if needed
  // config: { ... },
});

export { GET, POST };
