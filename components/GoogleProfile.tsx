import type { User } from "@/utils/db.ts";
import { ComponentChild } from "preact";

function Row(
  props: { title: string; children?: ComponentChild; text: string },
) {
  return (
    <li class="py-4">
      <div class="flex flex-wrap justify-between">
        <span>
          <strong>{props.title}</strong>
        </span>
        {props.children && <span>{props.children}</span>}
      </div>
      <p>
        {props.text}
      </p>
    </li>
  );
}

export const GoogleProfile = (props: { sessionUser: User }) => {
  const { sessionUser } = props;
  return (
    <>
      <img
        src={sessionUser?.profilePictureUrl}
        width={240}
        class="m-auto rounded rounded-full"
      />
      <ul>
        <Row
          title="Full name"
          text={`${sessionUser?.firstName} ${sessionUser?.lastName}`}
        />
        <Row
          title="Email"
          text={sessionUser?.login}
        />
      </ul>
    </>
  );
};
