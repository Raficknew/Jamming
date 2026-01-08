export function SearchBar({
  searchValue,
  onChange,
}: {
  searchValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="text"
      name="query"
      value={searchValue}
      onChange={onChange}
      className="bg-white border p-2 indent-2 rounded-sm w-100"
      placeholder="Search by title or artist..."
      required
    />
  );
}
