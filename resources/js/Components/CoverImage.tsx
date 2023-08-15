type CoverImageProps = {
  name: string;
  src: string;
}

export default function CoverImage({ name, src }: CoverImageProps) {
  return (
    <img
      src={src}
      alt={name}
      className="aspect-[16/4] w-full rounded-2xl bg-slate-100 object-cover"
    />
  );
}
