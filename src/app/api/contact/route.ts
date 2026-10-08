import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  service: string;
  message: string;
  createdAt: string;
}

// In-memory fallback if filesystem write is restricted
const memorySubmissions: ContactSubmission[] = [];

const dataFilePath = path.join(process.cwd(), "data", "submissions.json");

function getStoredSubmissions(): ContactSubmission[] {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn("Could not read submissions file, using memory fallback", err);
  }
  return memorySubmissions;
}

function saveSubmission(submission: ContactSubmission) {
  memorySubmissions.unshift(submission);
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const all = getStoredSubmissions();
    all.unshift(submission);
    fs.writeFileSync(dataFilePath, JSON.stringify(all, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not persist submission to disk, stored in memory", err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, service, message } = body;

    // 1. Validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid work email address." },
        { status: 400 }
      );
    }

    if (!service || typeof service !== "string") {
      return NextResponse.json(
        { error: "Please select a service of interest." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Please share a brief message about your project (at least 5 characters)." },
        { status: 400 }
      );
    }

    // 2. Create structured submission record
    const newSubmission: ContactSubmission = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      fullName: fullName.trim(),
      email: email.trim(),
      service: service.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    // 3. Save to storage
    saveSubmission(newSubmission);

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been successfully recorded.",
        submissionId: newSubmission.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Submission API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const submissions = getStoredSubmissions();
  return NextResponse.json({
    total: submissions.length,
    submissions,
  });
}
