import { StackMiddlewares } from "./middleware/StackMiddleware";
import { WithAuthorization } from "./middleware/WithAuth";

export default StackMiddlewares([WithAuthorization])

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|about|home|contact|subscriptions|legal|assets).*)',
    ],
};