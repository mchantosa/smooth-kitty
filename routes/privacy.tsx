import type { ComponentChildren } from "preact";
import type { RouteContext } from "$fresh/server.ts";
import type { SignedInState } from "@/middleware/session.ts";
import Head from "@/components/Head.tsx";
import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/nanoid.ts";

const sections = [
  {
    title: "",
    content: (
      <>
        At{" "}
        <a href="/" className="text-blue-500 hover:underline">
          InnerCircle.com
        </a>{" "}
        we take your privacy seriously and are committed to protecting any
        personal information that you provide to us. This privacy statement
        outlines our practices for collecting, using, maintaining, protecting,
        and disclosing personal information that we may obtain from you when you
        visit our website.
      </>
    ),
  },
  {
    title: "Personal Information We Collect",
    content:
      "We may collect personal information, such as your name, email address, and other contact information, when you voluntarily submit it to us through our website's contact form or subscription form.",
  },
  {
    title: "How We Use Your Personal Information",
    content:
      "We use your personal information only for the purpose of responding to your inquiry or delivering the services that you requested, such as sending newsletters or promotional materials. We will not share, rent, or sell your personal information to any third party.",
  },
  {
    title: "How We Share Your Personal Information",
    content:
      "We take reasonable measures to ensure that your personal information is protected from unauthorized access, disclosure, alteration, or destruction. However, please note that no transmission of data over the internet or any other public network can be guaranteed to be 100% secure.",
  },
  {
    title: "Your Choices About Your Personal Information",
    content: (
      <>
        If you would like to review, correct, update, or delete the personal
        information that you have provided to us via our website, please contact
        us at{" "}
        <a
          href="mailto:meganemmamoore@gmail.com"
          className="text-blue-500 hover:underline"
        >
          meganemmamoore@gmail.com
        </a>
      </>
    ),
  },
  {
    title: "How We Use Cookies and Tracking Technologies",
    content:
      "We may use cookies and other tracking technologies to collect information about your use of our website. These technologies help us analyze website traffic, personalize content, and measure the effectiveness of our marketing campaigns. You can choose to disable cookies through your browser settings, although this may limit your ability to access certain features of our website.",
  },
  {
    title: "Children's Privacy",
    content:
      "Our website is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under the age of 13 without the consent of their parent or guardian.",
  },
  {
    title: "External Websites",
    content:
      "Our website may contain links to external websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the privacy policy and terms of service of every site you visit. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites, products, or services.",
  },
  {
    title: "Changes to This Privacy Statement",
    content:
      "We may update this privacy statement from time to time to reflect changes in our information practices or legal obligations. We encourage you to review this statement periodically to stay informed about our privacy practices.",
  },
  {
    title: "Contact Us",
    content: (
      <>
        If you have any questions or concerns about this privacy statement or
        our handling of your personal information, please contact us at{" "}
        <a
          href="mailto:meganemmamoore@gmail.com"
          className="text-blue-500 hover:underline"
        >
          meganemmamoore@gmail.com
        </a>
      </>
    ),
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

export default async function Privacy(
  _req: Request,
  ctx: RouteContext<undefined, SignedInState>,
) {
  return (
    <>
      <Head title="Privacy" href={ctx.url.href} />
      <main class="flex-1 p-4">
        <div class="hero min-h-screen bg-base-200 p-6">
          <div class="hero-content flex-col lg:flex-row">
            <div>
              <h1 class="text-4xl font-bold pb-6">Privacy Policy</h1>

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
