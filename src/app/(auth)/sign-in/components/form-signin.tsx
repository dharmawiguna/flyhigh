"use client";
import { ActionResult } from "@/app/dashboard/(auth)/signin/form/action";
import Link from "next/link";
import React, { FC } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { SignInUser } from "../lib/action";

interface FormSignInProps {}

const initialState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="text-center text-flysha-black rounded-full bg-flysha-light-purple font-bold w-full p-[12px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF] disabled:opacity-40"
    >
      Sign In
    </button>
  );
}

const FormSignIn: FC<FormSignInProps> = ({}) => {
  const [state, formAction] = useFormState(SignInUser, initialState);

  return (
    <form
      action={formAction}
      className="bg-white text-flysha-black w-[500px] flex flex-col rounded-[20px] gap-5 p-5"
    >
      {state.errorTitle !== null && (
        <div className="mx-aut w-full p-4 rounded-lg text-red-400">
          <div className="font-bold">Error Validation</div>

          <ul className="list-disc list-inside">
            {state.errorDesc?.map((value, index) => (
              <li key={index + value}>{value}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-medium">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Write your email"
          className="rounded-full w-full p-[12px_20px] h-[48px] bg-[#EDE8F5] appearance-none outline-none font-semibold focus:ring-2 focus:ring-flysha-light-purple"
        />
        {/* <!-- <span className="error-messages font-medium text-xs text-flysha-red font-inter">Wrong format email address</span> --> */}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Type your password"
          className="rounded-full w-full p-[12px_20px] h-[48px] bg-[#EDE8F5] appearance-none outline-none font-semibold focus:ring-2 focus:ring-flysha-light-purple"
        />
        {/* <!-- <span className="error-messages font-medium text-xs text-flysha-red font-inter">Wrong format email address</span> --> */}
      </div>
      <SubmitButton />
      <Link
        href="/sign-up"
        className="text-center text-flysha-black hover:text-white rounded-full bg-white hover:bg-flysha-black font-semibold w-full p-[12px_30px] border border-flysha-black transition-all duration-300"
      >
        Create New Account
      </Link>
    </form>
  );
};

export default FormSignIn;
