type ProfileImageProps = {
  name: string;
  src: string;
}

export default function ProfileImage({ name, src }: ProfileImageProps) {
  return (
    <img
      src={src}
      alt={name}
      className="h-24 w-24 rounded-full bg-slate-300 ring-4 ring-slate-900 sm:h-32 sm:w-32"
    />
  );
}
