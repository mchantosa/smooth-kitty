// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { RouteContext } from "$fresh/server.ts";
import type { SignedInState } from "@/middleware/session.ts";
import Head from "@/components/Head.tsx";

// const stepColor = "indigo-600"
const stepColor = "sky-600";

const stepStyles = {};
stepStyles.stepConnectorBase =
  "absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5";
stepStyles.stepConnectorDark = stepStyles.stepConnectorBase + " " +
  `bg-${stepColor}`;
stepStyles.stepConnectorLight = stepStyles.stepConnectorBase + " " +
  "bg-gray-300";
stepStyles.stepBase =
  "relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-white";
stepStyles.completedStep = stepStyles.stepBase + " " + `bg-${stepColor}`; //group-hover:bg-indigo-800
stepStyles.currentStep = stepStyles.stepBase + " " + "bg-white border-2" + " " +
  `border-${stepColor}`;
stepStyles.upcomingStep =
  "h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300";
stepStyles.head = "font-medium text-xl py-2";
stepStyles.headNotActive = stepStyles.head + " " + "text-gray-500";
stepStyles.headActive = stepStyles.head + " " + `text-${stepColor}`;
stepStyles.content = "text-lg text-gray-600 dark:text-gray-400 py-2";
stepStyles.contentSub =
  "text-md text-gray-600 dark:text-gray-400 pl-4 pr-4 py-2";
stepStyles.contentSubSub =
  "text-md text-orange-500 dark:text-orange-300 pl-8 pr-4 py-2";
stepStyles.contentSubSubNote =
  "text-sm text-orange-600 dark:text-orange-400 pl-8 pr-4 py-2";

