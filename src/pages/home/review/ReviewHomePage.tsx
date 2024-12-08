import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import { useGetAllReviewsQuery } from "@/redux/api/UserApi/reviewApi";
import { TReview } from "@/types";
import { Link } from "react-router-dom";

import LoaderSpinner from "../../shared/loadingPage/LoadingSpinner";

import { formatDate } from "@/pages/AllReview/AllReviewPage";

const ReviewHomePage = () => {
  const { data: response, isLoading } = useGetAllReviewsQuery(undefined);
  // const isLoggedIn = useAppSelector(useCurrentUser); // Replace with your actual auth state selector
  // const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1200 });
  });

  const reviews: TReview[] = response?.data || [];
  console.log("review data", reviews);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!reviews || reviews.length === 0) {
    return <p className="text-center">No reviews available at the moment.</p>;
  }

  // Calculate overall site's rating (average rating)
  const overallRating = (
    reviews.reduce(
      (sum, review) => sum + parseFloat(review.rating.toString()),
      0
    ) / reviews.length
  ).toFixed(1);

  // Select the last two reviews
  const lastTwoReviews = reviews.slice(-2);

  // Convert overall rating to an integer to handle the star display
  const fullStars = Math.floor(parseFloat(overallRating));
  const hasHalfStar = parseFloat(overallRating) - fullStars >= 0.5;

  return (
    <div className="">
      {/* Overall Site Rating */}
      <div className="text-center mb-2 py-6 flex justify-center items-center md:gap-4">
        <h3 className="text-xl md:text-2xl font-semibold text-hover">
          Overall Site Rating:
        </h3>

        <div className="flex justify-center items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${
                i < fullStars
                  ? "text-yellow-500"
                  : hasHalfStar && i === fullStars
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              fill={
                i < fullStars || (hasHalfStar && i === fullStars)
                  ? "currentColor"
                  : "none"
              }
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {i < fullStars || (hasHalfStar && i === fullStars) ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21l1.09-6.86L2 9.27l6.91-1.01L12 2z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 17.77L5.82 21l1.09-6.86L2 9.27l6.91-1.01L12 2v15.77z"
                />
              )}
            </svg>
          ))}
          <span className="ml-2 text-xl font-semibold text-gray-700">
            {overallRating}/5
          </span>
        </div>
      </div>

      {/* User Reviews Section */}
      <div className="" data-aos="fade-right">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {lastTwoReviews.map((review, index: number) => (
              <figure
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4 text-yellow-300">
                  {/* Render star rating */}
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 sm:w-6 sm:h-6 me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                </div>
                {/* Review text */}
                <blockquote>
                  <p className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                    "{review.review}"
                  </p>
                </blockquote>
                {/* Reviewer details */}
                <figcaption className="flex items-center mt-6 space-x-3 rtl:space-x-reverse">
                  <img
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                    src={review.user?.img || ""}
                    alt={`${review.user?.name || "User"}'s profile`}
                  />
                  <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
                    <cite className="pe-3 font-medium text-gray-900 dark:text-white">
                      {review.user?.name || "Anonymous"}
                    </cite>
                    {/* <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">
              {review.user?.email}
            </cite> */}
                    <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">
                      {/* {new Date(review.createdAt).toLocaleDateString()} */}
                      {formatDate(review.createdAt)}
                    </cite>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Link to all reviews */}
        <div className="text-center my-5">
          <Link to="/reviews">
            <button className="btn rounded-lg text-lg font-semibold  bg-[#2A9D8F] text-gray-50 hover:bg-[#0f685f] hover:font-bold ">
              See All Review
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewHomePage;
