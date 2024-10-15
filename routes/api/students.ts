// src/server.ts
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { Kv } from "https://deno.land/x/kv/mod.ts";

// Initialize Deno KV
const kv = await Kv.open();

const app = new Application();
const router = new Router();

// Helper function to generate a unique ID
function generateId(): string {
  return crypto.randomUUID();
}

// API endpoint to register a new student
router.post("/api/students", async (ctx) => {
  const body = ctx.request.body();
  if (body.type === "json") {
    const studentData = await body.value;

    // Generate a unique ID for the student
    const studentId = generateId();

    // Store the student data in Deno KV
    await kv.set(["students", studentId], studentData);

    // Store additional data in separate "tables"
    await kv.set(["specializations", studentData.specialization], { name: studentData.specialization });
    for (const subject of studentData.subjects) {
      await kv.set(["subjects", subject], { name: subject, specialization: studentData.specialization });
    }
    await kv.set(["examCenters", studentData.examCenter], { name: studentData.examCenter });

    ctx.response.status = 201;
    ctx.response.body = { id: studentId, message: "Student registered successfully" };
  } else {
    ctx.response.status = 400;
    ctx.response.body = { message: "Invalid request body" };
  }
});

// API endpoint to get a student by ID
router.get("/api/students/:id", async (ctx) => {
  const studentId = ctx.params.id;
  const studentData = await kv.get(["students", studentId]);

  if (studentData) {
    ctx.response.body = studentData;
  } else {
    ctx.response.status = 404;
    ctx.response.body = { message: "Student not found" };
  }
});

// API endpoint to get all students
router.get("/api/students", async (ctx) => {
  const students = [];
  for await (const entry of kv.list({ prefix: ["students"] })) {
    students.push(entry.value);
  }
  ctx.response.body = students;
});

// API endpoint to update a student
router.put("/api/students/:id", async (ctx) => {
  const studentId = ctx.params.id;
  const body = ctx.request.body();
  if (body.type === "json") {
    const updatedStudentData = await body.value;
    await kv.set(["students", studentId], updatedStudentData);
    ctx.response.body = { message: "Student updated successfully" };
  } else {
    ctx.response.status = 400;
    ctx.response.body = { message: "Invalid request body" };
  }
});

// API endpoint to delete a student
router.delete("/api/students/:id", async (ctx) => {
  const studentId = ctx.params.id;
  await kv.delete(["students", studentId]);
  ctx.response.body = { message: "Student deleted successfully" };
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on http://localhost:8000");
await app.listen({ port: 8000 });