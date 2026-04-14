"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function WaitlistSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="mx-auto max-w-xl text-center space-y-10">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f1b2d]">
            Get early access.
          </h2>
          <p className="text-lg text-gray-500 max-w-md mx-auto">
            Join the waitlist and be the first to automate your store.
          </p>
        </div>

        <div className="flex gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="h-12 bg-gray-50 border-gray-200 text-[#0f1b2d] placeholder:text-gray-400"
          />
          <Button
            className="h-12 px-6 bg-[#0f1b2d] hover:bg-[#1a2d4a] text-white font-semibold rounded-lg"
          >
            Get Notified
          </Button>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            <Avatar className="border-2 border-white w-9 h-9">
              <AvatarFallback className="text-xs font-semibold bg-blue-600 text-white">JD</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-white w-9 h-9">
              <AvatarFallback className="text-xs font-semibold bg-blue-700 text-white">AS</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-white w-9 h-9">
              <AvatarFallback className="text-xs font-semibold bg-blue-800 text-white">MK</AvatarFallback>
            </Avatar>
          </div>
          <span className="text-sm font-medium text-gray-500">10,000+ people on the waitlist</span>
        </div>
      </div>
    </section>
  )
}
