"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Star, MessageSquare } from "lucide-react";

export function ReviewSection({ movieId }: { movieId: string }) {
    const queryClient = useQueryClient();
    const [rating, setRating] = useState<number>(10);
    const [comment, setComment] = useState("");

    const { data, isLoading } = useQuery({
        queryKey: ["movieReviews", movieId],
        queryFn: async () => {
            const res = await axios.get(`/api/movies/${movieId}/reviews`);
            return res.data;
        },
    });

    const submitReview = useMutation({
        mutationFn: async (newReview: { rating: number; comment: string }) => {
            await axios.post(`/api/movies/${movieId}/reviews`, newReview);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["movieReviews", movieId] });
            setComment("");
            setRating(10);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating >= 1 && rating <= 10) {
            submitReview.mutate({ rating, comment });
        }
    };

    const averageScore = data?.averageScore || 0;
    const totalReviews = data?.totalReviews || 0;

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mt-12 mb-20 backdrop-blur-md">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between mb-8 pb-8 border-b border-white/10">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        <MessageSquare size={24} className="text-[#3aa3fc]" />
                        Community Reviews
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Read what others are saying and leave your own rating.
                    </p>
                </div>

                {/* Custom Average Database Score Display */}
                <div className="flex flex-col items-center bg-black/40 px-8 py-4 rounded-xl border border-white/5">
                    <span className="text-sm font-semibold text-gray-400 mb-1 uppercase tracking-wider">Average Score</span>
                    <div className="flex items-end gap-2 text-[#fbbf24]">
                        <span className="text-5xl font-extrabold">{averageScore.toFixed(1)}</span>
                        <span className="text-xl font-medium mb-1 text-gray-500">/ 10</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Review Form */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Leave a Review</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Rating (1-10)</label>
                            <div className="flex items-center gap-4 bg-black/30 p-2 rounded-lg border border-white/5">
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                    className="w-full accent-[#3aa3fc]"
                                />
                                <div className="flex items-center justify-center w-10 text-lg font-bold text-[#fbbf24]">
                                    {rating}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Comment (Optional)</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="What did you think of the movie?"
                                className="w-full bg-black/30 border border-white/5 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#3aa3fc] transition-colors min-h-[100px]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitReview.isPending}
                            className="mt-2 bg-[#3aa3fc] hover:bg-[#2c8ee6] disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            {submitReview.isPending ? "Submitting..." : "Submit Review"}
                        </button>
                    </form>
                </div>

                {/* Recent Reviews List */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Comments</h3>
                    <div className="flex flex-col gap-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                        {isLoading ? (
                            <p className="text-gray-500">Loading reviews...</p>
                        ) : data?.reviews?.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40 bg-black/20 rounded-xl border border-white/5 border-dashed text-gray-500">
                                <Star size={32} className="mb-2 opacity-50" />
                                <p>No reviews yet. Be the first!</p>
                            </div>
                        ) : (
                            data?.reviews?.map((r: any) => (
                                <div key={r.id} className="bg-black/30 border border-white/5 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="bg-[#fbbf24]/20 text-[#fbbf24] px-2 py-0.5 rounded text-xs font-bold border border-[#fbbf24]/30">
                                            ★ {r.rating.toFixed(1)}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(r.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    {r.comment && (
                                        <p className="text-gray-300 text-sm italic">"{r.comment}"</p>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
