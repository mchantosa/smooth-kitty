// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import type { Contact } from "@/shared/data/contact.ts";
import IconInfo from "tabler_icons_tsx/info-circle.tsx";
import { fetchValues } from "@/utils/islands.ts";
import { nanoid } from "https://deno.land/x/nanoid/mod.ts";
import Divider from "@/components/Divider.tsx";
import { effect } from "@preact/signals";
import { add, compareAsc } from "date-fns";
import {
  convertDateToDB,
  convertDBDateToPretty,
  getLastSundayOrTodayDateDB,
  getNextSaturdayOrTodayDate,
  getNextSundayDateDB,
} from "@/utils/dates.ts";
import axios from "axiod";
import { generateContactForm } from "@/shared/data/contact.ts";
import ImageWithFallback from "@/islands/ImageWithFallback.tsx";

function EmptyItemsList() {
  return (
    <>
      <div class="flex flex-col justify-center items-center gap-2">
        <div class="flex flex-col items-center gap-2 py-16">
          <h1 class="text-2xl text-sky-600 text-center font-medium pb-8">
            No items found
          </h1>
          <p class="text-center font-medium">
            <span className="text-orange-500 dark:text-orange-300">PULL</span>
            {" "}
            contacts from Coming Up to populate your board
          </p>
          <p>or</p>
          <a
            href="/contacts/new"
            class="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-orange-500 dark:text-orange-300 hover:underline"
          >
            Add a contact
          </a>
        </div>
      </div>
    </>
  );
}

const SnoozeContactButton = (props: {
  contact: Contact;
  refreshSignal: () => void;
}) => {
  const { contact, refreshSignal } = props;
  return (
    <button
      className="btn btn-primary btn-xs m-1"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        const tempContact = Object.assign({}, contact);
        tempContact.nextConnection = getNextSundayDateDB();
        const formData = generateContactForm(tempContact);

        axios.post("/api/contacts", formData).then((res) => { //push to DB
          if (res.status === 200) {
            contact.nextConnection = getNextSundayDateDB(); //update the UI
            refreshSignal(); //trigger component render
          }
        });
      }}
    >
      Snooze
    </button>
  );
};

const UpdateConnectionButton = (props: {
  contact: Contact;
  refreshSignal: () => void;
}) => {
  const { contact, refreshSignal } = props;
  return (
    <button
      className="btn btn-primary btn-xs m-1"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        const tempContact = Object.assign({}, contact);
        let baseDate = new Date();
        const period = contact.period;

        if (period === "Weekly") {
          tempContact.nextConnection = convertDateToDB(
            add(baseDate, { weeks: 1 }),
          );
        } else if (period === "Biweekly") {
          tempContact.nextConnection = convertDateToDB(
            add(baseDate, { weeks: 2 }),
          );
        } else if (period === "Monthly") {
          tempContact.nextConnection = convertDateToDB(
            add(baseDate, { months: 1 }),
          );
        } else if (period === "Quarterly") {
          tempContact.nextConnection = convertDateToDB(
            add(baseDate, { months: 3 }),
          );
        }

        const tempNextConnection = tempContact.nextConnection;
        const tempLastConnection = convertDateToDB(new Date());
        tempContact.lastConnection = tempLastConnection;
        const formData = generateContactForm(tempContact);

        axios.post("/api/contacts", formData).then((res) => { //push to DB
          if (res.status === 200) {
            contact.nextConnection = tempNextConnection; //update the UI
            contact.lastConnection = tempLastConnection; //update the UI
            refreshSignal(); //trigger component render
          }
        });
      }}
    >
      Connected
    </button>
  );
};

const PullConnectionButton = (props: {
  contact: Contact;
  refreshSignal: () => void;
}) => {
  const { contact, refreshSignal } = props;
  return (
    <button
      className="btn btn-primary btn-xs m-1"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        const tempContact = Object.assign({}, contact);
        tempContact.nextConnection = getLastSundayOrTodayDateDB();

        const formData = generateContactForm(tempContact);

        axios.post("/api/contacts", formData).then((res) => { //push to DB
          if (res.status === 200) {
            contact.nextConnection = getLastSundayOrTodayDateDB(); //update the UI
            refreshSignal(); //trigger component render
          }
        });
      }}
    >
      Pull
    </button>
  );
};

