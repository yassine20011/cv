export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/personal-details",
        "/api/auth/signin/google",
        "/api/auth/signin/google/callback",
    ],
};