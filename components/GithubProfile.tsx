import GitHubAvatarImg from "@/components/GitHubAvatarImg.tsx";
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

export const GithubProfile = (props: { sessionUser: User }) => {
  const { sessionUser } = props;
  return (
    <>
      <GitHubAvatarImg
        login={sessionUser.login}
        size={240}
        class="m-auto"
      />
      <ul>
        <Row
          title="Username"
          text={sessionUser.login}
        />
      </ul>
    </>
  );
};
