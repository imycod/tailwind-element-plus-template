import { execSync } from "child_process";
import path from "path";
import fs from "fs";

function runCommand(command, options = {}) {
    try {
        execSync(command, { stdio: "inherit", ...options });
    } catch (error) {
        console.error(`Error executing command: ${command}`);
        process.exit(1);
    }
}

function startServer() {
    runCommand("npm run build");
    runCommand("npm run build:umd");
    runCommand("npm run build:style");
}

startServer() 