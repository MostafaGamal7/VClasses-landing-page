export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-lg">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div
          className="h-14 w-14 rounded-full border-4 border-white/10"
          style={{ borderTopColor: "#fe5e3f", animation: "spin 1s linear infinite" }}
        />
        {/* Brand name */}
        <div
          className="text-3xl font-semibold tracking-wide bg-clip-text text-transparent select-none"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #fe5e3f 0%, #F088D2 50%, #fe5e3f 100%)",
            backgroundSize: "200% 200%",
            animation: "shine 3s linear infinite",
          }}
        >
          VClasses
        </div>
      </div>
    </div>
  );
}