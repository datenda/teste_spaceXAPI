import Link from "next/link";
import { Menu } from "lucide-react";  
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/app/components/ui/dropdown-menu";

const navLinks = [
  { href: "/launches", label: "Launches" },
];

export default function Header() {
  return (
    <div className="w-full bg-black text-white py-4 shadow-md">
      <div className="flex justify-between items-center mx-10">
        <Link href="/" className="text-2xl font-bold">
          SpaceX Portal
        </Link>
        <nav className="space-x-6 uppercase text-sm hidden md:flex">
          {navLinks.map((link) => (
            <Link
              className="mr-8 last:mr-0 hover:text-gray-300 transition-colors"
              key={link.href}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-md hover:bg-white/10 transition-colors">
                <Menu size={24} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black text-white border border-gray-700 mt-2">
              {navLinks.map((link) => (
                <DropdownMenuItem key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
