export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Admin pages are standalone — no navbar or footer
  return <>{children}</>;
}
