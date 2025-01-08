"use client";

import SquareButton from "@/components/reusables/wrapper/squareButton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Role, VENDOR } from "@/types";
import { Plus } from "lucide-react";

type ButtonType =
  | "lightGray"
  | "withCustomColor"
  | "withCustomTextColor"
  | undefined;

export interface ButtonObjectType {
  buttonText: string;
  type?: ButtonType;
  color?: string;
  icon?: React.ReactNode;
  onNeedIcon: boolean;
  onClick: () => void;
  dialogContent?: React.ReactNode;
}

export default function Headline({
  title = "Default Heading",
  subTitle = "default subtitle here",
  buttonObjects,
  role,
}: {
  title: string;
  subTitle?: string;
  buttonObjects?: ButtonObjectType[];
  role: Role;
}) {
  return (
    <div className="w-full my-4 flex flex-row items-center justify-between">
      <div className="flex flex-col gap-1">
        {/* headline */}
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-[#6A6A6A] text-base font-normal">{subTitle}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        {buttonObjects &&
          buttonObjects.map(
            (
              {
                buttonText,
                color,
                type,
                icon,
                dialogContent,
                onClick,
                onNeedIcon,
              },
              index
            ) => {
              if (dialogContent) {
                switch (type) {
                  case "lightGray":
                    return (
                      <Dialog key={index}>
                        <DialogTrigger asChild>
                          <LightGrayButton
                            onClick={onClick}
                            icon={icon}
                            buttonText={buttonText}
                            onNeedIcon={onNeedIcon}
                            role={role}
                          />
                        </DialogTrigger>
                        <DialogContent className="w-[733px] m-4 bg-primary-sky-blue flex flex-col gap-6 rounded-3xl p-5 lg:p-6">
                          {dialogContent}
                        </DialogContent>
                      </Dialog>
                    );
                  case "withCustomColor":
                    return (
                      <Dialog key={index}>
                        <DialogTrigger asChild>
                          <WithCustomColor
                            onClick={onClick}
                            icon={icon}
                            color={color || "#3277FF"}
                            buttonText={buttonText}
                            onNeedIcon={onNeedIcon}
                            role={role}
                          />
                        </DialogTrigger>
                        <DialogContent>{dialogContent}</DialogContent>
                      </Dialog>
                    );
                  default:
                    return (
                      <Dialog key={index}>
                        <DialogTrigger asChild>
                          <DefaultButton
                            onClick={onClick}
                            icon={icon}
                            buttonText={buttonText}
                            onNeedIcon={onNeedIcon}
                            role={role}
                          />
                        </DialogTrigger>
                        <DialogContent>{dialogContent}</DialogContent>
                      </Dialog>
                    );
                }
                //   <Dialog key={index}>
                //     <DialogTrigger asChild>
                //       <SquareButton
                //         role={role}
                //         className={`${
                //           lightGrayColor ? "!text-light-gray" : ""
                //         }`}
                //         onClick={onClick}
                //       >
                //         {icon ? (
                //           icon
                //         ) : onNeedIcon ? null : (
                //           <Plus
                //             color={
                //               lightGrayColor
                //                 ? "var(--light-gray)"
                //                 : role === VENDOR
                //                 ? "var(--vendor-dark)"
                //                 : "var(--primary-blue)"
                //             }
                //           />
                //         )}
                //         {buttonText}
                //       </SquareButton>
                //     </DialogTrigger>
                //     <DialogContent>{dialogContent}</DialogContent>
                //   </Dialog>
                // );
              }

              switch (type) {
                case "lightGray":
                  return (
                    <LightGrayButton
                      onClick={onClick}
                      icon={icon}
                      buttonText={buttonText}
                      onNeedIcon={onNeedIcon}
                      role={role}
                    />
                  );
                case "withCustomColor":
                  return (
                    <WithCustomColor
                      onClick={onClick}
                      icon={icon}
                      color={color || "#3277FF"}
                      buttonText={buttonText}
                      onNeedIcon={onNeedIcon}
                      role={role}
                    />
                  );
                case "withCustomTextColor":
                  return (
                    <WithCustomTextColor
                      onClick={onClick}
                      icon={icon}
                      color={color || "#3277FF"}
                      buttonText={buttonText}
                      onNeedIcon={onNeedIcon}
                      role={role}
                    />
                  );
                default:
                  return (
                    <DefaultButton
                      onClick={onClick}
                      icon={icon}
                      buttonText={buttonText}
                      onNeedIcon={onNeedIcon}
                      role={role}
                    />
                  );
              }
            }
          )}
      </div>
    </div>
  );
}

