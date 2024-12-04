import Button from "./Button";
import { categories } from "@/data/data";

const Categories = () => {
  return (
    <div className="space-x-2 space-y-2 mb-8">
      {categories.map((category) => {
        return (
          <Button shape="rounded" variant="secondary">
            {category}
          </Button>
        );
      })}
    </div>
  );
};

export default Categories;
