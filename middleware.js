import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

const isHealthRoute = createRouteMatcher([
  "/api/health",
]);

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "GO_HTTP"],
    }),
  ],
});

const clerk = clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    return auth().then(({ redirectToSignIn }) => redirectToSignIn());
  }
});

const arcjetMiddleware = createMiddleware(aj, clerk);

export default async function middleware(req, event) {
  if (isHealthRoute(req)) {
    return NextResponse.next();
  }

  return arcjetMiddleware(req, event);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};