import { migrate } from "drizzle-orm/neon-http/migrator"
import { DB } from "./client"

const executeMigration = async () => {
    try {
        await migrate(DB, { migrationsFolder: "drizzle" })
        console.log("Migration completed")
    } catch (error) {
        console.error("Error during migration:", error)
        process.exit(1)
    }
}

executeMigration()