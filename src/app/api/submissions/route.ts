import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "submissions.json");

export async function GET() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, "utf-8");
      const list = JSON.parse(data);
      return NextResponse.json({
        success: true,
        count: list.length,
        submissions: list,
      });
    }
  } catch (err) {
    console.warn("Could not read submissions", err);
  }

  return NextResponse.json({
    success: true,
    count: 0,
    submissions: [],
  });
}
