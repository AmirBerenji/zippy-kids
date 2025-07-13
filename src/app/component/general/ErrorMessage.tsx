interface Props {
  message?: string;
}

export default function ErrorMessage(prop: Props) {
  return (
    <>
      <div>
        {prop.message && (
          <div className="w-full flex h-10 items-center text-red-700 bg-red-200 border rounded-lg px-3  ">
            {prop.message}
          </div>
        )}
      </div>
    </>
  );
}
