import dotenv from "dotenv";

class EnvLoad {
    constructor() {
        if (process.env.NODE_ENV === "production") {
            dotenv.config({ path: ".env.production" });
        } else {
            dotenv.config({ path: ".env.development" });
        }
    }
}

export const EnvConfigure = new EnvLoad();
