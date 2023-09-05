import Topic from "../../../model/topic";
import connectMongoDB from "../../../libs/mongodb";
import {NextResponse} from "next/server";

export async function POST(request) {
    const {title, authors, source, pubyear, doi, claim, evidence} = await request.json();
    await connectMongoDB();
    await Topic.create({title, authors, source, pubyear, doi, claim, evidence});
    return NextResponse.json({Message: "Topic Created " + authors + " " + source}, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({topics});
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({message: "Topic deleted"}, {status: 200});
}