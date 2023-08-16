import axiod from "https://deno.land/x/axiod/mod.ts";

export default function DeleteContactButton(props: any) {
  return (
    <button
      className="badge bdg-btn-remove badge-neutral"
      onClick={(e) => {
        e.preventDefault();

        console.log(`deleting ${props.contactId}...`);

        axiod
          .delete(`/api/contacts/${props.contactId}`)
          .then((response) => {
            console.log(response);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }}
    >
      remove
    </button>
  );
}