const DashboardComponent = (
  props: {
    contact: Contact;
    refreshSignal: () => void;
  },
) => {
  const { contact, refreshSignal } = props;
  const {
    id,
    avatarUrl,
    fullName,
    nextConnection,
    lastConnection,
    period,
  } = contact;

  return (
    <div className="card w-64 bg-default shadow-xl p-4 m-2 flex items-center">
      <div class="mask mask-squircle w-32 h-32 pb-4">
        <ImageWithFallback
          src={avatarUrl}
          defaultSrc="/images/avatar_icon_green.png"
          alt="Contact avatar"
          className="w-full"
        />
      </div>
      <div className="flex flex-col h-2/4 p-2 pb-4">
        <h2 className="card-title opacity-60 text-center pb-2">
          {fullName}
        </h2>
        <div className="flex flex-col items-center">
          <strong className="opacity-60">Last Connection:</strong>
          <span className="text-accent whitespace-nowrap">
            {lastConnection
              ? convertDBDateToPretty(lastConnection)
              : "No Record"}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <strong className="opacity-60">Next Connection:</strong>
          <span className="text-accent whitespace-nowrap">
            {convertDBDateToPretty(nextConnection)}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <strong className="opacity-60">Objective:</strong>
          <span className="text-accent whitespace-nowrap">
            {period}
          </span>
        </div>
        <div className="flex flex-col h-2/4 p-2 pb-4">
          <h2 className="card-title opacity-60 text-center pb-2">
            {fullName}
          </h2>
          <div className="flex flex-col items-center">
            <strong className="opacity-60">Last Connection:</strong>
            <span className="text-accent whitespace-nowrap">
              {convertDBDateToPretty(lastConnection)}
            </span>
          </div>
        </div>
        <div className="flex justify-center pb-4">
          <UpdateConnectionButton
            contact={contact}
            refreshSignal={refreshSignal}
          />
          <SnoozeContactButton
            contact={contact}
            refreshSignal={refreshSignal}
          />
        </div>
      </a>
    </div>
  );
};

const DashboardUpcomingComponent = (
  props: {
    contact: Contact;
    refreshSignal: () => void;
  },
) => {
  const { contact, refreshSignal } = props;
  const {
    id,
    avatarUrl,
    fullName,
    nextConnection,
    lastConnection,
    period,
  } = contact;

  return (
    <div className="card w-64 bg-default backdrop-brightness-125 hover:backdrop-brightness-150 shadow-xl p-4 m-2 flex items-center">
      <div class="mask mask-squircle w-32 h-32 pb-4">
        <ImageWithFallback
          src={avatarUrl}
          defaultSrc="/images/avatar_icon_green.png"
          alt="Contact avatar"
          className="w-full"
        />
      </div>
      <div className="flex flex-col h-2/4 p-2 pb-4">
        <h2 className="card-title opacity-60 pb-8 text-center pb-2">
          {fullName}
        </h2>
        <div className="flex flex-col items-center">
          <strong className="opacity-60">Last Connection:</strong>
          <span className="text-accent whitespace-nowrap">
            {lastConnection
              ? convertDBDateToPretty(lastConnection)
              : "No Record"}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <strong className="opacity-60">Next Connection:</strong>
          <span className="text-accent whitespace-nowrap">
            {convertDBDateToPretty(nextConnection)}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <strong className="opacity-60">Objective:</strong>
          <span className="text-accent whitespace-nowrap">
            {period}
          </span>
        </div>
      </div>
      <div className="flex justify-center pb-4">
        <PullConnectionButton contact={contact} refreshSignal={refreshSignal} />
      </div>
    </div>
  );
};

export default function DashboardList(props: {
  endpoint: string;
}) {
  const allContactsSig = useSignal<Contact[]>([]);
  const cursorSig = useSignal(""); //just keeping for consistancey sake, not using as a signal
  const isLoadingSig = useSignal(false);
  const dashBoardContactsSig = useSignal<Contact[]>([]);
  const upcomingContactsSig = useSignal<Contact[]>([]);

  const refreshSignal = () => {
    allContactsSig.value = [...allContactsSig.value];
  };

  async function loadContacts() {
    try {
      const { values, cursor } = await fetchValues<Contact>(
        props.endpoint,
        cursorSig.value,
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      allContactsSig.value = [...values];
    } catch (error) {
      console.error(error.message);
    } finally {
      isLoadingSig.value = false;
    }
  }

  effect(() => { //runs every time a signal changes
    const end = getNextSaturdayOrTodayDate();

    dashBoardContactsSig.value = allContactsSig.value.filter((contact) => {
      const nextConnection = new Date(contact.nextConnection);
      return (
        compareAsc(nextConnection, end) <= 0
      );
    }).sort((a, b) => {
      if (!a.lastConnection) return -1;
      if (!b.lastConnection) return 1;
      return a.lastConnection.localeCompare(b.lastConnection);
    });

    upcomingContactsSig.value = allContactsSig.value.filter((contact) => {
      const nextConnection = new Date(contact.nextConnection);
      return (
        compareAsc(end, nextConnection) < 0
      );
    }).sort((a, b) => {
      return a.nextConnection.localeCompare(b.nextConnection);
    });
  });

  useEffect(async () => { //runs every time a component renders
    await loadContacts();
  }, []);

  return (
    <div>
      <div class="flex flex-wrap justify-center">
        {dashBoardContactsSig.value && dashBoardContactsSig.value.length > 0
          ? (
            dashBoardContactsSig.value.map((item, id) => {
              return (
                <DashboardComponent
                  key={nanoid()}
                  contact={item}
                  refreshSignal={refreshSignal}
                />
              );
            })
          )
          : <EmptyItemsList />}
      </div>
      <Divider textInsert="Coming Up" />
      <div class="flex flex-wrap justify-center">
        {upcomingContactsSig.value
          ? (
            upcomingContactsSig.value.map((item, id) => {
              return (
                <DashboardUpcomingComponent
                  key={nanoid()}
                  contact={item}
                  refreshSignal={refreshSignal}
                />
              );
            })
          )
          : <EmptyItemsList />}
      </div>
    </div>
  );
}
