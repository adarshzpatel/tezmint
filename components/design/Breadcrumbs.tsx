import clsx from "clsx";
import React from "react";
import { FiChevronRight } from "react-icons/fi";

type BreadcrumbsProps = {
  data: string[];
  active: number;
};

const Breadcrumbs = ({ data, active }: BreadcrumbsProps) => {
  return (
    <div className="flex items-center gap-3 text-sm">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <p
            className={clsx({
              "text-primary-400 font-medium": index === active,
            })}
          >
            {item}
          </p>
          {index < data.length - 1 && <FiChevronRight className="h-4 w-4" />}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
