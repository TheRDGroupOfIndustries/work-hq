import { authFormPages } from "@/lib/sections/authFormPages";

export default async function AuthFormPage({
  params,
}: {
  params: { form: string };
}) {
  // const session = await getServerSession();
  // console.log(session);
  // if (session) redirect("/");

  return authFormPages.map(
    (page) => params.form === page.id && <page.sectionNode key={page.id} />
  );
  
}
