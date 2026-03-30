export default function ErrorState({ message }: { message: string }) {
  return (
    <div className="text-center py-10">
      <p className="text-red-500">{message}</p>
    </div>
  );
}
