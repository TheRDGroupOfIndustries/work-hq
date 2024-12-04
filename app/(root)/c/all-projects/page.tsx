"use client";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import NewHeadline from "@/components/reusables/components/NewHeadline";
import { ROLE } from "@/tempData";

export default function AllProjects() {
  const ButtonObjects = [
    {
      buttonText: "Create New Project",
      onClick: () => {
        console.log("Create New Project");
      },
    },
  ];
  return (
    <MainContainer role ={ROLE}>
      {/* <Headline /> */}
      <NewHeadline
        title="All Projects"
        subTitle="Overview / All Projects"
        buttonObjects={ButtonObjects} 
      />
    </MainContainer>
  );
}
