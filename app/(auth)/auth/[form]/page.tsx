import { authFormPages } from "@/lib/sections/authFormPages";

export default async function AuthFormPage({
  params,
  children,
}: {
  params: { form: string };
  children: React.ReactNode;
}) {
  const CurrentPage = authFormPages.find(page => params.form === page.id);

  return (
    <>
      {CurrentPage ? (
        <>
          <CurrentPage.sectionNode key={CurrentPage.id} />
          {children}
        </>
      ) : (
        <div>Page not found</div>
      )}
    </>
  );
}
