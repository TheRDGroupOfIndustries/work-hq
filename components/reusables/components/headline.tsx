"use client";

import SquareButton from "@/components/reusables/wrapper/squareButton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Role, VENDOR } from "@/types";
import { Plus } from "lucide-react";

interface ButtonObjectType {
  buttonText: string;
  lightGrayColor: boolean;
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
  title?: string;
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
                lightGrayColor,
                icon,
                dialogContent,
                onClick,
                onNeedIcon,
              },
              index
            ) => {
              if (dialogContent) {
                return (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <SquareButton
                        role={role}
                        className={`${
                          lightGrayColor ? "!text-light-gray" : ""
                        }`}
                        onClick={onClick}
                      >
                        {icon ? (
                          icon
                        ) : onNeedIcon ? null : (
                          <Plus
                            color={
                              lightGrayColor
                                ? "var(--light-gray)"
                                : role === VENDOR
                                ? "var(--vendor-dark)"
                                : "var(--primary-blue)"
                            }
                          />
                        )}
                        {buttonText}
                      </SquareButton>
                    </DialogTrigger>
                    <DialogContent>{dialogContent}</DialogContent>
                  </Dialog>
                );
              }

              return (
                <SquareButton
                  key={index}
                  role={role}
                  className={`${lightGrayColor ? "!text-light-gray" : ""}`}
                  onClick={onClick}
                >
                  {icon ? (
                    icon
                  ) : onNeedIcon ? null : (
                    <Plus
                      color={
                        lightGrayColor
                          ? "var(--light-gray)"
                          : role === VENDOR
                          ? "var(--vendor-dark)"
                          : "var(--primary-blue)"
                      }
                    />
                  )}
                  {buttonText}
                </SquareButton>
              );
            }
          )}
      </div>
    </div>
  );
}
