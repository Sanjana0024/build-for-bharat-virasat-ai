import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
  count: number;
}

export default function CategoryCard({ title, description, image, slug, count }: CategoryCardProps) {
  return (
    <Link to={`/explore?category=${slug}`}>
      <motion.div
        whileHover={{ y: -6 }}
        className="group relative overflow-hidden rounded-xl shadow-card-hover transition-shadow hover:shadow-elevated"
      >
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-heritage-deep/90 via-heritage-deep/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="mb-1 inline-block rounded-full bg-primary/20 px-3 py-0.5 text-xs font-medium text-primary-foreground backdrop-blur-sm">
            {count} items
          </span>
          <h3 className="font-display text-lg font-bold text-heritage-cream">{title}</h3>
          <p className="mt-1 text-sm text-heritage-cream/70">{description}</p>
        </div>
      </motion.div>
    </Link>
  );
}
