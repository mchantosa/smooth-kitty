export default function Footer() {
  return (
    <footer className="footer items-center p-6 text-base-content">
      <div className="items-center grid-flow-col">
        {/* TODO: Logo */}
        <p>Copyright © 2023 - All right reserved</p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/mchantosa/connections"
        >
          <i className="fa-brands fa-github fa-2xl"></i>
        </a>
      </div>
    </footer>
  );
}
