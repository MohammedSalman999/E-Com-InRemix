import { SignUp } from "@clerk/remix"

export default function CreateAccount() {
  return (
    <div className="justify-center items-center flex h-screen">
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" afterSignUpUrl="/home" />
    </div>
  )
}

