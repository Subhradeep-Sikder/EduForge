"use client"

import { BookOpenCheck, Map, MessageSquare,  } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import {
  SignInButton,
  UserButton
} from "@clerk/nextjs";

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";

function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        
        <div className="flex items-center gap-6">

          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="h-8 w-8 rounded-lg bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <BookOpenCheck className="h-4 w-4 text-white" />
              </div>

              <span className="text-xl font-bold">
                EduForge
              </span>
            </div>
          </Link>

          

          

        </div>

     
        <div className="flex items-center gap-4">

          <ThemeToggle  />

          {isSignedIn ? (
            <>
              <Button variant="ghost" asChild className="hover:text-primary hover:bg-transparent transition-colors">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" asChild className="hover:text-primary hover:bg-transparent transition-colors">
                <Link href="/create" >Create</Link>
              </Button>
              <UserButton />
            </>
          ) : (
            <SignInButton>
              <Button>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </SignInButton>
          )}

        </div>

      </div>
    </nav>
  )
}

export default Navbar