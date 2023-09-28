import type { User } from "@/utils/db.ts";

export const FacebookProfile = (props: { sessionUser: User }) => {
  const { sessionUser } = props;
  return (
    <>
      <p>Todo: Add profile page</p>
    </>
  );
};
