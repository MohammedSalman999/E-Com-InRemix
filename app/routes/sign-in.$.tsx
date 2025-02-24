import { SignIn } from "@clerk/remix"

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" afterSignInUrl="/home/products" />
    </div>
  )
}

