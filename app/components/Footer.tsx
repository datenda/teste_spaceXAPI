export default function Footer() {
  return (
    <div className="w-full bg-black text-white py-4">
      <footer className="py-6 text-center text-gray-500 border-t border-gray-700 mt-6">
        {new Date().getFullYear()} SpaceX Launch Tracker
      </footer>
    </div>
  );
}
