export const ContactSearch = (props) => {
  const { searchText } = props;
  const onKeyUp = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    searchText.value = target?.value;
  };
  return (
    <>
      <style>
        {`.input:focus {
            outline-style: auto;
            outline-offset: 0;
          }`}
      </style>
      <div class="mb-4">
        <input
          type="text"
          placeholder="Search contacts"
          className="input input-bordered w-full max-w-xs"
          onKeyUp={onKeyUp}
        />
      </div>
    </>
  );
};
