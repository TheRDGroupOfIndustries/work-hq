export const abcd = "dcba";

// email handler
// const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const inputValue = e.target.value;
//   setEmail(inputValue);

//   if (inputValue.trim() === "") {
//     setDisableBtn(true);
//   } else {
//     if (!emailPattern.test(inputValue)) {
//       toast.error("Invalid email");
//       setDisableBtn(true);
//     } else {
//       toast.success("Valid email");
//       setDisableBtn(false);
//     }
//   }
// };

// ways to login and get session - both (server & client)
// "use client"

// // import { auth, signIn, signOut } from "@/lib/auth";
// import { Button } from "@/components/ui/button";
// import { signIn, signOut, useSession } from "next-auth/react";
// import Image from "next/image";
// import { FcGoogle } from "react-icons/fc";

// export default function Home() {
//   // const session = await auth();
//   const { data: session, status } = useSession();
//   console.log("useSession", session, status);

//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       {/* <Button
//         type="button"
//         onClick={async () => {
//           "use server";
//           if (session) {
//             await signOut();
//           } else {
//             await signIn("google");
//           }
//         }}
//       >
//         {session ? "SignOut" : "SignIn"} with Google
//       </Button> */}
//       {/* <Button>Sing in</Button> */}
//       {session?.user && (
//         <div className="flex-center flex-col space-y-2 overflow-hidden">
//           <div className="flex items-center gap-2 animate-slide-up bg-white/15 backdrop-blur-sm rounded-xl shadow px-4 py-2">
//             <div className="w-10 h-10 rounded-full overflow-hidden">
//               <Image
//                 src={session?.user?.image ?? "/logo.png"}
//                 alt="Profile Image"
//                 width="100"
//                 height="100"
//                 className="w-10 h-10 rounded-full object-cover overflow-hidden"
//               />
//             </div>
//             <div className="block w-fit h-fit space-y-1">
//               <h4 className="line-clamp-1">{session?.user?.name}</h4>
//               {/* <h6 className="text-xs line-clamp-1">{session?.user?.role}</h6> */}
//             </div>
//           </div>
//           {/* <Link href="/admin/dashboard" className="mt-4 animate-slide-up">
//             <Button type="button" size="lg" variant="outline">
//               Dashborad
//             </Button>
//           </Link> */}
//         </div>
//       )}
//       <Button
//         onClick={() => {
//           if (status === "unauthenticated") {
//             signIn("google");
//           } else {
//             signOut();
//           }
//         }}
//         variant={status === "authenticated" ? "destructive" : "default"}
//         disabled={status === "loading"}
//         title={status === "authenticated" ? "Logout" : "Login"}
//         size="lg"
//         className="text-lg"
//       >
//         <FcGoogle className="mr-1" />
//         {status === "loading"
//           ? "Loading..."
//           : status === "unauthenticated"
//           ? "Login"
//           : "Logout"}
//       </Button>
//     </div>
//   );
// }
