import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Form = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(form.name);
    console.log(form.email);
    console.log(form.message);

    emailjs
      .send(
        "service_ew4cudf",
        "template_6g8v66c",
        {
          from_name: form.name,
          to_name: "Enter your name here",
          // Use the user's email address as the sender
          from_email: form.email,
          to_email: "Enter your email here",
          message: form.message,
        },
        "-cr_YfG3jLkb9CO1u"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div>
      <h1 className="text-5xl">Contact us</h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="m-12 flex flex-col gap-8 border-4 p-8 "
      >
        <label className="flex flex-col">
          <span className="font-medium mb-4">Your Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="What's your good name?"
            className=" py-4 px-6  rounded-lg  font-medium border-2"
          />
        </label>
        <label className="flex flex-col">
          <span className=" font-medium mb-4">Your email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="What's your web address?"
            className=" py-4 px-6 rounded-lg outline-none border-2 font-medium"
          />
        </label>
        <label className="flex flex-col">
          <span className=" font-medium mb-4">Your Message</span>
          <textarea
            rows={7}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="What you want to say?"
            className=" py-4 px-6  rounded-lg outline-none border-2 font-medium"
          />
        </label>

        <button
          type="submit"
          className=" py-2 bg-black text-white px-8 rounded-xl outline-none w-fit font-bold shadow-md shadow-primary"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Form;
