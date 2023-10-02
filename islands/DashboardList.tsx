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
import { compareAsc, format, add} from 'date-fns';
import {getLastSundayOrTodayDate, getNextSaturdayOrTodayDate} from "@/utils/dates.ts";

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
}) => {
  const { contact} = props;
  return (
    <button
      className="btn btn-primary btn-xs m-1"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        //contact.nextConnection = format(add(new Date(contact.nextConnection), {days: 7}),'yyyy/MM/dd')

        console.log(`Snoozing: ${contactId}...`);
      }}
    >
      Snooze
    </button>
  );
};

const UpdateConnectionButton = (props: {
  contact: Contact;
}) => {
  const { contact} = props;
  return (
    <button
      className="btn btn-primary btn-xs m-1"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        console.log(`Updating connection for: ${contactId}...`);
      }}
    >
      Connected
    </button>
  );
};

const PullConnectionButton = (props: {
  contact: Contact
}) => {
  const { contact} = props;
  return (
    <button
      className="btn btn-primary btn-xs m-1"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        console.log(`Pulling connection for: ${contactId}...`);
      }}
    >
      Pull
    </button>
  );
};

const DashboardComponent = (
  { contact }: {
    contact: Contact;
  },
) => {
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
          src={avatarUrl || '/images/avatar_icon_green.png'}
          alt="avatar"
        />
      </figure>
      <div className="flex flex-col h-2/4 p-2">
        <h2 className="card-title opacity-60 pb-8">
          {fullName}
        </h2>
        <div>
          <strong className="opacity-60">Last Connection:</strong><br></br>
          <span className="pl-4 text-accent whitespace-nowrap">
            {lastConnection}
          </span>
          </div>
        </div>
        <div className="flex justify-center">
          <UpdateConnectionButton contactId={id} />
          <SnoozeContactButton contactId={id} />
        </div>
    </div>
  );
};

const DashboardUpcomingComponent = (
  { contact }: {
    contact: Contact;
  },
) => {
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
          src={avatarUrl || '/images/avatar_icon_green.png'}
          alt="avatar"
        />
      </figure>
      <div className="flex flex-col h-2/4 p-2">
        <h2 className="card-title opacity-60 pb-8">
          {fullName}
        </h2>
        <div>
          <strong className="opacity-60">Next Connection:</strong><br></br>
          <span className="pl-4 text-accent whitespace-nowrap">
            {nextConnection}
          </span>
          </div>
        </div>
        <div className="flex justify-center">
          <PullConnectionButton contactId={id} />
        </div>
    </div>
  );
};


export default function DashboardList(props: {
  endpoint: string;
}) {
  const allContactsSig = useSignal<Contact[]>([]);
  const cursorSig = useSignal("");//just keeping for consistancey sake, not using as a signal
  const isLoadingSig = useSignal(false);
  const dashBoardContactsSig = useSignal<Contact[]>([]);
  const upcomingContactsSig = useSignal<Contact[]>([]);
  
  async function loadContacts() {
    try {
      const { values, cursor } = await fetchValues<Contact>(
        props.endpoint, cursorSig.value,
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      allContactsSig.value = [...values]
    } catch (error) {
      console.error(error.message);
    } finally {
      isLoadingSig.value = false;
    }
  }

  effect(() => {//runs every time a signal changes
    //const start = getLastSundayOrTodayDate();
    const end = getNextSaturdayOrTodayDate();
    
    dashBoardContactsSig.value = allContactsSig.value.filter((contact) =>{
      const nextConnection = new Date(contact.nextConnection);
      // console.log('start: ',start)
      // console.log('end: ',end)
      // console.log('nextConnection: ',nextConnection)
      // console.log('comparison: ',compareAsc(start, nextConnection))
      return (
        compareAsc(nextConnection, end) <= 0
      )
    }).sort((a,b) => {
      if(!a.lastConnection) return -1;
      if(!b.lastConnection) return 1;
      return a.lastConnection.localeCompare(b.lastConnection)
    });
    upcomingContactsSig.value = allContactsSig.value.filter((contact) =>{
      const nextConnection = new Date(contact.nextConnection);
      return (
        compareAsc(end, nextConnection) < 0
      )
    }).sort((a,b) => {
      return a.nextConnection.localeCompare(b.nextConnection)
    });
  })

  useEffect(async () => {//runs every time a component renders
    await loadContacts();
  }, []);

  return (
    <div>
      <div class="flex flex-wrap justify-center">
        {allContactsSig.value
          ? (
            dashBoardContactsSig.value.map((item, id) => {
              return <DashboardComponent key={nanoid()} contact={item} />;
            })
          )
          : <EmptyItemsList />}
      </div>
      <Divider textInsert="Coming Up" />
      <div class="flex flex-wrap justify-center">
        {upcomingContactsSig.value
          ? (
            upcomingContactsSig.value.map((item, id) => {
              return <DashboardUpcomingComponent key={nanoid()} contact={item} />;
            })
          )
          : <EmptyItemsList />}
      </div>
    </div>
  );
}
