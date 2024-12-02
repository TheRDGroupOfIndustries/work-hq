import { authFormPages } from "@/lib/sections/authFormPages";

export default async function AuthFormPage({
  params,
  children,
}: {
  params: { form: string };
  children: React.ReactNode;
}) {
  const currentPage = authFormPages.find(page => params.form === page.id);

  return (
    <>
      {currentPage ? (
        <>
          <currentPage.sectionNode key={currentPage.id} />
          {children}
        </>
      ) : (
        <div>Page not found</div>
      )}
    </>
  );
}
