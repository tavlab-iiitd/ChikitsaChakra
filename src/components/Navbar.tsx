import { cn } from "@/utils/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

type NavbarProps = {
  className?: string;
};

const Navbar = (props: NavbarProps) => {
  const { className } = props;

  return (
    <nav
      className={cn(
        "py-6 border-b border-b-zinc-200/80 flex justify-between items-center",
        className
      )}
    >
      <Link href="/" className="text-zinc-800 font-semibold text-lg">
        ChikitsaChakra
      </Link>
      <Link
        href="#test-models"
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
          "text-zinc-500"
        )}
      >
        Test Our Models
      </Link>
    </nav>
  );
};

export default Navbar;
