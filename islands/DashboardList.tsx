// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { useSignal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
import type { Contact } from "@/shared/data/contact.ts";
import { LINK_STYLES } from "@/utils/constants.ts";
import IconInfo from "tabler_icons_tsx/info-circle.tsx";
import { fetchValues } from "@/utils/islands.ts";
import { nanoid } from "https://deno.land/x/nanoid/mod.ts";
import Divider from "@/components/Divider.tsx";
import { effect } from "@preact/signals";
import { add, compareAsc, format } from "date-fns";
import {
  convertDateToDB,
  convertDBDateToPretty,
  getLastSundayOrTodayDate,
  getLastSundayOrTodayDateDB,
  getNextSaturdayOrTodayDate,
  getNextSundayDateDB,
} from "@/utils/dates.ts";
import axios from "axios";
import { generateContactForm } from "@/shared/data/contact.ts";

function EmptyItemsList() {
  return (
    <>
      <div class="flex flex-col justify-center items-center gap-2">
        <div class="flex flex-col items-center gap-2 pt-16">
          <IconInfo class="w-10 h-10 text-gray-400 dark:text-gray-600" />
          <p class="text-center font-medium">No items found</p>
          <p class="text-center font-medium">
            Pull items from 'Coming Up' to fill your board
          </p>
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
  } = contact;

  return (
    <div className="card w-64 bg-default shadow-xl p-4 m-2">
      <figure>
        <img
          src={avatarUrl || "/images/avatar_icon_green.png"}
          alt="avatar"
        />
      </figure>
      <div className="flex flex-col h-2/4 p-2">
        <h2 className="card-title opacity-60 pb-8">
          {fullName}
        </h2>
        <div>
          <strong className="opacity-60">Last Connection:</strong>
          <br></br>
          <span className="pl-4 text-accent whitespace-nowrap">
            {convertDBDateToPretty(lastConnection)}
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <UpdateConnectionButton
          contact={contact}
          refreshSignal={refreshSignal}
        />
        <SnoozeContactButton contact={contact} refreshSignal={refreshSignal} />
      </div>
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
  } = contact;

  return (
    <div className="card w-64 bg-default shadow-xl p-4 m-2">
      <figure>
        <img
          src={avatarUrl || "/images/avatar_icon_green.png"}
          alt="avatar"
        />
      </figure>
      <div className="flex flex-col h-2/4 p-2">
        <h2 className="card-title opacity-60 pb-8">
          {fullName}
        </h2>
        <div>
          <strong className="opacity-60">Next Connection:</strong>
          <br></br>
          <span className="pl-4 text-accent whitespace-nowrap">
            {convertDBDateToPretty(nextConnection)}
          </span>
        </div>
      </div>
      <div className="flex justify-center">
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
        {allContactsSig.value
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
