import {NextResponse} from "next/server";

// Cache leads
let leads: any[] = [];

export async function POST(req: Request) {
    try {
        const data = await req.json();
        leads.push(data);

        console.log("Lead Stored:", data);

        return NextResponse.json({message: "Lead submitted successfully", data}, {status: 200});
    } catch (error) {
        console.error("Error handling form submission:", error);
        return NextResponse.json({message: "Failed to submit lead"}, {status: 500});
    }
}

export async function GET() {
    return NextResponse.json({leads}, {status: 200});
}