// deno-lint-ignore require-await
export default async function Welcome(
  _req: Request,
  ctx: RouteContext<undefined, SignedInState>,
) {
  return (
    <>
      <Head title="How to use" href={ctx.url.href} />
      <main class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
        <nav aria-label="Progress">
          <ol role="list" class="overflow-hidden">
            <li class="relative pb-10">
              <div class={stepStyles.stepConnectorDark} aria-hidden="true">
              </div>
              {/* <!-- Complete Step --> */}
              <a href="#" class="group relative flex items-start">
                <span class="flex h-9 items-center">
                  <span class={stepStyles.completedStep}>
                    <strong>1</strong>
                  </span>
                </span>
                <span class="ml-4 flex min-w-0 flex-col">
                  <span class={stepStyles.headActive}>Create account</span>
                </span>
              </a>
            </li>
            <li class="relative pb-10">
              <div class={stepStyles.stepConnectorDark} aria-hidden="true">
              </div>
              <a href="#" class="group relative flex items-start">
                <span class="flex h-9 items-center">
                  <span class={stepStyles.completedStep}>
                    <strong>2</strong>
                  </span>
                </span>
                <span class="ml-4 flex min-w-0 flex-col">
                  <span class={stepStyles.headActive}>Create Contacts</span>
                  <span class={stepStyles.content}>
                    This is where you get to do some analysis and reflection
                  </span>
                  <span class={stepStyles.contentSub}>
                    With whom do you want to maintain meaningful connections?
                  </span>
                  <span class={stepStyles.contentSubSub}>
                    Mother, Spouse, Child, Childhood friend...?
                  </span>
                  <span class={stepStyles.contentSub}>
                    How many people do I realistically have time to meaningfully
                    connect with?
                  </span>
                  <span class={stepStyles.contentSubSub}>40?</span>
                  <span class={stepStyles.contentSub}>
                    How often do you want to connect with each person?
                  </span>
                  <span class={stepStyles.contentSubSub}>
                    Weekly, Biweekly, Monthly, Quarterly, Birthdays & Holidays?
                  </span>
                  <span class={stepStyles.contentSub}>
                    How do you communicate with each person?
                  </span>
                  <span class={stepStyles.contentSubSub}>
                    <strong>Mom:</strong> Weekly call
                  </span>
                  <span class={stepStyles.contentSubSub}>
                    <strong>Spouse:</strong> Weekly lunch date
                  </span>
                  <span class={stepStyles.contentSubSub}>
                    <strong>Daughter:</strong> Biweekly taco one-on-one
                  </span>
                  <span class={stepStyles.contentSubSub}>
                    <strong>Sister-in-law:</strong> monthly text exchange...
                  </span>
                </span>
              </a>
            </li>
            <li class="relative pb-10">
              <div class={stepStyles.stepConnectorDark} aria-hidden="true">
              </div>
              <a href="#" class="group relative flex items-start">
                <span class="flex h-9 items-center">
                  <span class={stepStyles.completedStep}>
                    <strong>3</strong>
                  </span>
                </span>
                <span class="ml-4 flex min-w-0 flex-col">
                  <span class={stepStyles.headActive}>Populate Dashboard</span>
                  <span class={stepStyles.content}>
                    What will the Dashboard look like automatically?
                  </span>
                  <span class={stepStyles.contentSub}>
                    <strong>
                      By default, every contact you add will populate your board
                      the fist Sunday after creation.
                    </strong>
                  </span>
                  <span class={stepStyles.contentSub}>
                    The Dashboard will have a board that spans last Sunday- next
                    Saturday
                  </span>
                  <span class={stepStyles.contentSub}>
                    The board contains contact cards from your contact list for
                    this week
                  </span>
                  <span class={stepStyles.contentSub}>
                    When you create a contact, it will set that contact's next
                    contact date to next Sunday (next week).
                  </span>
                  <span class={stepStyles.content}>
                    How to populate this week's board?
                  </span>
                  <span class={stepStyles.contentSub}>
                    Pull a contact card from your "Coming Up" list
                  </span>
                  <span class={stepStyles.contentSubSub}>
                    <strong>1.</strong>{"  "}
                    From your Dashboard, find your "Coming Up" list
                  </span>
                  <span class={stepStyles.contentSubSub}>
                    <strong>2.</strong>{"  "}
                    Find your contact card and select the PULL button
                  </span>
                </span>
              </a>
            </li>
            <li class="relative pb-10">
              {/* <div class={stepStyles.stepConnectorDark} aria-hidden="true"></div> */}
              <a href="#" class="group relative flex items-start">
                <span class="flex h-9 items-center" aria-hidden="true">
                  <span class="flex h-9 items-center">
                    <span class={stepStyles.completedStep}>
                      <strong>4</strong>
                    </span>
                  </span>
                </span>
                <span class="ml-4 flex min-w-0 flex-col">
                  <span class={stepStyles.headActive}>Establish a Cadence</span>
                  {/* Concept */}
                  <span class={stepStyles.content}>
                    What is a Cadence?
                  </span>
                  <span class={stepStyles.contentSub}>
                    <strong>
                      I am looking for a consistent rhythm of connections with
                      my close personal contacts.
                    </strong>
                  </span>
                  <span class={stepStyles.contentSub}>
                    I don't want to talk to 50 people one week and 0 people the
                    next week.
                  </span>
                  <span class={stepStyles.contentSub}>
                    I think a comfortable pace for me to reach out and
                    meaningfully connect with people is 15 contacts per week.
                  </span>
                  <span class={stepStyles.contentSub}>
                    If I can connect with 15 contacts per week and have 40
                    contacts set to a weekly objective, I cannot achieve my
                    objectives.
                  </span>
                  {/* Tools */}
                  <span class={stepStyles.content}>
                    What tools do I have to manage my cadence?
                  </span>
                  <span class={stepStyles.contentSub}>
                    Pull a contact
                  </span>
                  <span class={stepStyles.contentSubSub}>
                    Find contact card in "Coming Up" list and select PULL
                  </span>
                  <span
                    class={stepStyles.contentSubSubNote}
                  >
                    <strong>Effect:</strong>{" "}
                    This will set the contact's next contact date to last Sunday
                  </span>
                  <span class={stepStyles.contentSub}>
                    Snooze a contact
                  </span>
                  <span class={stepStyles.contentSubSub}>
                    Choose a contact from your board to SNOOZE
                  </span>
                  <span class={stepStyles.contentSubSubNote}>
                    <strong>Effect:</strong>{"  "}
                    This will set the contact's next contact date to next Sunday
                  </span>
                  <span class={stepStyles.contentSub}>
                    Connect with contact
                  </span>
                  <span class={stepStyles.contentSubSub}>
                    If you've had a meaningful connection with a contact from
                    your board, select CONNECT
                  </span>
                  <span class={stepStyles.contentSubSubNote}>
                    <strong>Effect:</strong>{" "}
                    This will set the contact's next contact date in accordance
                    with their objective
                  </span>
                  <span class={stepStyles.contentSub}>
                    Change a contact's objective
                  </span>
                  <span class={stepStyles.contentSubSub}>
                    Go to contact edit page and change the objective
                  </span>
                  <span class={stepStyles.contentSubSubNote}>
                    <strong>Effect:</strong>{" "}
                    This will not change the contact's next contact date, but it
                    will change the rate at which the contact populates your
                    board
                  </span>
                  {/* Methodology */}
                  <span class={stepStyles.content}>
                    What is my methodology?
                  </span>
                  <span class={stepStyles.contentSub}>
                    My personal cadence is 15 contacts per week
                  </span>
                  <span class={stepStyles.contentSubSub}>
                    This is my personal number as an example
                  </span>
                  <span class={stepStyles.contentSubSub}>
                    This is a feeling that might change at any time
                  </span>
                  <span class={stepStyles.contentSubSub}>
                    This isn't data tracked by the application
                  </span>
                  <span class={stepStyles.contentSub}>
                    If my dashboard has less than 15
                  </span>
                  <span class={stepStyles.contentSubSub}>
                    I'm going to PULL in a contact card from my "Coming Up"
                    list.
                  </span>
                  <span class={stepStyles.contentSub}>
                    If my dashboard greater than 15
                  </span>
                  <span class={stepStyles.contentSubSub}>
                    <strong>1.</strong>{"  "}
                    I'm going assess if I need to adjust my objectives and
                    choose a contact with whom to connect less frequently.
                  </span>
                  <span class={stepStyles.contentSubSub}>
                    <strong>2.</strong>{"  "}
                    If my objectives are reasonable, I'm going to SNOOZE a
                    contact from my board.
                  </span>
                  <span class={stepStyles.contentSub}>
                    Overtime, your pacing should grow more consistent, and you
                    can adjust and modify your objectives
                  </span>
                </span>
              </a>
            </li>
          </ol>
        </nav>
      </main>
    </>
  );
}
