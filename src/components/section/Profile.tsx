import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function Profile() {
  return (
    <div className="flex items-center space-x-2">
      <p>by</p>
      <Button className="w-fit p-0" variant={"link"}>
        <Link href="https://github.com/ascndia">@ascndia</Link>
      </Button>
    </div>
  );
}
