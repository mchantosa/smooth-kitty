import type { Handlers, PageProps } from "$fresh/server.ts";
import { Page } from "@/components/Page.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
  },
};

export default function IndexPage(props: PageProps<any>) {
  return (
    <>
      <Page title={"Connections"} loggedIn={Boolean(props.data.session)}>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <div class="mr-6">
              <img
                src="/images/connections-logo.png"
                className="max-w-sm rounded-lg shadow-2xl mb-6"
              />
              <img
                src="/images/coffee_toast.jpg"
                className="max-w-sm rounded-lg shadow-2xl mb-6"
              />
              <img
                src="/images/coffee_desk.jpg"
                className="max-w-sm rounded-lg shadow-2xl"
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold">Our Mission</h1>
              <p className="py-6">
                To help you stay connected to those you truly care about. This
                is designed to be a medium agnostic, non-calendered, warm and
                user friendly, communication asset, intended to support a small
                to medium set of contacts. So why use this manager?
              </p>
              <h2 className="text-2xl font-bold">Medium Agnostic</h2>
              <p class="my-2">
                Much of how we communicate now is determined by the
                communication mediums we share. Quitting Facebook is like
                changing your phone number. Is a friend any less a friend
                because you grew disenchanted with WhatsApp, or turned off with
                Twitter? This app organizes your communications around people,
                not communication mediums.
              </p>
              <h2 className="text-2xl font-bold">Non-calendered </h2>
              <p class="my-2">
                What does your work-life balance calendar; look like? Meetings,
                dentist appointments, parent teacher conferences? Adding
                periodic communication fidelity to your work-life balance
                calendar risks making connecting with your nearest and dearest a
                stressful task whose alert will be swiped away and dismissed.
                This app provides you with a weekly objectives, and rolls
                uncompleted objectives into the following week.
              </p>
              <h2 className="text-2xl font-bold">Warm and user friendly </h2>
              <p class="my-2">
                This app has no calender and no alerts, nor will it integrate
                with amy of your communication mediums. You get what you put
                into it. Carve out some time in your day, 15 min before bed, a
                cup of coffee in the morning, a lovely ferry ride on your
                commute home... Use this time to tender your list, and enjoy it.
                This is the pattern of behavior this application is intended to
                support.
              </p>
              <h2 className="text-2xl font-bold">
                Small-medium set of contacts
              </h2>
              <p class="my-2 mb-6">
                It is possible to have thousands of "friends" across a
                half-dozen applications and still be completely alone.
                Communication is not manifested through connectivity, it is
                manifested through behavior. This application is intended to
                help you evaluate how much communication you want to maintain
                and prioritize with whom you wish to maintain it.
              </p>

              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}
