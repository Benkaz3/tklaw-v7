const DELAYS = ['-0.3s', '-0.15s', '0s'];

const LoadingDots = () => (
  <div
    className="flex space-x-2 justify-center items-center py-20 bg-transparent"
    role="status"
    aria-live="polite"
  >
    <span className="sr-only">Loading...</span>
    {DELAYS.map((delay, index) => (
      <div
        key={index}
        className="h-8 w-8 bg-buttonBg rounded-full animate-bounce"
        style={{ animationDelay: delay }}
      />
    ))}
  </div>
);

export default LoadingDots;