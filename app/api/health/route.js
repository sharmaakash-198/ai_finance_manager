import { db } from "@/lib/prisma";

export async function GET() {
  try {
    // Lightweight query to confirm the database is reachable
    await db.user.findFirst({
      select: {
        id: true,
      },
    });

    return Response.json(
      {
        status: "ok",
        database: "connected",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Health check failed:", error);

    return Response.json(
      {
        status: "error",
        database: "disconnected",
      },
      { status: 500 }
    );
  }
}