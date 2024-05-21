import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/Card";

interface PageHeaderProps {
  title: string;
  breadcrumbs: {
    title: string;
    href: string;
  }[];
}

const PageHeader: FC<PageHeaderProps> = () => {};

export default PageHeader;
