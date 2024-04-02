import authOptions from "@/app/auth/authOptions";
import { issueSchema } from "@/app/validationSchemas";
import prisma from '@/prisma/client';
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: {params: { id: string}}) {
    
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, { status: 401}); // Code 401 means unauthorized

    const body = await request.json();

    // Data Validation using zod
    const validation = issueSchema.safeParse(body);
    
    if (!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})
    
    // Check if issue exists
    const issue = await prisma.issue.findUnique({where: { id: parseInt(params.id)}});

    if (!issue)
        return NextResponse.json({ error: 'Invalid issue'}, {status: 400}) 

    // Update issue in the database
    const updatedIssue = await prisma.issue.update({
        where: {
            id:  parseInt(params.id)
        },
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(updatedIssue, { status: 200});
}

export async function DELETE(request: NextRequest, { params }: {params: { id: string}}) {

    // Check if issue exists
    const issue = await prisma.issue.findUnique({where: { id: parseInt(params.id)}});

    if (!issue)
        return NextResponse.json({ error: 'Invalid issue'}, {status: 400}) 

    // Update issue in the database
    const deletedIssue = await prisma.issue.delete({
        where: {
            id: issue.id
        }
    })

    return NextResponse.json(deletedIssue, { status: 200});
}