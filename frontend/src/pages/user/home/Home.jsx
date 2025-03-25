import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      <section className="bg-center h-dvh bg-no-repeat bg-[url('https://images.unsplash.com/photo-1717667745830-de42bb75a4fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-gray-700 bg-blend-multiply">
  <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
      We Drive a Cleaner Future Together
    </h1>
    <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
      Our mission is to revolutionize waste management by integrating technology for efficient, transparent, and sustainable garbage collection.
    </p>
    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
      <a
        href="#"
        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-[#48752c] hover:bg-green-700 focus:ring-4 focus:ring-green-300"
      >
        Get started
        <svg
          className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
      <a
        href="#"
        className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
      >
        Learn more
      </a>
    </div>
  </div>
</section>

<section className="bg-white">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-12 mb-8">
      <a
        href="#"
        className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md mb-2"
      >
        <svg
          className="w-2.5 h-2.5 me-1.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 14"
        >
          <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z" />
        </svg>
        Tutorial
      </a>
      <h1 className="text-gray-900 text-3xl md:text-5xl font-extrabold mb-2">
        How to Simplify Waste Collection in Your Neighborhood
      </h1>
      <p className="text-lg font-normal text-gray-500 mb-6">
        Learn how to effectively manage your waste and stay updated with collection schedules using our innovative platform.
      </p>
      <a
        href="#"
        className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300"
      >
        Read more
        <svg
          className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-12">
        <a
          href="#"
          className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md mb-2"
        >
          <svg
            className="w-2.5 h-2.5 me-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 18"
          >
            <path d="M17 11h-2.722L8 17.278a5.512 5.512 0 0 1-.9.722H17a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1ZM6 0H1a1 1 0 0 0-1 1v13.5a3.5 3.5 0 1 0 7 0V1a1 1 0 0 0-1-1ZM3.5 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM16.132 4.9 12.6 1.368a1 1 0 0 0-1.414 0L9 3.55v9.9l7.132-7.132a1 1 0 0 0 0-1.418Z" />
          </svg>
          Design
        </a>
        <h2 className="text-gray-900 text-3xl font-extrabold mb-2">
          Build a Sustainable Garbage Collection System
        </h2>
        <p className="text-lg font-normal text-gray-500 mb-4">
          Explore how our system can help reduce waste, improve recycling, and streamline collection processes.
        </p>
        <a
          href="#"
          className="text-green-600 hover:underline font-medium text-lg inline-flex items-center"
        >
          Read more
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-12">
        <a
          href="#"
          className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md mb-2"
        >
          <svg
            className="w-2.5 h-2.5 me-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 4 1 8l4 4m10-8 4 4-4 4M13 2l-2 12"
            />
          </svg>
          Code
        </a>
        <h2 className="text-gray-900 text-3xl font-extrabold mb-2">
          Advanced Tracking and Management Tools
        </h2>
        <p className="text-lg font-normal text-gray-500 mb-4">
          Learn how our tracking features and admin tools allow for better route planning and waste collection management.
        </p>
        <a
          href="#"
          className="text-green-600 hover:underline font-medium text-lg inline-flex items-center"
        >
          Read more
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>

    </>
  );
};

export default Home;
