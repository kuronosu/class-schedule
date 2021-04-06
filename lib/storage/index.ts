import { Session } from "next-auth";
import { Schedule } from "../schedule-utils";
import { jsonToSchedule, lessonsToSchedule, scheduleToJson } from "./convertes";

export interface DataSource {
  save(schedule: Schedule): Promise<void>;
  load(): Promise<Schedule | null>;
}

export const SCHEDULE_KEY = "SCHEDULE_KEY";

export const LocalDataSource: DataSource = {
  async save(schedule: Schedule) {
    const jsonSchedule = scheduleToJson(schedule);
    localStorage.setItem(SCHEDULE_KEY, jsonSchedule);
  },
  load: async () => {
    const raw = localStorage.getItem(SCHEDULE_KEY);
    return jsonToSchedule(raw);
  },
};

export const RemoteDataSource: DataSource = {
  save: async (schedule: Schedule) => {
    const res = await fetch("/api/schedule", {
      method: "POST",
      body: scheduleToJson(schedule),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Saving error");
  },
  load: async () => {
    const res = await fetch("/api/schedule");
    const j = await res.json();
    return lessonsToSchedule(j.lessons);
  },
};

export const Repository = (session: Session | null | undefined): DataSource => {
  if (session) return RemoteDataSource;
  return LocalDataSource;
};
