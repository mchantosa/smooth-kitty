export default function Divider(props: { textInsert?: string }) {
  const { textInsert } = props;
  return (
    <div class="flex items-center justify-between py-4 px-8">
      <div class="w-full">
        <div class="py-2"></div>
        <div class="border-t opacity-60 py-2"></div>
      </div>
      <div>
        <span class="text-lg text-sky-600 px-4 opacity-60 whitespace-nowrap">
          {textInsert}
        </span>
      </div>
      <div class="w-full">
        <div class="py-2"></div>
        <div class="border-t opacity-60 py-2"></div>
      </div>
    </div>
  );
}
