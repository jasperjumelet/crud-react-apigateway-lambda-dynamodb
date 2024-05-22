import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; {year}, made with{" "}
          <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5 text-red-600" /> by{" "}
          <a
            href={brandLink}
            target="_blank"
            className="transition-colors hover:text-blue-500 font-bold"
          >
            {brandName}
          </a>{" "}
          for a better consumption control.
        </Typography>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Allezlorrie",
  brandLink: "https://allezlorrie.com",
  routes: [
    { name: "Allezlorrie", path: "https://allezlorrie.com" },
    { name: "About Us", path: "https://allezlorrie.com" },
    { name: "Blog", path: "https://allezlorrie.com" },
    { name: "License", path: "https://allezlorrie.com" },
  ],
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
