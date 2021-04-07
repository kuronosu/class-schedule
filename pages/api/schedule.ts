import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../lib/mongodb";
import { Lesson, validateLessonToLoad } from "../../lib/schedule-utils";
import { notEmpty } from "../../lib/storage/convertes";

const validateAndFilter = (arr: any[]) =>
  arr.map((le) => validateLessonToLoad(le)).filter(notEmpty);

const validateBody = (req: NextApiRequest): [boolean, Lesson[]] => {
  try {
    const lessons: any[] = Array.isArray(req.body)
      ? req.body
      : JSON.parse(req.body);
    return [false, validateAndFilter(lessons)];
  } catch (error) {
    return [true, []];
  }
};

const get = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session,
  db: Db
) => {
  const filter = { email: session.user.email };
  try {
    const result = await db.collection("users").findOne(filter);
    if (result.lessons)
      res.status(200).json({ message: "OK", lessons: result.lessons });
    else res.status(200).json({ message: "OK", lessons: [] });
  } catch (error) {
    res.status(500).json({ message: "Failed query." });
  }
};

const post = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session,
  db: Db
) => {
  const [err, lessons] = validateBody(req);
  if (err) {
    return res.status(400).json({ message: "Schedule not valid." });
  }
  const filter = { email: session.user.email };
  const update = { $set: { lessons: lessons } };
  try {
    const result = await db.collection("users").updateOne(filter, update);
    if (
      result.result.ok &&
      result.matchedCount == 1 &&
      result.modifiedCount == 1
    ) {
      return res.status(200).json({ message: "Saved successfully" });
    }
  } catch (error) {}
  res.status(500).json({ message: "Failed update." });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Not logged in." });
  }
  const { db } = await connectToDatabase();
  if (req.method === "POST") {
    return post(req, res, session, db);
  } else if (req.method === "GET") {
    return get(req, res, session, db);
  }
  res.status(405).json({
    message: "The HTTP ${req.method} method is not supported at this route.",
  });
};

// res.status(200).json({ body: req.body, type: typeof req.body });
