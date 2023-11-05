import type { ComponentChildren } from "preact";
import type { RouteContext } from "$fresh/server.ts";
import type { SignedInState } from "@/middleware/session.ts";
import Head from "@/components/Head.tsx";
import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/nanoid.ts";

const getDate = () => {
  const date = new Date();
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
};

const sections = [
  {
    title: "",
    content: (
      <>
        These Terms of Service govern your use of InnerCircle. By using
        InnerCircle, you agree to comply with these Terms. Please read them
        carefully.
      </>
    ),
  },
  {
    title: "Acceptance of Terms",
    content:
      "By accessing or using InnerCircle, you acknowledge that you have read, understood, and agreed to be bound by these Terms. If you do not agree to these Terms, you may not use InnerCircle.",
  },
  {
    title: "Description of Service",
    content:
      "InnerCircle is designed to help individuals manage and improve their personal relationships by providing tools for enhancing communication management.",
  },
  {
    title: "User Accounts",
    content: (
      <ul className="list-square pl-4">
        <li className="pl-4 pb-2">
          You must create an account to use InnerCircle. You agree to provide
          accurate and complete information during the registration process.
        </li>
        <li className="pl-4 pb-2">
          You are responsible for maintaining the confidentiality of your
          account credentials and are solely responsible for any activities that
          occur under your account.
        </li>
        <li className="pl-4 pb-4">
          You agree to notify us immediately of any unauthorized use of your
          account or any other security breach.
        </li>
      </ul>
    ),
  },
  {
    title: "User Conduct",
    content: (
      <ul className="list-square pl-4">
        <li className="pl-4 pb-2">
          You agree not to use InnerCircle for any unlawful or prohibited
          purpose.
        </li>
        <li className="pl-4 pb-2">
          You must respect the privacy and consent of individuals whose
          information you store and manage using InnerCircle.
        </li>
        <li className="pl-4 pb-4">
          You must not engage in any activity that disrupts, interferes with, or
          damages InnerCircle or its functionality.
        </li>
      </ul>
    ),
  },
  {
    title: "Privacy and Data",
    content:
      "We take your privacy seriously. Our Privacy Policy, which is incorporated into these Terms, explains how we collect, use, and protect your personal information. By using InnerCircle, you consent to the practices described in the Privacy Policy.",
  },
  {
    title: "Termination",
    content:
      "We reserve the right to terminate your access to InnerCircle at our discretion, without notice, for any violation of these Terms.",
  },
  {
    title: "Disclaimer of Warranties",
    content: (
      <>
        "InnerCircle is provided "as is" without any warranties, expressed or
        implied. We do not guarantee the accuracy, completeness, or reliability
        of the service."
      </>
    ),
  },
  {
    title: "Limitation of Liability",
    content:
      "To the extent permitted by law, we shall not be liable for any direct, indirect, special, incidental, consequential, or punitive damages resulting from your use or inability to use InnerCircle.",
  },
  {
    title: "Changes to Terms",
    content:
      "We may update these Terms from time to time. Your continued use of InnerCircle following the posting of revised Terms constitutes your acceptance of the changes.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms shall be subject to and interpreted in conformity with the laws of the state of Delaware, without consideration of its conflict of law principles.",
  },
  {
    title: "Contact Information",
    content: (
      <>
        For questions or concerns regarding these Terms or InnerCircle, please
        contact us at{" "}
        <a
          href="mailto:meganemmamoore@gmail.com"
          className="text-blue-500 hover:underline"
        >
          meganemmamoore@gmail.com
        </a>.
      </>
    ),
  },
  {
    title: "",
    content:
      "By using InnerCircle, you agree to be bound by these Terms. Please review them periodically for any updates. If you do not agree with these Terms, you must cease using InnerCircle.",
  },
];

interface SectionProps {
  children?: ComponentChildren;
  title: string;
  content: JSX.Element | string;
}

const Section = ({ title, content }: SectionProps) => {
  return (
    <>
      <h2 class="text-2xl font-bold">{title}</h2>
      <p class="my-2 mb-6">{content}</p>
    </>
  );
};

export default async function TermsAndConditions(
  _req: Request,
  ctx: RouteContext<undefined, SignedInState>,
) {
  return (
    <>
      <Head title="Terms of Service" href={ctx.url.href} />
      <main class="flex-1 p-4">
        <div class="hero min-h-screen bg-base-200 p-6">
          <div class="hero-content flex-col lg:flex-row">
            <div>
              <h1 class="text-4xl font-bold pb-6">Terms of Service</h1>
              <h2 class="text-xl font-bold pb-6">Last updated: {getDate()}</h2>
              {sections.map((section) => (
                <Section
                  key={nanoid()}
                  title={section.title}
                  content={section.content}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
