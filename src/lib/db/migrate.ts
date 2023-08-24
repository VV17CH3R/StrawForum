import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from ".";

const main = async () => {
    console.log("Миграция началась...");
    try {
        await migrate(db, {migrationsFolder: "drizzle"});
    } catch (error) {
        console.log(error);
    }  
    console.log("Миграция завершена.");
};

main().finally(() => {
    process.exit();
});
