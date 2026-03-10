import { NextRequest, NextResponse } from "next";
import { prisma } from "@/lib/prisma";

// GET fetching all reviews and the calculated average score for a movie
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const movieId = params.id;

        const reviews = await prisma.review.findMany({
            where: { movieId },
            orderBy: { createdAt: "desc" },
        });

        const averageScore =
            reviews.length > 0
                ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
                : 0;

        return NextResponse.json({
            reviews,
            averageScore: Number(averageScore.toFixed(1)),
            totalReviews: reviews.length,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch reviews." },
            { status: 500 }
        );
    }
}

// POST submitting a new review for a movie
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const movieId = params.id;
        const body = await request.json();
        const { rating, comment } = body;

        // Validate inputs
        if (typeof rating !== "number" || rating < 1 || rating > 10) {
            return NextResponse.json(
                { error: "Rating must be a number between 1 and 10." },
                { status: 400 }
            );
        }

        const newReview = await prisma.review.create({
            data: {
                movieId,
                rating,
                comment: comment?.trim() || null,
            },
        });

        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to submit review." },
            { status: 500 }
        );
    }
}
