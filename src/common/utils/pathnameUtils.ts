import { getSlugByPathname } from "src/common/lib/slugs";

// Compare two pathnames
export const comparePathnames = (pathname1: string, pathname2: string) => {
  return pathname1 === pathname2;
};

/**
 * This function splits a given pathname into its constituent parts and generates a breadcrumb trail.
 * Each breadcrumb is an object with two properties: 'name' and 'path'.
 * 'name' is the individual part of the pathname.
 * 'path' is the full path up to and including the current part.
 *
 * @param {string} pathname - The pathname to split into breadcrumbs.
 * @returns {Array<{name: string, path: string}>} An array of breadcrumb objects.
 *
 * @example
 * returns [{name: "", path: ""}, {name: "home", path: "/home"}, {name: "user", path: "/home/user"}]
 * generateBreadcrumbs("/home/user");
 */
export const generateBreadcrumb = (pathname: string) => {
  if (pathname === "/") {
    return [{ name: getSlugByPathname(pathname), path: "/" }];
  }

  const paths = pathname.split("/");
  const breadcrumb = paths.map((path, index) => {
    return {
      name: getSlugByPathname(path ? `/${path}` : "/")?.toLowerCase(),
      path: paths.slice(0, index + 1).join("/"),
    };
  });

  return breadcrumb;
};
