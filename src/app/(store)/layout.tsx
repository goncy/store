export default function StoreLayout({children, content}: LayoutProps<"/">) {
  return (
    <>
      {content}
      {children}
    </>
  );
}
