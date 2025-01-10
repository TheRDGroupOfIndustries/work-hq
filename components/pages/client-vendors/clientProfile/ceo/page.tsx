"use client";
import Headline, {
  ButtonObjectType,
} from "@/components/reusables/components/headline";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { CustomUser, PaymentValues, ProjectValues } from "@/lib/types";
import { ROLE } from "@/tempData";
import { Ban, Mail, MessageCircleMore, Phone } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PaymentHistory from "../../components/PaymentHistory";
import Projects from "../../components/Projects";

export default function ClinetProfile() {
  const [client, setClient] = useState<CustomUser>();
  const [payments, setPayments] = useState<PaymentValues[]>();
  const [projects, setProjects] = useState<ProjectValues[]>();
  // get query params
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const headLineButtons = [
    {
      buttonText: "Export Report",
      onNeedIcon: false,
      onClick: () => console.log("Export Report"),
    },
    {
      buttonText: "Ban Clinet",
      icon: <Ban size={18} color="#FF3B30" />,
      color: "!text-[#FF3B30]",
      type: "withCustomTextColor",
      onNeedIcon: false,
      onClick: () => console.log("Export Report"),
    },
  ] as ButtonObjectType[];

  useEffect(() => {
    const getData = async () => {
      const [clientRes, salaryHistoryRes] = await Promise.all([
        fetch("/api/user/get/getUserAllInfo/" + id, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),

        fetch("/api/payment/get/getByUserID/" + id, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
      ]);

      const [clientData, salaryHistoryData] = await Promise.all([
        clientRes.json(),
        salaryHistoryRes.json(),
      ]);

      if (clientData.userData) setClient(clientData.userData);
      if (salaryHistoryData.payments) setPayments(salaryHistoryData.payments);
      if (clientData.userData.allProjects)
        setProjects(clientData.userData.allProjects);
    };

    getData();
  }, [id]);

  const totalPayment = payments?.reduce(
    (total, payment) => total + payment.amount,
    0
  );
  const totalProjectsCompleted = projects?.filter(
    (project) => project.developmentDetails.status === "completed"
  ).length;

  const totalProjectsProgress = projects?.filter(
    (project) => project.developmentDetails.status === "inProgress"
  ).length;

  const totalProjectsRefactoring = projects?.filter(
    (project) => project.developmentDetails.status === "refactoring"
  ).length;

  return (
    <MainContainer role={ROLE}>
      <Headline
        role={ROLE}
        title={client?.firstName + " " + client?.lastName}
        subTitle={client?.role}
        buttonObjects={headLineButtons}
      />

      <Container>
        <div className="w-full h-fit grid grid-cols-[1fr_2fr] p-4">
          <div className="h-full w-full flex flex-col items-center justify-center border-r border-[#9c9c9c] gap-2">
            <div className="w-[140px] h-[140px] rounded-full bg-[#d2d2d2]">
              <Image
                src={client?.profileImage || "/assets/user.png"}
                alt="Profile Image"
                width="140"
                height="140"
                className="w-full h-full rounded-full object-cover overflow-hidden"
              />
            </div>
            <h4 className="text-base text-dark-gray">{client?.role}</h4>
            <h6 className="text-base text-[#007AFF]">{client?.email}</h6>
            <h6 className="text-base ">Fullstack</h6>
            <div className="flex flex-row items-center gap-4 max-h-[100px]">
              <Phone />
              <Mail />
              <MessageCircleMore />
            </div>
          </div>
          <div className="h-full flex flex-col gap-2 items-center justify-center w-full">
            <Line title="Total payments done" value={totalPayment ?? 0} />
            <Line
              title="Total Project Completed"
              value={totalProjectsCompleted ?? 0}
            />
            <Line
              title="Total Project is Progress"
              value={totalProjectsProgress ?? 0}
            />
            <Line
              title="Projects in Maintenance"
              value={totalProjectsRefactoring ?? 0}
            />
          </div>
        </div>
      </Container>
      <PaymentHistory payments={payments ?? []} />
      <Projects projects={projects ?? []} />
    </MainContainer>
  );
}

function Line({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="flex flex-row items-center justify-between w-[70%]">
      <h6 className="text-base text-dark-gray">{title}</h6>
      <p className="self-end text-base text-gray-500">{value}</p>
    </div>
  );
}
