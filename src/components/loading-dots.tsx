const DELAYS = ['animate-bounce', 'animate-bounce-200', 'animate-bounce-400'];

export default function LoadingDots() {
  return (
    <div className="flex items-center justify-center min-h-[200px]" role="status" aria-live="polite">
      <div className="flex space-x-2" aria-label="Loading">
        {DELAYS.map((delay, i) => (
          <span key={i} className={`w-3 h-3 bg-primary rounded-full ${delay}`} />
        ))}
      </div>
    </div>
  );
}