function DefaultButton({
  onClick,
  icon,
  buttonText,
  onNeedIcon,
  role,
}: {
  onClick: () => void;
  icon?: React.ReactNode;
  buttonText: string;
  onNeedIcon: boolean;
  role: Role;
}) {
  return (
    <SquareButton role={role} onClick={onClick}>
      {icon ? (
        icon
      ) : onNeedIcon ? null : (
        <Plus
          color={role === VENDOR ? "var(--vendor-dark)" : "var(--primary-blue)"}
        />
      )}
      {buttonText}
    </SquareButton>
  );
}

export function LightGrayButton({
  onClick,
  icon,
  buttonText,
  onNeedIcon,
  role,
}: {
  onClick: () => void;
  icon?: React.ReactNode;
  buttonText: string;
  onNeedIcon: boolean;
  role: Role;
}) {
  return (
    <SquareButton className="!text-light-gray" role={role} onClick={onClick}>
      {icon ? icon : onNeedIcon ? null : <Plus color="var(--light-gray)" />}
      {buttonText}
    </SquareButton>
  );
}

function WithCustomColor({
  onClick,
  icon,
  buttonText,
  onNeedIcon,
  role,
  color,
}: {
  onClick: () => void;
  icon?: React.ReactNode;
  buttonText: string;
  onNeedIcon: boolean;
  role: Role;
  color?: string;
}) {
  return (
    <SquareButton
      className={`!text-white bg-[#3277FF] !shadow-neuro-9 ${color}`}
      role={role}
      onClick={onClick}
    >
      {icon ? icon : onNeedIcon ? null : <Plus color="white" />}
      {buttonText}
    </SquareButton>
  );
}

function WithCustomTextColor({
  onClick,
  icon,
  buttonText,
  onNeedIcon,
  role,
  color,
}: {
  onClick: () => void;
  icon?: React.ReactNode;
  buttonText: string;
  onNeedIcon: boolean;
  role: Role;
  color?: string;
}) {
  return (
    <SquareButton className={` ${color}`} role={role} onClick={onClick}>
      {icon ? icon : onNeedIcon ? null : <Plus color="white" />}
      {buttonText}
    </SquareButton>
  );
}

// "use client";
// import SquareButton from "@/components/reusables/wrapper/squareButton";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { Role, VENDOR } from "@/types";
// import { Plus } from "lucide-react";

// interface ButtonObjectType {
//   buttonText: string;
//   lightGrayColor: boolean;
//   icon?: React.ReactNode;
//   onNeedIcon: boolean;
//   onClick: () => void;
//   dialogContent?: React.ReactNode;
// }

// export default function Headline({
//   title = "Default Heading",
//   subTitle = "default subtitle here",
//   buttonObjects,
//   role,
// }: {
//   title?: string;
//   subTitle?: string;
//   buttonObjects?: ButtonObjectType[];
//   role: Role;
// }) {
//   return (
//     <div className="w-full my-4 flex flex-row items-center justify-between">
//       <div className="flex flex-col gap-1">
//         {/* headline */}
//         <h1 className="text-2xl font-semibold">{title}</h1>
//         <p className="text-[#6A6A6A] text-base font-normal">{subTitle}</p>
//       </div>
//       <div className="flex flex-col sm:flex-row gap-4">
//         {buttonObjects &&
//           buttonObjects.map(
//             (
//               {
//                 buttonText,
//                 lightGrayColor,
//                 icon,
//                 dialogContent,
//                 onClick,
//                 onNeedIcon,
//               },
//               index
//             ) => {
//               if (dialogContent) {
//                 return (
//                   <Dialog key={index}>
//                     <DialogTrigger asChild>
//                       <SquareButton
//                         role={role}
//                         className={`${
//                           lightGrayColor ? "!text-light-gray" : ""
//                         }`}
//                         onClick={onClick}
//                       >
//                         {icon ? (
//                           icon
//                         ) : onNeedIcon ? null : (
//                           <Plus
//                             color={
//                               lightGrayColor
//                                 ? "var(--light-gray)"
//                                 : role === VENDOR
//                                 ? "var(--vendor-dark)"
//                                 : "var(--primary-blue)"
//                             }
//                           />
//                         )}
//                         {buttonText}
//                       </SquareButton>
//                     </DialogTrigger>
//                     <DialogContent>{dialogContent}</DialogContent>
//                   </Dialog>
//                 );
//               }

//               return (
//                 <SquareButton
//                   key={index}
//                   role={role}
//                   className={`${lightGrayColor ? "!text-light-gray" : ""}`}
//                   onClick={onClick}
//                 >
//                   {icon ? (
//                     icon
//                   ) : onNeedIcon ? null : (
//                     <Plus
//                       color={
//                         lightGrayColor
//                           ? "var(--light-gray)"
//                           : role === VENDOR
//                           ? "var(--vendor-dark)"
//                           : "var(--primary-blue)"
//                       }
//                     />
//                   )}
//                   {buttonText}
//                 </SquareButton>
//               );
//             }
//           )}
//       </div>
//     </div>
//   );
// }
