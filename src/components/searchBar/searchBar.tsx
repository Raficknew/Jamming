export function SearchBar({
  searchValue,
  onChange,
  onSubmit,
}: {
  searchValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}) {
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        type="text"
        name="query"
        value={searchValue}
        onChange={onChange}
        className="bg-white border p-2 indent-2 rounded-sm"
        placeholder="Search..."
        required
      />
      <button
        type="submit"
        className="w-full bg-violet-400 px-4 py-2 rounded-full"
      >
        Search
      </button>
    </form>
  );
}
