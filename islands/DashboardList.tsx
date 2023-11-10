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
        }).catch((err) => {
          console.log('Unable to snooze contact at this time');
        })
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
        }).catch((err) => {
          console.log('Unable to update contact at this time');
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
        }).catch((err) => {
          console.log('Unable to pull contact at this time');
        });
      }}
    >
      Pull
    </button>
  );
};

const cardStyle = {};
cardStyle.card = "card w-64 bg-default p-4 m-4 flex items-center"
  + " " + "shadow-lg shadow-sky-600 hover:shadow-sky-900"
  + " " + "dark:backdrop-brightness-125 dark:hover:backdrop-brightness-150 dark:hover:shadow-orange-400 dark:shadow-orange-300"
cardStyle.avatar = "mask mask-squircle w-32 h-32 pb-4";
cardStyle.primaryColor = "text-sky-600 dark:text-sky-400";
cardStyle.neutralColor = "text-gray-600 dark:text-gray-400";
cardStyle.highNeutralColor = "text-gray-700 dark:text-gray-300";
cardStyle.secondaryColor = "text-orange-400 dark:text-orange-300";
cardStyle.fullName = "text-xl py-4 text-center font-medium whitespace-nowrap" + " " + cardStyle.highNeutralColor;
cardStyle.fullNameMaxLength = 18;
cardStyle.data = "text-lg text-center"+ " " + cardStyle.neutralColor;
cardStyle.dataSub = "text-md text-center" + " " + cardStyle.primaryColor;
cardStyle.dataDiv = "flex flex-col pb-2";//items-center

function limitText(text, maxLength) {
  if (text.length <= maxLength) {
    return text; 
  } else {
    const truncatedText = text.substring(0, maxLength - 1); 
    const epsilon = '...'; 
    return truncatedText + epsilon;
  }
}

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
    <div className={cardStyle.card}>
      <div class={cardStyle.avatar}>
        <ImageWithFallback
          src={avatarUrl}
          defaultSrc="/images/avatar_icon_green.png"
          alt="Contact avatar"
          className="w-full"
        />
      </div>
      <div className={cardStyle.dataDiv}>
        <h1 className={cardStyle.fullName}>
          {limitText(fullName, cardStyle.fullNameMaxLength)}
        </h1>
        <div className={cardStyle.dataDiv}>
          <span className={cardStyle.data}>Last Connection</span>
          <span className={cardStyle.dataSub}>
            { lastConnection
              ? convertDBDateToPretty(lastConnection)
              : "No Record"}
          </span>
        </div>
        <div className={cardStyle.dataDiv}>
          <span className={cardStyle.data}>Next Connection</span>
          <span className={cardStyle.dataSub}>
            {nextConnection
              ? convertDBDateToPretty(nextConnection)
              : "No Record"}
          </span>
        </div>
        <div className={cardStyle.dataDiv}>
          <span className={cardStyle.data}>Objective</span>
          <span className={cardStyle.dataSub}>
            {period}
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
    <div className={cardStyle.card}>
      <div className={cardStyle.avatar}>
        <ImageWithFallback
          src={avatarUrl}
          defaultSrc="/images/avatar_icon_green.png"
          alt="Contact avatar"
          className="w-full"
        />
      </div>
      <div className={cardStyle.dataDiv}>
        <h2 className={cardStyle.fullName}>
        {limitText(fullName, cardStyle.fullNameMaxLength)}
        </h2>
        <div className={cardStyle.dataDiv}>
          <span className={cardStyle.data}>Last Connection:</span>
          <span className={cardStyle.dataSub}>
            {lastConnection
              ? convertDBDateToPretty(lastConnection)
              : "No Record"}
          </span>
        </div>
        <div className={cardStyle.dataDiv}>
          <span className={cardStyle.data}>Next Connection:</span>
          <span className={cardStyle.dataSub}>
            {nextConnection
              ? convertDBDateToPretty(nextConnection)
              : "No Record"}
          </span>
        </div>
        <div className={cardStyle.dataDiv}>
          <span className={cardStyle.data}>Objective:</span>
          <span className={cardStyle.dataSub}>
            {period}
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
        <PullConnectionButton
          contact={contact}
          refreshSignal={refreshSignal}
        />
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
                <a href={`\\contacts\\${item.id}\\edit\\?redirect=dashboard`}>
                  <DashboardComponent
                    key={nanoid()}
                    contact={item}
                    refreshSignal={refreshSignal}
                  />
                </a>
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
                <a href={`\\contacts\\${item.id}\\edit\\?redirect=dashboard`}>
                  <DashboardUpcomingComponent
                    key={nanoid()}
                    contact={item}
                    refreshSignal={refreshSignal}
                  />
                </a>
              );
            })
          )
          : <EmptyItemsList />}
      </div>
    </div>
  );
}
