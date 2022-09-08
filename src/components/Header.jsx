export default function Header(props) {
  return (
    <header className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          {props.selectedTab}
        </h1>
      </div>
    </header>
  );
}
