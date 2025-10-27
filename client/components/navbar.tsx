"use client";
import { useState } from "react";
import { Heart, LogOut, Home, Users, Calendar, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { authAPI } from "@/lib/apis/auth/api";

const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg shadow-md">
      <Heart className="w-5 h-5 text-white" fill="white" />
    </div>
    <span className="text-xl font-bold text-gray-800 hidden sm:block">
      CliniPro
    </span>
  </div>
);

const NavLinks = ({
  isMobile = false,
  onLinkClick,
  currentPath,
}: {
  isMobile?: boolean;
  onLinkClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  currentPath: string;
}) => {
  const links = [
    { name: "Dashboard", icon: Home, href: "/dashboard" },
    { name: "Patients", icon: Users, href: "/patient" },
    { name: "Appointments", icon: Calendar, href: "/appointments" },
  ];

  const pathWithoutQuery = currentPath.split("?")[0];
  const segments = pathWithoutQuery
    .split("/")
    .filter((segment) => segment.length > 0);
  const primaryRoute = segments[0] ? `/${segments[0]}` : "/dashboard";

  return (
    <>
      {links.map((link) => {
        const Icon = link.icon;

        const isActive = link.href === primaryRoute;

        const linkClass = isMobile
          ? `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`
          : `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            }`;

        return (
          <a
            key={link.name}
            href={link.href}
            className={linkClass}
            onClick={onLinkClick}
          >
            <Icon className="w-5 h-5" />
            <span>{link.name}</span>
          </a>
        );
      })}
    </>
  );
};

const LogoutButton = ({ isMobile = false }: { isMobile?: boolean }) => {
  const router = useRouter();
  const handleLogout = () => {
    authAPI.logout();
    router.push("/");
  };

  return (
    <Button
      variant={isMobile ? "ghost" : "outline"}
      className={`${
        isMobile
          ? "w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
          : "gap-2 text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
      }`}
      onClick={handleLogout}
    >
      <LogOut className="w-5 h-5" />
      <span>Logout</span>
    </Button>
  );
};

const MobileMenu = ({
  isOpen,
  onClose,
  currentPath,
  onLinkClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-2xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-semibold text-gray-800">Menu</span>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <NavLinks
              isMobile={true}
              onLinkClick={onLinkClick}
              currentPath={currentPath}
            />
          </nav>

          <div className="p-4 border-t">
            <LogoutButton isMobile={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HospitalNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleLinkClick = (href: string) => {
    router.push(href);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          <div className="hidden lg:flex items-center gap-2">
            <NavLinks
              currentPath={pathname}
              onLinkClick={(e) => {
                e.preventDefault();
                handleLinkClick(e.currentTarget.getAttribute("href")!);
              }}
            />
          </div>

          <div className="hidden lg:block">
            <LogoutButton />
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentPath={pathname}
        onLinkClick={(e) => {
          e.preventDefault();
          handleLinkClick(e.currentTarget.getAttribute("href")!);
        }}
      />
    </nav>
  );
}
