import prisma from "@prisma/client";

const model = new prisma.PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
  ],
});

model.$on("query", (event) => {
  console.log("Query: " + event.query);
  console.log("Params: " + event.params);

  console.log("\n");
});
model.$on("error", (error) => {
  console.error("Error: " + error.message);
});
export { model, prisma };
