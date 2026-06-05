import {
  pgTable,
  bigint,
  timestamp,
  text,
  uuid,
} from "drizzle-orm/pg-core";

// schema.ts
export const tarefas = pgTable("Tarefas", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  texto: text("texto").notNull(),
  user_id: uuid("user_id"),
});
