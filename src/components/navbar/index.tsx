import React from "react";
import { AiOutlineFontSize } from "react-icons/ai";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar border-b-stone-500 border-b px-0">
      <div className="flex-1">
        <Link
          href="/"
          className="btn rounded-none text-stone-200 bg-stone-950 hover:bg-stone-950 hover:border-stone-500 border border-stone-950 normal-case text-xl"
        >
          Blog
        </Link>
      </div>
      <button className="btn rounded-none btn-ghost normal-case">
        <AiOutlineFontSize size={22} />
      </button>
    </nav>
    // <GridItem as="header" borderBottom={"1px solid"} borderColor={"#919191"}>
    //   <Flex
    //     align={"center"}
    //     justify={"space-between"}
    //     minH={"7"}
    //     padding={4}
    //     paddingRight={0}
    //     paddingLeft={0}
    //   >
    //     <Box>
    //       <Heading as="h1" size={"md"}>
    //         Blog
    //       </Heading>
    //     </Box>
    //     <Box>
    //       <MenuComponent session={true} />
    //     </Box>
    //   </Flex>
    // </GridItem>
  );
}
