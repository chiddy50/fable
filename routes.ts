
/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/options",
    "/admin/challenge/create",
    "/user/challenges",
    "/user/start/*",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
]


/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix =  "/api/auth"


/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";

export const matchRoute = (route, path) => {
    const routeSegments = route.split("/");
    const pathSegments = path.split("/");

    if (routeSegments.length !== pathSegments.length) {
        return false;
    }

    for (let i = 0; i < routeSegments.length; i++) {
        if (routeSegments[i] !== "*" && routeSegments[i] !== pathSegments[i]) {
            return false;
        }
    }

    return true;
};

export const isAPublicRoute = (path) => {
    return publicRoutes.some((route) => matchRoute(route, path));
};