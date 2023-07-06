export default function UserProfie({ params }: any) {
  return (
    <div
      className="flex flex-co items-center justify-center
      min-h-screen py-2
      bg-gray-50
      text-gray-80
          "
    >
      <hr />

      <h1>Profile Page </h1>
      <span>
        <pre>{JSON.stringify(params, null, 2)}</pre>
      </span>
    </div>
  );
}
