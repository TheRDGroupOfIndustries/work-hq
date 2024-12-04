import { Label } from "@/components/ui/label";
import React from "react";
import { DialogClose } from "@/components/ui/dialog";
import SquareButton from "@/components/reusables/wrapper/squareButton";

export default function TicketInfo() {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="z-10 w-[633px] max-h-[80vh] m-4  bg-primary-sky-blue flex flex-col gap-6 rounded-3xl   p-5 lg:p-6 overflow-auto "
    >
      <h1 className="text-2xl font-semibold text-dark-gray">Ticket Info</h1>
      <div className="flex flex-col gap-3">
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Ticket Subject
          </Label>
          <span className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4 py-2 text-light-gray">
            This is a ticket subject
          </span>
        </div>
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Ticket Number
          </Label>
          <span className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4 py-2 text-light-gray">
            #bj45665
          </span>
        </div>
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Ticket Status
          </Label>
          <span className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4 py-2 text-light-gray">
          Open
          </span>
        </div>
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Ticket Priority
          </Label>
          <span className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4 py-2 text-light-gray">
            High
          </span>
        </div>
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Ticket Message
          </Label>
          <span className="w-full text-base h-full outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4 py-2 text-light-gray">
          This is the ticket desciption. It will be veery veryeeeeeeeeey veery long. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam ipsa asperiores natus praesentium alias quam perferendis reprehenderit expedita ex esse? Sint exercitationem ab minima labore ipsa iste quasi ut alias.
          Iusto, soluta. Delectus, neque. Quia sed dicta quam error nulla architecto, in quibusdam repellat quo eos! Omnis corrupti recusandae laboriosam, est asperiores accusantium dolore odio veritatis. Ad molestias sunt sit.
          Praesentium fugiat quidem maiores culpa nemo veritatis nesciunt? Necessitatibus sit fugit quae, voluptas porro possimus eius itaque accusamus vel voluptatum eligendi. Corrupti corporis cupiditate quibusdam iure fuga ab illum sequi?
          Similique autem recusandae, voluptatibus praesentium porro, ipsa vel quo ea natus possimus aspernatur! Unde soluta asperiores culpa distinctio modi minima aut libero illum adipisci sequi placeat earum, eveniet obcaecati at.
          Atque, dolorum iusto. Eius delectus deleniti sequi mollitia rerum optio at aut adipisci voluptas iste iusto nobis, corrupti reprehenderit assumenda! Unde, molestiae modi quod veritatis at alias temporibus necessitatibus. Adipisci.
          Corrupti ab eos vel at veritatis voluptates sapiente nemo cum sunt, expedita facere possimus quasi quia? Suscipit saepe debitis deserunt totam rerum. Laborum, ullam sed illum nisi quia aspernatur. Nobis.
          Repudiandae doloremque ab eligendi magnam debitis eveniet, repellendus dicta id neque quod suscipit corrupti, rerum quam ipsum odit quae molestiae inventore libero expedita consequatur provident assumenda at tenetur! At, doloribus?
          Numquam, repudiandae fuga maiores vel facilis ratione nemo cum eos temporibus incidunt quisquam in saepe architecto aspernatur sit, assumenda, modi obcaecati dolorum eius itaque eaque? Nulla repellendus dolore fugit dicta!
          Sed amet dolorum iure rerum, labore fugit maiores, repellendus dolore omnis dolores esse a porro natus unde, reprehenderit animi velit nesciunt eum vitae illum? At ipsam possimus consequuntur ducimus veritatis.
          In officiis facilis inventore recusandae maxime perferendis nihil excepturi totam vel, velit iste, sapiente iusto vitae voluptas dolorum quibusdam delectus repellendus, rem suscipit ratione. Explicabo illo quia autem? Ex, sequi.
          Dolorum officia consectetur deleniti? Nihil aspernatur perspiciatis velit ipsum dolorum perferendis similique corrupti pariatur aliquam? Quos, aut? Obcaecati iusto delectus facilis sit, qui, assumenda neque mollitia commodi soluta cum beatae.
          Ratione sit corporis iure, earum, harum minima autem sapiente aperiam reiciendis corrupti nemo cupiditate, accusamus vitae esse mollitia fugiat nihil laudantium a quis odio cumque? Tempore autem tempora itaque exercitationem.
          Voluptate perferendis facilis molestias fugiat, fugit temporibus molestiae magni nemo. Quis tenetur, mollitia error culpa fugiat fuga, praesentium vero quaerat in consectetur sed minima tempora dolorem consequatur quas iusto consequuntur.
          Facere, recusandae. Saepe eum nulla, temporibus tempora minima magnam distinctio, enim iusto neque vero ad iste, dignissimos est modi illo et? Eum laboriosam labore reiciendis dicta minus saepe eius magni!
          Nam nihil eius, quisquam reprehenderit, dignissimos aperiam minima recusandae sequi eligendi necessitatibus, nemo aspernatur eos? Autem pariatur magni harum nihil eum veniam nobis excepturi enim unde? Necessitatibus vitae placeat inventore?
          Iusto reiciendis error quasi nobis tempora et repudiandae nam mollitia necessitatibus placeat aliquid voluptatum voluptatem similique corrupti quod perspiciatis, illo provident nulla porro repellat qui! Dolore rerum assumenda harum officiis?
          Alias quasi earum expedita beatae tempore suscipit nihil nostrum laboriosam nisi obcaecati rerum similique nulla maxime soluta sed, qui debitis provident repellendus quaerat fuga magnam perspiciatis? Similique ex veniam ducimus!
          Numquam quibusdam similique ducimus nesciunt, porro corrupti enim unde odio! Consequuntur praesentium placeat deserunt labore tenetur veniam necessitatibus accusantium pariatur, sequi sunt? Consequatur quis architecto reprehenderit autem error accusamus vel.
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-end">
        <DialogClose asChild>
          <SquareButton className="text-[#6A6A6A] w-fit self-end">
            Cancel
          </SquareButton>
        </DialogClose>
      </div>
    </div>
  );
}
