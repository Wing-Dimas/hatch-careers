import React, { useState } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Navbar from "@/Navbar";
import jumbotron from "@/assets/jumbotron.jpg";
import support from "@/assets/support.jpg";
import { Inertia } from "@inertiajs/inertia";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Footer from "@/Components/Footer";

const Homepage = (props) => {
  const [yourName, setYourName] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  if (props.flash.message) {
    Swal.fire("Email Sent", props.flash.message, "success");
    props.flash.message = undefined;
    setYourName("");
    setYourEmail("");
    setSubject("");
    setMessage("");
  }

  const handlerSubmit = () => {
    Inertia.post(route("contact"), {
      name: yourName,
      email: yourEmail,
      subject,
      message,
    });
  };
  return (
    <div>
      <Head title={props.title} />
      <Navbar />

      <div className="md:flex justify-between items-center px-4 sm:px-8 md:px-32 py-16 ">
        <div>
          <h2 className="text-4xl font-bold text-blue1 mt-2">
            Great
            <span className="text-sm text-yellow text-normal">Fit</span>
          </h2>
          <p className="text-blue">for everyone</p>

          <h2 className="text-4xl font-bold text-blue1 mt-2">
            Quick
            <span className="text-sm text-yellow text-normal">Replies</span>
          </h2>
          <p className="text-blue">& follow ups</p>

          <h2 className="text-4xl font-bold text-blue1 mt-2">
            New
            <span className="text-sm text-yellow text-normal">Jobs</span>
          </h2>
          <p className="text-blue">Posted monthly</p>
        </div>
        <img
          src={jumbotron}
          alt="jumbotron.jpg"
          className="xl:w-[800px] lg-w-[400px] "
        />
      </div>

      <div id="contact" className="px-4 sm:px-8 md:px-32 py-16">
        <h2 className="text-4xl text-blue1 font-semibold">Contact Us</h2>
        <div className="lg:flex flex-1 justify-between items-center mt-16">
          <img src={support} alt="support.jpg" className="w-[400px] " />
          <div className="lg:w-96 w-5/6">
            <div className="grid mb-4 w-full">
              <label htmlFor="your-name" className="text-blue1 font-semibold">
                Your Name*
              </label>
              <input
                type="text"
                id="your-name"
                placeholder="Example: John Doe"
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                className="rounded-full lg:w-96 border-gray-400 w-5/6"
              />
            </div>
            <div className="grid mb-4 w-full">
              <label htmlFor="your-email" className="text-blue1 font-semibold">
                Your Email*
              </label>
              <input
                type="email"
                id="your-email"
                placeholder="Example: john@website.com"
                value={yourEmail}
                onChange={(e) => setYourEmail(e.target.value)}
                className="rounded-full lg:w-96 border-gray-400 w-5/6"
              />
            </div>
            <div className="grid mb-4 w-full">
              <label htmlFor="subject" className="text-blue1 font-semibold">
                Subject*
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Example: I want to ask something"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="rounded-full lg:w-96 border-gray-400 w-5/6"
              />
            </div>
            <div className="grid mb-4 w-full">
              <label htmlFor="message" className="text-blue1 font-semibold">
                Message*
              </label>
              <textarea
                id="message"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-2xl lg:w-96 border-gray-400 w-5/6"
              ></textarea>
            </div>
            <div className="grid mb-4">
              <button
                onClick={handlerSubmit}
                type="submit"
                className="rounded-full lg:w-96 w-5/6 text-white font-semibold bg-yellow py-4"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
